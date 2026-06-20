import Image from "next/image";
import background from "../assets/background.png";
import me from "../assets/me.png";
import { Navbar, Button, ROPChart, ColorPicker, MusicPlayer } from "@/components";
import { BentoSection } from "@/sections/BentoSection";
import { FooterSection } from "@/sections/FooterSection";

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
        <div className="right-6 bottom-6 absolute flex flex-col justify-end gap-2 transition-all duration-500">
          {/* chart */}
          {/* <ROPChart /> */}

          {/* color picker */}
          <ColorPicker />

          {/* music player */}
          <MusicPlayer />
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
