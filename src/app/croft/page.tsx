"use client";

import React from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import me from "@/assets/me.png";

export default function CroftCaseStudy() {
  const tocItems = [
    { id: "contexto", title: "1. O Desafio e o Contexto" },
    { id: "colaboracao", title: "2. Meu Papel e a Colaboração..." },
    { id: "metodologia", title: "3. Metodologia: Construindo..." },
    { id: "aprendizados", title: "4. Aprendizados e Mudanç..." },
    { id: "impacto", title: "5. Impacto e Resultados Q..." },
    { id: "conclusao", title: "Conclusão" }
  ];

  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white relative">
      <Navbar />
      <FloatingTOC items={tocItems} />

      {/* Main Article Content Container - Clean, fluid minimalist layout */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">
            UX/UI Design & Product Strategy • Estudo de Caso
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            De Inconsistência à Eficiência: Como construí um Design System do zero e reduzi o tempo de prototipagem de dias para horas
          </h1>

          <p className="text-stone-400 text-lg sm:text-xl leading-relaxed">
            A jornada de unificação visual de múltiplos ecossistemas digitais, estruturação de design tokens escaláveis e a criação de uma ponte ágil entre Design e Engenharia de Software.
          </p>

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
              <div>Lead Product Designer • Figma, Storybook, Tailwind, MUI • Agosto, 2026</div>
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
        <section id="contexto" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            1. O Desafio e o Contexto (O Caos Visual)
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Antes do início deste projeto, a empresa enfrentava um sério obstáculo de escalabilidade visual e técnica. Com o crescimento acelerado do ecossistema de produtos, diferentes squads desenvolveram plataformas e soluções de forma isolada. O resultado prático foi a fragmentação extrema da experiência do usuário: não existia qualquer padrão visual consolidado, e cada produto utilizava componentes extraídos de bibliotecas de terceiros distintas que não conversavam entre si.
          </p>

        </section>

        {/* Section 2 */}
        <section id="colaboracao" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            2. Meu Papel e a Colaboração com Engenharia
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Como o único e principal responsável pelo desenvolvimento do Design System, assumi o compromisso de idealizar, estruturar e validar toda a fundação visual e interativa das plataformas. Contudo, sabendo que um sistema de design só é bem-sucedido se for adotado pela engenharia, adotei uma postura colaborativa desde o dia zero.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Estabeleci uma ponte de comunicação direta e contínua com a equipe de Front-End para entender suas maiores necessidades. Realizamos rodadas de alinhamento para responder a perguntas fundamentais:
          </p>
          <ul className="space-y-2 pl-2 text-stone-400 text-base sm:text-lg list-disc list-inside">
            <li>&quot;Qual a melhor forma de estruturar e nomear os tokens para o desenvolvimento?&quot;</li>
            <li>&quot;Que tipo de flexibilidade os componentes precisam ter no código?&quot;</li>
            <li>&quot;Como a documentação pode acelerar o handoff?&quot;</li>
          </ul>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Esse processo garantiu que cada decisão de design estivesse perfeitamente alinhada com as restrições técnicas e a arquitetura de código.
          </p>
        </section>

        {/* Section 3 */}
        <section id="metodologia" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            3. Metodologia: Construindo as Fundações
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Para garantir foco e entrega contínua de valor, dividi o processo de construção do sistema em etapas pragmáticas:
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <h3 className="mb-1 font-semibold text-white text-base sm:text-lg">A. Auditoria de Componentes e Priorização</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Iniciei mapeando todas as interfaces existentes nos produtos da empresa para listar os elementos visuais mais recorrentes. Com essa planilha em mãos, priorizei a criação dos componentes que mais causavam atrito e que possuíam maior volume de uso simultâneo em todos os sistemas (como botões, formulários, alertas e modais).
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white text-base sm:text-lg">B. Estruturação Técnica dos Tokens (Adoção do Tailwind)</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Para a taxonomia e nomenclatura dos Design Tokens (cores, tipografia, espaçamentos, sombras), utilizei como base a convenção do Tailwind CSS. Essa escolha reduziu drasticamente a curva de aprendizado dos desenvolvedores, além de criar uma linguagem semântica universal entre o Figma e o código.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white text-base sm:text-lg">C. A Fundação Visual (Catálogo de Tokens)</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Para materializar as decisões técnicas, construí um inventário visual rigoroso. Abaixo estão as representações da nossa biblioteca principal, evidenciando a escala padronizada e as fundações estruturais do sistema:
              </p>
            </div>

            {/* Design Tokens Images Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium text-stone-300 text-sm">Cores & Opacidade</h4>
                  <div className="bg-stone-900/40 rounded-xl border border-stone-800 overflow-hidden">
                    <Image src="/assets/croft/Colors.png" alt="Cores e Opacidade" width={800} height={600} className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium text-stone-300 text-sm">Border Radius</h4>
                  <div className="bg-stone-900/40 rounded-xl border border-stone-800 overflow-hidden">
                    <Image src="/assets/croft/Radius.png" alt="Border Radius" width={800} height={400} className="w-full h-auto" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium text-stone-300 text-sm">Escala Tipográfica</h4>
                  <div className="bg-stone-900/40 rounded-xl border border-stone-800 overflow-hidden">
                    <Image src="/assets/croft/Typography.png" alt="Escala Tipográfica" width={800} height={300} className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium text-stone-300 text-sm">Espaçamento</h4>
                  <div className="bg-stone-900/40 rounded-xl border border-stone-800 overflow-hidden">
                    <Image src="/assets/croft/Spacing.png" alt="Espaçamento" width={800} height={300} className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium text-stone-300 text-sm">Superfícies & Elevação</h4>
                  <div className="bg-stone-900/40 rounded-xl border border-stone-800 overflow-hidden">
                    <Image src="/assets/croft/Elevation.png" alt="Superfícies e Elevação" width={800} height={400} className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="aprendizados" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            4. Aprendizados e Mudanças de Rota
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            O desenvolvimento de um Design System nunca é um caminho linear. Durante a prototipagem e a aplicação prática dos componentes, precisei desapegar de algumas certezas iniciais e pivotar minha abordagem:
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-stone-900/40 p-4 sm:p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">💡 Expandindo a Paleta para Visualização de Dados</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                A princípio, pensei em uma paleta de cores mais contida. Porém, ao focar na interface de monitoramento de poços e aplicações de uso científico da indústria de petróleo, ficou claro que a quantidade massiva de telemetria exigia muito mais variáveis visuais. Ampliei consideravelmente o range de cores (como evidenciado na biblioteca de tokens) para suprir os complexos templates de dashboards.
              </p>
            </div>
            <div className="bg-stone-900/40 p-4 sm:p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">💡 O Poder da Opacidade nos Estados de Interação</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Eu acreditava que a melhor prática seria sempre utilizar cores sólidas (sem opacidade) para evitar sobreposições e manter controle absoluto sobre o background. Na prática, ao trabalhar com opacidade (valores alpha) para interações como hover e pressed — especialmente em plataformas dark mode e flat —, consegui uma flexibilidade muito maior, evitando a criação manual de dezenas de cores estáticas para cada estado.
              </p>
            </div>
            <div className="bg-stone-900/40 p-4 sm:p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">💡 Minimalismo Tipográfico Científico</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Ao analisar a densidade informacional das aplicações de monitoramento, entendi que não necessitávamos de uma hierarquia tipográfica altamente variada. O foco das telas (dashboards densos e tabelas) demandava funcionalidade clean. Reduzi a escala tipográfica ao essencial, priorizando a legibilidade de dados numéricos em tabelas e formulários.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="impacto" className="space-y-6">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            5. Impacto e Resultados Quantificáveis
          </h2>

          {/* Metrics Grid */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 pt-2">
            <div className="bg-stone-900/60 p-6 rounded-xl text-center flex flex-col justify-center items-center border border-stone-800/50">
              <div className="mb-2 font-bold text-blue-500 text-3xl sm:text-4xl">De Dias &rarr; Horas</div>
              <div className="mb-2 font-semibold text-white text-xs sm:text-sm tracking-wider">Tempo de Entrega</div>
              <p className="text-stone-400 text-sm leading-relaxed">Protótipos de alta fidelidade agora são gerados em poucas horas através de componentes pré-construídos.</p>
            </div>

            <div className="bg-stone-900/60 p-6 rounded-xl text-center flex flex-col justify-center items-center border border-stone-800/50">
              <div className="mb-2 font-bold text-blue-500 text-3xl sm:text-4xl">100%</div>
              <div className="mb-2 font-semibold text-white text-xs sm:text-sm tracking-wider">Consistência</div>
              <p className="text-stone-400 text-sm leading-relaxed">Unificação completa de todas as plataformas da empresa sob o mesmo guideline e biblioteca de tokens.</p>
            </div>

            <div className="bg-stone-900/60 p-6 rounded-xl text-center flex flex-col justify-center items-center border border-stone-800/50">
              <div className="mb-2 font-bold text-blue-500 text-3xl sm:text-4xl">Zero</div>
              <div className="mb-2 font-semibold text-white text-xs sm:text-sm tracking-wider">Design &quot;Às Cegas&quot;</div>
              <p className="text-stone-400 text-sm leading-relaxed">Fim das decisões visuais ad-hoc; documentação clara de uso indicado para cada token e componente.</p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusao" className="space-y-4 pt-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            Conclusão
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Este projeto provou que um Design System maduro não é apenas uma coleção de arquivos e componentes bonitos no Figma, mas sim uma ferramenta estratégica que gera economia de escala, aproxima as áreas de tecnologia e produto, e garante uma experiência do usuário muito mais fluida, previsível e profissional.
          </p>
          <div className="bg-stone-900 mt-6 rounded-2xl aspect-video overflow-hidden">
            <video
              src="/assets/croft_banner_dark_animated.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

      </article>
    </main>
  );
}
