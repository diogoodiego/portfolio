import Image from "next/image";
import background from "../assets/background.png";
import me from "../assets/me.png";
import { Navbar, Button, ROPChart } from "@/components";
import { BentoSection } from "@/sections/BentoSection";
import { FooterSection } from "@/sections/FooterSection";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-auto scrollbar-thumb-white/20 scrollbar-thin">
      <Navbar />
      <div id="home" className="h-screen w-full relative snap-start">
        <video
          src="/assets/video.mp4"
          poster={background.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover object-top -z-3"
        />
        <Image
          src={me}
          alt="myself"
          className="absolute -bottom-1 left-50 mix-blend-darken w-[80%] h-full mx-auto object-cover -z-1 me-animation"
        />
        {/* UI Components */}
        <div className="absolute bottom-6 right-6 transition-all duration-500">
          {/* chart */}
          <div className="flex flex-col p-5 bg-black/40 backdrop-blur-md z-10 rounded-2xl gap-4 w-[420px] shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold tracking-wider text-white uppercase font-mono">
                  ROP Telemetry
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">
                Live Interval: 2,100m - 2,140m
              </span>
            </div>
            <div className="h-28 w-full">
              <ROPChart />
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block rounded-full" />
                  <span className="text-[10px] text-zinc-400 font-mono">
                    ROP Actual
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-pink-500 inline-block" />
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Target benchmark
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                AVG: 22.1 m/h
              </span>
            </div>
          </div>

          {/* color picker */}
          <div className="flex items-center justify-between bg-black/40  border-white/5 p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block rounded-full" />
                <span className="text-[10px] text-zinc-400 font-mono">
                  ROP Actual
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-pink-500 inline-block" />
                <span className="text-[10px] text-zinc-400 font-mono">
                  Target benchmark
                </span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
              AVG: 22.1 m/h
            </span>
          </div>
        </div>

        <div className="absolute w-full h-full bg-black/10 -z-2" />
        <div className="relative flex flex-col items-start justify-end h-full p-12 gap-8">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg text-start max-w-4xl leading-tight tracking-tight">
            Criando produtos digitais focados em utilidade, estética e precisão.
          </h1>
          <p className="text-white/80 max-w-2xl text-lg leading-relaxed">
            Olá, sou o <strong>Diogo (Dio)</strong>. Desenho interfaces
            intuitivas, sistemas de design robustos e soluções visuais de alta
            fidelidade para indústrias complexas e startups inovadoras.
          </p>
          <div className="flex gap-4">
            <a href="#projetos">
              <Button size="lg">Ver Projetos</Button>
            </a>
            <a href="#contato">
              <Button variant="secondary" size="lg">
                Fale Comigo
              </Button>
            </a>
          </div>
        </div>
      </div>
      <BentoSection />
      <FooterSection />
    </main>
  );
}
