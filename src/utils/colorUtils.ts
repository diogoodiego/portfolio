export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  } else if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return { r: 225, g: 29, b: 72 }; // Default rose-600
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

/**
 * Converts sRGB color [r, g, b] (0-255) to relative luminance (Y)
 * using the APCA-specific power curve exponent (2.4) and black soft clamp.
 */
export function sRGBtoY(r: number, g: number, b: number): number {
  const rL = Math.pow(r / 255, 2.4);
  const gL = Math.pow(g / 255, 2.4);
  const bL = Math.pow(b / 255, 2.4);
  
  let Y = 0.2126729 * rL + 0.7151522 * gL + 0.0721750 * bL;
  
  if (Y < 0.022) {
    Y += Math.pow(0.022 - Y, 1.414);
  }
  return Y;
}

/**
 * Calculates the APCA contrast Lc (Lightness Contrast) between text and background.
 * Returns a signed value between -108 and 106.
 * Positive value = Dark text on Light background.
 * Negative value = Light text on Dark background.
 */
export function calcAPCA(textHex: string, bgHex: string): number {
  const textRgb = hexToRgb(textHex);
  const bgRgb = hexToRgb(bgHex);
  
  const textY = sRGBtoY(textRgb.r, textRgb.g, textRgb.b);
  const bgY = sRGBtoY(bgRgb.r, bgRgb.g, bgRgb.b);
  
  const scale = 1.14;
  let Lc = 0;
  
  if (bgY > textY) {
    // Normal polarity (dark text on light background)
    const raw = Math.pow(bgY, 0.56) - Math.pow(textY, 0.57);
    Lc = raw * scale * 100;
  } else {
    // Reverse polarity (light text on dark background)
    const raw = Math.pow(bgY, 0.65) - Math.pow(textY, 0.62);
    Lc = raw * scale * 100;
  }
  
  if (Math.abs(Lc) < 0.1) return 0;
  return Lc;
}

export interface APCAReadability {
  score: number;
  level: string;
  badgeColor: string;
  description: string;
}

export function getAPCAReadability(Lc: number): APCAReadability {
  const absLc = Math.abs(Lc);
  
  if (absLc >= 90) {
    return {
      score: Math.round(Lc),
      level: "Excelente",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      description: "Ideal para qualquer tamanho de texto, inclusive fontes finas.",
    };
  } else if (absLc >= 75) {
    return {
      score: Math.round(Lc),
      level: "Muito Bom",
      badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
      description: "Recomendado para corpo de texto principal de leitura prolongada.",
    };
  } else if (absLc >= 60) {
    return {
      score: Math.round(Lc),
      level: "Bom",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      description: "Recomendado para textos grandes, subtítulos ou títulos.",
    };
  } else if (absLc >= 45) {
    return {
      score: Math.round(Lc),
      level: "Razoável",
      badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      description: "Aceitável apenas para títulos grandes e em negrito.",
    };
  } else if (absLc >= 30) {
    return {
      score: Math.round(Lc),
      level: "Fraco",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      description: "Não use para textos. Apenas para ícones ou bordas decorativas.",
    };
  } else {
    return {
      score: Math.round(Lc),
      level: "Inadequado",
      badgeColor: "bg-stone-500/20 text-stone-400 border-stone-500/30",
      description: "Sem contraste legível. Evite usar para qualquer texto.",
    };
  }
}
