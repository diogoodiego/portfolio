"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components";
import me from "@/assets/me.png";

export default function CroftCaseStudy() {
  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />

      {/* Main Article Content Container - Clean, fluid minimalist layout */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs uppercase tracking-wider">
            UX/UI Design & Product Strategy • Estudo de Caso
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            De Inconsistência à Eficiência: Como construí um Design System do zero e reduzi o tempo de prototipagem de dias para horas
          </h1>

          <p className="text-stone-400 text-lg sm:text-xl leading-relaxed">
            A jornada de unificação visual de múltiplos ecossistemas digitais, estruturação de design tokens escaláveis e a criação de uma ponte ágil entre Design e Engenharia de Software.
          </p>

          {/* Meta Line */}
          <div className="flex items-center gap-4 pt-2 text-stone-400 text-xs sm:text-sm">
            <Image
              src={me}
              alt="Dio"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-white">Dio</div>
              <div>Lead Product Designer • Figma, Storybook, Tailwind, MUI • Julho, 2026</div>
            </div>
          </div>
        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 rounded-2xl aspect-video overflow-hidden">
          <video
            src="/assets/croft-mockup.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            1. O Desafio e o Contexto (O Caos Visual)
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Antes do início deste projeto, a empresa enfrentava um sério obstáculo de escalabilidade visual e técnica. Com o crescimento acelerado do ecossistema de produtos, diferentes squads desenvolveram plataformas e soluções de forma isolada. O resultado prático foi a fragmentação extrema da experiência do usuário: não existia qualquer padrão visual consolidado, e cada produto utilizava componentes extraídos de bibliotecas de terceiros distintas que não conversavam entre si.
          </p>
          <p className="font-medium text-stone-300">
            Esse cenário caótico gerava três grandes dores latentes:
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-stone-900/60 p-4 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">Inconsistência de Marca</h3>
              <p className="text-stone-400 text-sm">
                O usuário final experimentava interfaces e comportamentos de navegação completamente diferentes ao transicionar entre sistemas da mesma empresa.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">Desperdício de Engenharia</h3>
              <p className="text-stone-400 text-sm">
                Desenvolvedores precisavam recriar o mesmo componente (como botões, modais e inputs) dezenas de vezes, gerando código duplicado e difícil de manter.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">Gargalo no Design</h3>
              <p className="text-stone-400 text-sm">
                Interfaces de alta fidelidade exigiam dias de trabalho manual e repetitivo para serem desenhadas no Figma do zero, limitando o tempo dedicado à pesquisa e à arquitetura de informação.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            2. Meu Papel e a Colaboração com Engenharia
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Como o único e principal responsável pelo desenvolvimento do Design System, assumi o compromisso de idealizar, estruturar e validar toda a fundação visual e interativa das plataformas. Contudo, sabendo que um sistema de design só é bem-sucedido se for adotado pela engenharia, adotei uma postura colaborativa desde o dia zero.
          </p>
          <p className="text-stone-300 leading-relaxed">
            Estabeleci uma ponte de comunicação direta e contínua com a equipe de Front-End para entender suas maiores necessidades. Realizamos rodadas de alinhamento para responder a perguntas fundamentais:
          </p>
          <ul className="space-y-2 pl-2 text-stone-400 list-disc list-inside">
            <li>&quot;Qual a melhor forma de estruturar e nomear os tokens para o desenvolvimento?&quot;</li>
            <li>&quot;Que tipo de flexibilidade os componentes precisam ter no código?&quot;</li>
            <li>&quot;Como a documentação pode acelerar o handoff?&quot;</li>
          </ul>
          <p className="text-stone-300 leading-relaxed">
            Esse processo garantiu que cada decisão de design estivesse perfeitamente alinhada com as restrições técnicas e a arquitetura de código.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            3. Metodologia: Construindo as Fundações
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Para garantir foco e entrega contínua de valor, dividi o processo de construção do sistema em etapas pragmáticas:
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <h3 className="mb-1 font-semibold text-white">A. Auditoria de Componentes e Priorização</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Iniciei mapeando todas as interfaces existentes nos produtos da empresa para listar os elementos visuais mais recorrentes. Com essa planilha em mãos, priorizei a criação dos componentes que mais causavam atrito e que possuíam maior volume de uso simultâneo em todos os sistemas (como botões, formulários, alertas e modais).
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white">B. Estruturação Técnica dos Tokens (Adoção do Tailwind)</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Para a taxonomia e nomenclatura dos Design Tokens (cores, tipografia, espaçamentos, sombras), utilizei como base a convenção do Tailwind CSS. Essa escolha reduziu drasticamente a curva de aprendizado dos desenvolvedores, além de criar uma linguagem semântica universal entre o Figma e o código.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white">C. Estética e Inspiração (Material UI)</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Na definição estética e usabilidade de componentes complexos, utilizei o Material UI (MUI) como principal referência estrutural. Adaptei suas diretrizes de acessibilidade e estados interativos para refletir a nova identidade e tom de voz específicos da nossa empresa.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            4. Desafios Técnicos e Iteração Contínua
          </h2>
          <p className="text-stone-300 leading-relaxed">
            O maior desafio técnico do projeto foi projetar tokens de espaçamento, cor e elevação que fossem suficientemente flexíveis para cobrir todas as dezenas de casos específicos encontrados nas plataformas, sem inflar o sistema de forma desnecessária.
          </p>
          <p className="text-stone-300 leading-relaxed">
            A solução para esse obstáculo veio de um processo de iteração viva. Conforme avançava na criação dos componentes, eu os aplicava em cenários de testes reais baseados nas telas existentes. Sempre que uma lacuna visual ou de usabilidade era identificada, eu ajustava as regras de design tokens de forma centralizada e tratava o problema na raiz.
          </p>

          <blockquote className="bg-stone-900/80 p-4 rounded-xl text-stone-200 italic leading-relaxed">
            &quot;Um Design System eficiente não é estático; é um software em constante evolução. Cada componente foi testado sob estresse em layouts complexos e responsivos para garantir consistência em qualquer cenário de tela.&quot;
          </blockquote>
        </section>

        {/* Section 5 */}
        <section className="space-y-6">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            5. Impacto e Resultados Quantificáveis
          </h2>
          <p className="text-stone-300 leading-relaxed">
            A implementação do Design System transformou radicalmente a rotina de desenvolvimento e a qualidade das entregas. Conseguimos criar uma verdade única e documentada tanto no Figma quanto no Storybook.
          </p>

          {/* Metrics Grid */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl">De Dias → Horas</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs uppercase tracking-wider">Tempo de Entrega</div>
              <p className="text-stone-400 text-xs">Protótipos de alta fidelidade agora são gerados em poucas horas através de componentes pré-construídos.</p>
            </div>

            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl">100%</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs uppercase tracking-wider">Consistência</div>
              <p className="text-stone-400 text-xs">Unificação completa de todas as plataformas da empresa sob o mesmo guideline e biblioteca de tokens.</p>
            </div>

            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl">Zero</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs uppercase tracking-wider">Design &quot;Às Cegas&quot;</div>
              <p className="text-stone-400 text-xs">Fim das decisões visuais ad-hoc; documentação clara de uso indicado para cada token e componente.</p>
            </div>
          </div>

          <p className="text-stone-300 leading-relaxed">
            O principal impacto de negócio foi o aumento drástico na velocidade de entrega (time-to-market). Protótipos complexos, interativos e em alta fidelidade passaram a ser finalizados em poucas horas.
          </p>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 pt-2">
            <div className="bg-stone-900/40 p-4 rounded-xl">
              <div className="mb-1 font-semibold text-white text-sm">Antes do Design System</div>
              <p className="text-stone-400 text-xs">Mistura de bibliotecas, botões com raios de borda aleatórios, ausência de hierarquia visual consistente e tipografias sem escala definida.</p>
            </div>

            <div className="bg-stone-900/40 p-4 rounded-xl">
              <div className="mb-1 font-semibold text-white text-sm">Depois do Design System</div>
              <p className="text-stone-400 text-xs">Interface harmoniosa, alinhamento preciso por tokens de espaçamento, hierarquia tipográfica clara e componentes funcionais de alta fidelidade.</p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-3 pt-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            Conclusão
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Este projeto provou que um Design System maduro não é apenas uma coleção de arquivos e componentes bonitos no Figma, mas sim uma ferramenta estratégica que gera economia de escala, aproxima as áreas de tecnologia e produto, e garante uma experiência do usuário muito mais fluida, previsível e profissional.
          </p>
        </section>

      </article>
    </main>
  );
}
