"use client";

import React, { useRef, useEffect } from "react";

const fragmentShaderSource = `
precision highp float;
uniform vec2 iResolution;
uniform float iTime;

// Smooth min for organic blending
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}

// Single ribbon: Restored original smooth, undulating flow
float ribbon(vec3 p, float time, float yOff, float phase, vec3 audio) {
    vec3 q = p;
    
    // Amplitudes swell with the music, but the flow never stops even if audio is 0
    float a1 = 0.6 + audio.x * 0.5;
    float a2 = 0.8 + audio.y * 0.4;
    float a3 = 0.15 + audio.z * 0.2;
    
    // Restored exact original signs (+, -, +) and slightly increased base speed
    float wave = sin(q.x*0.4 + time*0.3 + phase) * a1
               + sin(q.x*0.15 - time*0.25 + phase*1.7) * a2
               + sin(q.x*0.8 + time*0.4 + phase*0.5) * a3;
    
    // Restored original traveling drips
    float d1_pos = sin(time*0.15 + phase*1.3) * 5.0;
    float d2_pos = cos(time*0.2 + phase*0.8) * 6.0;
    
    float dripBoost = 1.0 + audio.x * 1.5;
    float drip1 = exp(-pow(q.x - d1_pos, 2.0) * 0.6) * 1.6 * dripBoost;
    float drip2 = exp(-pow(q.x - d2_pos, 2.0) * 0.8) * 1.2 * dripBoost;
    
    float dy = wave + yOff - (drip1 + drip2);
    
    float dz = sin(q.x*0.3 + phase*2.0 + time*0.2)*0.8;
    
    float ry = q.y - dy;
    float rz = (q.z - dz)*0.45; 
    
    float localThickness = 0.15 + (drip1 + drip2) * 0.18;
    
    return length(vec2(ry, rz)) - localThickness;
}

float map(vec3 p, float time, vec3 audio) {
    float d = ribbon(p, time, 0.0, 0.0, audio);
    d = smin(d, ribbon(p, time, 0.6, 1.2, audio.yzx), 0.3);
    d = smin(d, ribbon(p, time,-0.5, 2.5, audio.zxy), 0.3);
    d = smin(d, ribbon(p, time, 0.9, 3.8, audio.xzy), 0.35);
    d = smin(d, ribbon(p, time,-0.8, 5.1, audio.yxz), 0.35);
    d = smin(d, ribbon(p, time, 0.3, 7.0, audio), 0.25);
    return d;
}

vec3 calcNormal(vec3 p, float time, vec3 audio) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map(p+e.xyy, time, audio) - map(p-e.xyy, time, audio),
        map(p+e.yxy, time, audio) - map(p-e.yxy, time, audio),
        map(p+e.yyx, time, audio) - map(p-e.yyx, time, audio)
    ));
}

float raymarch(vec3 ro, vec3 rd, float time, vec3 audio) {
    float t = 0.0;
    for (int i = 0; i < 128; i++) {
        vec3 p = ro + rd*t;
        float d = map(p, time, audio);
        if (d < 0.0005) return t;
        if (t > 30.0) break;
        t += d * 0.6; 
    }
    return -1.0;
}

float calcAO(vec3 p, vec3 n, float time, vec3 audio) {
    float ao = 0.0;
    float s = 1.0;
    for (int i = 0; i < 5; i++) {
        float h = 0.01 + 0.15*float(i);
        float d = map(p + n*h, time, audio);
        ao += (h - d)*s;
        s *= 0.5;
    }
    return clamp(1.0 - 3.0*ao, 0.0, 1.0);
}

float fresnel(float NdotV, float f0) {
    return f0 + (1.0-f0)*pow(clamp(1.0-NdotV, 0.0, 1.0), 5.0);
}

float caustics(vec3 p, float time) {
    float c = 0.0;
    vec3 q = p*3.0;
    c += sin(q.x*2.1+time)*sin(q.z*1.8-time*0.7)*0.5;
    c += sin(q.x*4.3-time*1.3+q.y*2.0)*sin(q.z*3.7+time*0.9)*0.25;
    c += sin(q.x*7.1+time*0.5)*sin(q.z*6.3-time*1.1)*0.125;
    return c*c;
}

vec3 spectrum(float t) {
    return clamp(vec3(
        sin(t*6.2832)*0.5+0.5,
        sin(t*6.2832 + 2.094)*0.5+0.5,
        sin(t*6.2832 + 4.189)*0.5+0.5
    ), 0.0, 1.0);
}

vec3 envMap(vec3 rd) {
    vec3 col = vec3(0.01); 
    col += vec3(1.0) * pow(max(dot(rd, normalize(vec3(1, 0.7, 0.5))), 0.0), 120.0) * 4.0;
    col += vec3(1.0) * pow(max(dot(rd, normalize(vec3(-0.8, 0.6, -0.4))), 0.0), 90.0) * 3.0;
    col += vec3(1.0) * pow(max(dot(rd, normalize(vec3(0.2, -0.5, -1.0))), 0.0), 60.0) * 1.5;
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;
    float time = iTime * 0.7;
    
    // Using default/0 audio since we are a UI button without audio texture
    float bassRaw = 0.0;
    float midRaw  = 0.0;
    float trebRaw = 0.0;
    
    vec3 audio = vec3(pow(bassRaw, 2.0), pow(midRaw, 1.5), pow(trebRaw, 2.0));
    
    float rainbowTrigger = smoothstep(0.5, 0.9, audio.x) + smoothstep(0.5, 0.9, audio.z);
    rainbowTrigger = clamp(rainbowTrigger, 0.0, 1.0);

    vec3 ro = vec3(0.0, 2.0, 6.5);
    vec3 ta = vec3(0.0, -0.5, 0.0); 
    ro.x += sin(time*0.12)*0.5;
    ro.y += cos(time*0.09)*0.2;
    
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0,1,0)));
    vec3 vv = cross(uu, ww);
    vec3 rd = normalize(uv.x*uu + uv.y*vv + 1.5*ww);
    
    vec3 col = vec3(0.0); 
    
    float t = raymarch(ro, rd, time, audio);
    
    if (t > 0.0) {
        vec3 p = ro + rd*t;
        vec3 n = calcNormal(p, time, audio);
        float ao = calcAO(p, n, time, audio);
        vec3 v = -rd;
        float NdotV = max(dot(n, v), 0.0);
        
        float baseIOR = 1.48; 
        vec3 refrCol = vec3(0.0);
        
        float iorSpread = mix(0.0, 0.15, rainbowTrigger);
        
        for (int i = 0; i < 7; i++) {
            float fi = float(i)/6.0;
            float ior = baseIOR - (iorSpread * 0.5) + (fi * iorSpread);
            
            vec3 refracted = refract(rd, n, 1.0/ior);
            if (dot(refracted,refracted) < 0.001) {
                refracted = reflect(rd, n);
            }
            
            vec3 envSample = envMap(refracted);
            
            vec3 tint = mix(vec3(1.0), spectrum(fi), rainbowTrigger);
            refrCol += tint * envSample;
        }
        refrCol /= 7.0; 
        
        vec3 refl = reflect(rd, n);
        vec3 reflCol = envMap(refl);
        
        float fres = fresnel(NdotV, 0.05);
        col = mix(refrCol, reflCol, fres);
        
        float sc = caustics(p, time * 1.5);
        col += vec3(1.0) * sc * (0.1 + audio.x * 0.2) * (1.0 - NdotV);
        
        vec3 L1 = normalize(vec3(1,0.7,0.5));
        vec3 L2 = normalize(vec3(-0.8,0.6,-0.4));
        
        col += vec3(1.0)*pow(max(dot(n,normalize(v+L1)),0.0), 300.0)*3.0;
        col += vec3(1.0)*pow(max(dot(n,normalize(v+L2)),0.0), 200.0)*2.0;
        
        col *= ao;
        col *= exp(-t*0.02); 
    }
    
    col *= 1.2;
    vec3 a = col*(col + 0.0245786) - 0.000090537;
    vec3 b = col*(0.983729*col + 0.4329510) + 0.238081;
    col = a/b;
    
    col = pow(clamp(col, 0.0, 1.0), vec3(0.9)); 
    
    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const vertexShaderSource = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error compiling shader", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Error linking program", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      const currentTime = performance.now();
      const iTime = (currentTime - startTime) / 1000.0;

      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(iTimeLocation, iTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <button
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden text-white font-bold px-6 py-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${className}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 flex items-center gap-2 drop-shadow-md mix-blend-difference">
        {children}
      </div>
    </button>
  );
};
