import Image from "next/image";
import background from "../assets/background.png";
import me from "../assets/me.png";
import abba from "../assets/abba.jpg";
import { Navbar, Button, ROPChart, ColorPicker } from "@/components";
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
          className="bottom-0 left-1/2 -z-1 absolute blur-[.5px] w-[80%] object-cover -translate-x-1/2 mix-blend-darken"
        />
        {/* UI Components */}
        <div className="right-6 bottom-6 absolute justify-end gap-2 grid grid-cols-2 transition-all duration-500">
          {/* chart */}
          <ROPChart />

          {/* color picker */}
          <ColorPicker />

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
