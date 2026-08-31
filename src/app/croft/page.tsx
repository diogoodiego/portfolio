"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar, FloatingTOC } from "@/components";
import me from "@/assets/me.png";

export default function CroftCaseStudy() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    { src: "/assets/croft/Colors.png", alt: "Cores & Opacidade" },
    { src: "/assets/croft/Typography.png", alt: "Escala Tipográfica" },
    { src: "/assets/croft/Spacing.png", alt: "Espaçamento" },
    { src: "/assets/croft/Radius.png", alt: "Border Radius" },
    { src: "/assets/croft/Elevation.png", alt: "Superfícies & Elevação" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const tocItems = [
    { id: "overview", title: "1. Overview" },
    { id: "problema", title: "2. O problema" },
    { id: "processo", title: "3. Meu processo" },
    { id: "decisoes", title: "4. Decisões e aprendizados" },
    { id: "antes-depois", title: "5. Antes / depois" },
    { id: "impacto", title: "6. Impacto" }
  ];

  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white relative">
      <Navbar />
      <FloatingTOC items={tocItems} />

      {/* Main Article Content Container */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm tracking-wider">
            UX/UI Design & Product Strategy • Estudo de caso
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Construindo um design system para dashboards de alta densidade de dados
          </h1>

          <div className="text-stone-400 text-base sm:text-lg leading-relaxed space-y-2 bg-stone-900/40 p-6 rounded-xl border border-stone-800/50">
            <div><strong className="text-stone-300">Meu papel:</strong> Design Lead / Responsável principal</div>
            <div><strong className="text-stone-300">Ferramentas:</strong> Figma, Storybook</div>
            <div><strong className="text-stone-300">Referências de base:</strong> Tailwind (nomenclatura de tokens), MUI (estética de componentes)</div>
            <div><strong className="text-stone-300">Colaboração:</strong> Time de Front-end</div>
          </div>

          {/* Meta Line */}
          <div className="flex items-center gap-4 pt-2 text-stone-400 text-sm sm:text-base">
            <Image
              src={me}
              alt="Dio"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-white">Dio</div>
              <div>Lead Product Designer</div>
            </div>
          </div>
        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 rounded-2xl aspect-video overflow-hidden pointer-events-none flex items-center justify-center">
          <iframe 
            src="https://www.youtube.com/embed/1YIOsf6_l24?autoplay=1&loop=1&playlist=1YIOsf6_l24&controls=0&mute=1&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full scale-[1.4]"
          ></iframe>
        </div>

        {/* Section 1 */}
        <section id="overview" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            1. Overview
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Cada produto da empresa tinha sua própria identidade visual, com bibliotecas de componentes diferentes e nenhum vocabulário em comum. Fui o principal responsável por criar um design system do zero para produtos de monitoramento de dados de poços e aplicações científicas, unificando tokens, componentes e documentação. O resultado foi consistência visual entre sistemas, uma documentação viva que virou referência para novas telas, e uma redução real no tempo de entrega: telas que levavam de 3 a 4 dias para serem prototipadas passaram a ser feitas em 1 a 2 dias.
          </p>
        </section>

        {/* Section 2 */}
        <section id="problema" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            2. O problema
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Não existia padrão visual entre os produtos. Cada aplicação usava uma biblioteca diferente, sem harmonia entre cores, espaçamentos ou tipografia. Isso gerava produtos que pareciam pertencer a empresas diferentes, e retrabalho constante: cada tela nova era uma decisão de design do zero, sem tokens definidos nem critério compartilhado do que era certo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setExpandedImage("/assets/croft/old_automud.png")}
            >
              <Image src="/assets/croft/old_automud.png" alt="Interface antiga Automud" width={800} height={450} className="w-full h-auto" />
            </div>
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setExpandedImage("/assets/croft/old_gold.jpg")}
            >
              <Image src="/assets/croft/old_gold.jpg" alt="Interface antiga Gold" width={800} height={450} className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="processo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            3. Meu processo
          </h2>
          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              <strong className="text-white">Ouvindo quem ia usar o sistema.</strong> Antes de desenhar qualquer token, conversei com o time de front-end para entender o que eles realmente precisavam. Essa conversa moldou as prioridades: quais componentes tinham mais atrito na implementação e onde estavam as maiores dores de manutenção.
            </p>
            <p>
              <strong className="text-white">Definindo prioridades.</strong> Priorizei os componentes mais utilizados em todos os sistemas da empresa, não o mais bonito ou complexo, mas o que traria ganho de consistência mais rápido para o maior número de produtos.
            </p>
            <p>
              <strong className="text-white">Estruturando os tokens.</strong> Usei o Tailwind como referência de nomenclatura e o MUI como referência estética para alguns componentes, adaptando ambos ao contexto de dashboards densos em dados, voltados a um público técnico e científico.
            </p>
            <p>
              <strong className="text-white">Documentando em dois lugares.</strong> A documentação foi construída no Figma (specs e guidelines para o time de design) e no Storybook (componentes vivos para o front-end). Manter os dois sincronizados foi parte do trabalho tanto quanto desenhar os componentes.
            </p>
          </div>

          {/* Slider */}
          <div className="mt-8 relative group">
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer aspect-video relative flex items-center justify-center"
              onClick={() => setExpandedImage(sliderImages[currentSlide].src)}
            >
              <Image 
                src={sliderImages[currentSlide].src} 
                alt={sliderImages[currentSlide].alt} 
                fill
                className="object-contain p-2 transition-transform hover:scale-[1.02]" 
              />
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-stone-950/80 hover:bg-stone-800 text-stone-300 p-2 rounded-full border border-stone-700/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-stone-950/80 hover:bg-stone-800 text-stone-300 p-2 rounded-full border border-stone-700/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {sliderImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? "w-6 bg-rose-500" : "w-2 bg-stone-700 hover:bg-stone-500"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-stone-500 text-sm mt-2">{sliderImages[currentSlide].alt}</p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="decisoes" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            4. Decisões e aprendizados
          </h2>
          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed pt-2">
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">1. Uma paleta ampla era necessidade, não luxo</h3>
              <p className="text-stone-400">Dashboards de monitoramento de poços representam muitas variáveis simultâneas, com múltiplas curvas sobrepostas no mesmo gráfico. Isso exigiu uma paleta bem mais ampla do que o usual, tanto para os templates iniciais quanto para as sugestões de cor nos formulários de customização, onde o próprio usuário escolhe como visualizar seus dados.</p>
            </div>
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">2. Eu estava errado sobre opacidade</h3>
              <p className="text-stone-400">Minha primeira decisão foi evitar cores com opacidade variável, para manter controle total sem depender do que estava atrás de cada elemento. Na prática, opacidade se mostrou a forma mais prática de resolver estados de interação como hover e pressed, sem precisar definir manualmente uma cor para cada estado em cada superfície do sistema. Foi uma das decisões que mais precisei desaprender no projeto.</p>
            </div>
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">3. Tipografia enxuta por design</h3>
              <p className="text-stone-400">O produto é voltado a dashboards e formulários, não a conteúdo editorial. Por isso optei por uma escala tipográfica compacta, o que manteve a interface previsível e reduziu decisões desnecessárias no uso do design system.</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="antes-depois" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            5. Antes / depois
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-400 text-lg">Antes</h3>
              <div 
                className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setExpandedImage("/assets/croft/old_gold.jpg")}
              >
                <Image src="/assets/croft/old_gold.jpg" alt="Interface antiga" width={800} height={450} className="w-full h-auto" />
              </div>
              <p className="text-stone-500 text-sm">Design fragmentado e sem padrão visual estabelecido.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-rose-500 text-lg">Depois</h3>
              <div 
                className="bg-stone-900/40 rounded-md border border-stone-700 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setExpandedImage("/assets/croft/new_gold.jpg")}
              >
                <Image src="/assets/croft/new_gold.jpg" alt="Interface nova" width={800} height={450} className="w-full h-auto" />
              </div>
              <p className="text-stone-400 text-sm">Interface unificada com o novo Design System, mais limpa e consistente.</p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="impacto" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            6. Impacto
          </h2>
          <ul className="space-y-3 text-stone-300 text-base sm:text-lg leading-relaxed list-disc list-inside pt-2">
            <li>Consistência visual entre produtos que antes pareciam de empresas diferentes.</li>
            <li>Documentação viva no Figma e no Storybook, usada como referência no dia a dia.</li>
            <li>Telas que levavam de 3 a 4 dias para serem prototipadas passaram a ser feitas em 1 a 2 dias, com alta fidelidade e interações animadas.</li>
            <li>Em telas mais simples, o time de front-end passou a prototipar diretamente no código, com apoio do design, algo possível só porque o design system já era confiável o suficiente para sustentar esse fluxo.</li>
          </ul>
        </section>

      </article>

      {/* Image Lightbox Overlay */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out backdrop-blur-sm transition-all"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={expandedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}
