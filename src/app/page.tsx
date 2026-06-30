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
      <div id="home" className="relative w-full h-screen snap-start border-16 border-zinc-950 rounded-4xl">
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
        <div className="right-0 bottom-0 absolute flex flex-col justify-end gap-2 transition-all duration-500">
          {/* chart */}
          {/* <ROPChart /> */}

          {/* color picker */}
          {/* <ColorPicker /> */}

          {/* music player */}
          <MusicPlayer />
        </div>

        <div className="-z-2 absolute bg-stone-950/10 w-full h-full" />
        <div className="relative flex flex-col justify-end items-start gap-8 p-12 px-24 lg:w-2/5 h-full">
          <h1 className="drop-shadow-lg max-w-4xl font-medium text-white text-5xl text-start leading-tight tracking-tight">
            Crafting digital products focused on utility, aesthetics, and precision
          </h1>
          <p className="font-abeezee font-regular text-regular text-white/80 leading-relaxed">
            Hi, I'm Dio! I design intuitive interfaces, robust design systems,
            and high-fidelity visual solutions for complex industries and
            innovative startups.
          </p>
          <div className="flex gap-4">
            <a href="#projects">
              <Button size="lg">View Projects</Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                Get in Touch
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
