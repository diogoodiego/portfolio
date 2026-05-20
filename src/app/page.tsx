import Image from "next/image";
import background from "../assets/background.png";
import me from "../assets/me.png";
import abba from "../assets/abba.jpg";
import { Navbar, Button, ROPChart } from "@/components";
import { BentoSection } from "@/sections/BentoSection";
import { FooterSection } from "@/sections/FooterSection";
import { Play, SkipBack, SkipForward } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto scroll-auto snap-mandatory snap-y scrollbar-thumb-white/20 scrollbar-thin">
      <Navbar />
      <div id="home" className="relative w-full h-screen snap-start">
        <video
          src="/assets/red_nebula2.mp4"
          poster={background.src}
          autoPlay
          loop
          muted
          playsInline
          className="-z-3 absolute w-full h-full object-cover object-top"
        />
        <Image
          src={me}
          alt="myself"
          className="-bottom-1 left-50 -z-1 absolute mx-auto me-animation w-[80%] h-full object-cover mix-blend-darken"
        />
        {/* UI Components */}
        <div className="right-6 bottom-6 absolute justify-end gap-2 grid grid-cols-2 transition-all duration-500">
          {/* chart */}
          <ROPChart />

          {/* color picker */}
          <div className="z-10 flex flex-col gap-4 col-start-1 row-start-2 bg-stone-950/40 shadow-2xl backdrop-blur-md p-4 border border-white/5 rounded-2xl w-[420px] h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-zinc-800 border border-white/10 rounded-md w-6 h-6">
                  <svg
                    className="w-3.5 h-3.5 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">
                  Theme Primary
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                Hex / RGB
              </span>
            </div>

            <div className="flex gap-4">
              {/* Main Preview */}
              <div className="bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.3)] border border-white/10 rounded-xl w-20 h-20 shrink-0"></div>

              <div className="flex flex-col flex-1 gap-3">
                {/* Value display */}
                <div className="group flex justify-between items-center bg-stone-950/50 hover:bg-stone-950/70 p-2 px-3 border border-white/5 rounded-lg transition-colors cursor-pointer">
                  <span className="font-mono text-rose-600 text-sm tracking-wider">
                    #E11D48
                  </span>
                  <button className="text-zinc-500 group-hover:text-white transition-colors">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Swatches */}
                <div className="flex justify-between items-center px-1">
                  <button className="bg-indigo-500 shadow-indigo-500/20 shadow-lg border-2 border-transparent hover:border-white/50 rounded-full w-6 h-6 hover:scale-110 transition-all cursor-pointer"></button>
                  <button className="bg-blue-500 shadow-blue-500/20 shadow-lg border-2 border-transparent hover:border-white/50 rounded-full w-6 h-6 hover:scale-110 transition-all cursor-pointer"></button>
                  <button className="bg-rose-600 shadow-lg shadow-rose-600/40 border-2 border-white rounded-full ring-2 ring-rose-600/30 w-6 h-6 scale-110 transition-all cursor-pointer"></button>
                  <button className="bg-amber-500 shadow-amber-500/20 shadow-lg border-2 border-transparent hover:border-white/50 rounded-full w-6 h-6 hover:scale-110 transition-all cursor-pointer"></button>
                  <button className="bg-rose-500 shadow-lg shadow-rose-500/20 border-2 border-transparent hover:border-white/50 rounded-full w-6 h-6 hover:scale-110 transition-all cursor-pointer"></button>
                </div>
              </div>
            </div>

            {/* Opacity slider */}
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500">
                <span>Opacity</span>
                <span className="text-rose-600">100%</span>
              </div>
              <div className="relative bg-stone-950/50 border border-white/5 rounded-full w-full h-1.5 overflow-hidden">
                <div className="top-0 left-0 absolute bg-gradient-to-r from-transparent to-rose-600 opacity-80 rounded-full w-full h-full"></div>
                <div className="top-0 right-0 absolute bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] rounded-full w-1.5 h-full"></div>
              </div>
            </div>
          </div>

          {/* music player */}
          <div className="z-10 relative flex flex-row items-center gap-2 col-start-2 row-start-1 bg-stone-900/20 backdrop-blur-md p-3 pb-4 rounded-2xl w-full overflow-hidden music-player">
            <Image src={abba} alt="Album" className="rounded-md w-12 h-12" />
            <div className="flex flex-col flex-1">
              <p className="font-medium text-md text-stone-50">
                The Winner Takes It All
              </p>
              <p className="font-regular text-stone-400 text-xs">ABBA</p>
              <p className="font-regular text-stone-300 text-sm">1:36 / 4:55</p>
            </div>
            <div className="bg-transparent p-2 rounded-full text-stone-200 cursor-pointer">
              <SkipBack size={16} />
            </div>
            <div className="bg-white shadow-white/60 hover:shadow-md p-2 rounded-full text-stone-800 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              <Play />
            </div>
            <div className="bg-transparent p-2 rounded-full text-stone-200 cursor-pointer">
              <SkipForward size={16} />
            </div>
            {/* Progress bar */}
            <div className="bottom-0 left-0 absolute flex items-end bg-transparent w-full h-2 hover:h-4 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="bg-white w-[33%] h-1/2" />
            </div>
          </div>
        </div>

        <div className="-z-2 absolute bg-stone-950/10 w-full h-full" />
        <div className="relative flex flex-col justify-end items-start gap-8 p-12 px-24 lg:w-2/5 h-full">
          <h1 className="drop-shadow-lg max-w-4xl font-medium text-white text-5xl text-start leading-tight tracking-tight">
            Criando produtos digitais focados em utilidade, estética e precisão
          </h1>
          <p className="font-abeezee font-regular text-regular text-white/80 leading-relaxed">
            Olá, sou o Dio! Desenho interfaces intuitivas, sistemas de design
            robustos e soluções visuais de alta fidelidade para indústrias
            complexas e startups inovadoras.
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
