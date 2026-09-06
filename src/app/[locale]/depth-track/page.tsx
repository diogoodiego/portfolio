"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import me from "@/assets/me.png";

export default function DepthTrackCaseStudy() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const tocItems = [
    { id: "contexto", title: "1. O contexto" },
    { id: "problema", title: "2. O problema" },
    { id: "prototipo", title: "3. Primeiro protótipo" },
    { id: "estrutura", title: "4. A estrutura final" },
    { id: "momento", title: "5. O momento que faltava" },
    { id: "resultado", title: "6. Resultado" },
    { id: "aprendizado", title: "7. Aprendizado" }
  ];

  return (
    <main className="relative bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />
      <FloatingTOC items={tocItems} />

      {/* Main Article Content Container */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">
        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm tracking-wider">
            UX/UI Design & Engenharia • Estudo de caso
          </div>

          <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            Depth Track
          </h1>

          <p className="font-medium text-stone-300 text-xl sm:text-2xl leading-relaxed">
            Redesenhando a régua de profundidade de um dashboard de perfuração de poços
          </p>

          <div className="space-y-2 bg-stone-900/40 p-6 border border-stone-800/50 rounded-xl text-stone-400 text-base sm:text-lg leading-relaxed">
            <div><strong className="text-stone-300">Papel:</strong> Design + Desenvolvimento</div>
            <div><strong className="text-stone-300">Produto:</strong> STRATVISION, Well Log Intelligence</div>
            <div><strong className="text-stone-300">Usuários:</strong> engenheiros de petróleo, petrofísicos, engenheiros de dados, operadores de sala de controle, engenheiros de perfuração, operadores de sonda e supervisores</div>
          </div>

          {/* Meta Line */}
          <div className="flex items-center gap-4 pt-2 text-stone-400 text-sm sm:text-base">
            <Image
              src={me}
              alt="Dio"
              width={40}
              height={40}
              className="rounded-full w-auto h-auto object-cover"
            />
            <div>
              <div className="font-semibold text-white">Dio</div>
              <div>Lead Product Designer</div>
            </div>
          </div>
        </header>

        {/* Section 1 */}
        <section id="contexto" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            1. O contexto
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            O STRATVISION exibe curvas de perfuração (ROP, WOB, Gamma Ray, gases) ao longo da profundidade do poço, em tempo real. A régua de profundidade parece o elemento mais simples do dashboard. Mas é dela que depende toda a leitura correta do restante da tela.
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/old_version.png")}
          >
            <Image src="/assets/depth/old_version.png" alt="Dashboard completo" width={1200} height={675} className="w-full h-auto" />
          </div>
        </section>

        {/* Section 2 */}
        <section id="problema" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            2. O problema
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Testando o software na escala 1:25, os ticks de profundidade ficaram tão distantes uns dos outros que a régua virava um espaço praticamente vazio. Como dar um super zoom numa régua real: só sobra o espaço entre os traços.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Resultado: em escalas mais próximas, o usuário perdia a noção de onde estava no poço.
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/old_track.png")}
          >
            <Image src="/assets/depth/old_track.png" alt="Componente antigo" width={1200} height={675} className="w-full h-auto" />
          </div>

          <blockquote className="mt-6 py-1 pl-4 border-rose-500 border-l-4 text-stone-400 text-lg sm:text-xl italic">
            &quot;Eu tinha visto que as profundidades sumiam quando mudava a escala, mas achei que só eu me incomodava.&quot;
            <footer className="mt-2 text-stone-500 text-base">— feedback espontâneo de um usuário, após o lançamento</footer>
          </blockquote>
        </section>

        {/* Section 3 */}
        <section id="prototipo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            3. Primeiro protótipo, feedback real
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Levei o primeiro protótipo (Figma) para desenvolvedores testarem. Cada pessoa tentou uma interação diferente sem eu explicar nada: clicar e arrastar para navegar, clicar na coluna central para mudar a escala. Fui incorporando cada uma dessas descobertas ao componente.
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/prototipo1.png")}
          >
            <Image src="/assets/depth/prototipo1.png" alt="Protótipo inicial no Figma" width={1200} height={675} className="w-full h-auto" />
          </div>
        </section>

        {/* Section 4 */}
        <section id="estrutura" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            4. A estrutura final: 3 colunas
          </h2>
          <div className="space-y-4 pt-2 text-stone-300 text-base sm:text-lg leading-relaxed">
            <p><strong className="text-white">1. Visão geral</strong> — todo o poço, com marcação do trecho visível</p>
            <p><strong className="text-white">2. Escala</strong> — ajuste por clique ou scroll</p>
            <p><strong className="text-white">3. Detalhe</strong> — zoom do trecho selecionado, com mais indicadores</p>
          </div>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/protipo2.png")}
          >
            <Image src="/assets/depth/protipo2.png" alt="As 3 colunas lado a lado" width={1200} height={675} className="w-full h-auto" />
          </div>
        </section>

        {/* Section 5 */}
        <section id="momento" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            5. O momento que faltava: &quot;E então, o que eu faço?&quot;
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Um grupo de teste simplesmente travou diante do componente. Essa pergunta me mostrou que a interação não era autoexplicativa para todo mundo. Criei uma legenda flutuante, inspirada em HUDs de jogos, que aparece ao passar o mouse e explica cada gesto disponível.
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/legend.png")}
          >
            <Image src="/assets/depth/legend.png" alt="Legenda flutuante em ação" width={1200} height={675} className="w-full h-auto" />
          </div>
        </section>

        {/* Section 6 */}
        <section id="resultado" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            6. Resultado
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Adoção imediata, sem necessidade de treinamento. O componente foi para o design system do produto, pronto para reuso em outras telas.
          </p>

          <div className="relative flex justify-center items-center bg-stone-900/40 mt-6 border border-stone-800 rounded-md aspect-video overflow-hidden">
            <video
              src="/assets/depth/final.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Section 7 */}
        <section id="aprendizado" className="space-y-4 pt-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            7. Aprendizado
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Nem todo problema de UX chega como reclamação, às vezes ele é só silenciosamente tolerado. E a forma mais rápida de descobrir a interação certa é colocar o protótipo na frente de gente real o quanto antes.
          </p>
        </section>

      </article>

      {/* Image Lightbox Overlay */}
      {expandedImage && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 transition-all cursor-zoom-out"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative flex justify-center items-center w-full max-w-7xl max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expandedImage}
              alt="Expanded view"
              className="shadow-2xl rounded-lg max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
