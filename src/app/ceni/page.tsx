"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components";
import me from "@/assets/me.png";

export default function CeniCaseStudy() {
  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />

      {/* Main Article Content Container - Clean, fluid minimalist layout */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">
            Plugin Figma • UX/UI Design & Product Development • Estudo de Caso
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Ceni: Acelerando o Fluxo de UI Design com Geração Inteligente de Componentes no Figma
          </h1>

          <p className="text-stone-400 text-lg sm:text-xl leading-relaxed">
            Um plugin para Figma criado para gerar componentes base pré-configurados (com estados e animações), permitindo que UI Designers foquem no que importa: a customização visual.
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
              <div>UX/UI Designer & Desenvolvedor do Plugin • Figma API, TypeScript, React • 2026</div>
            </div>
          </div>
        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 rounded-2xl aspect-video overflow-hidden">
          <video
            src="/assets/ceni.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Section 1: Visão Geral */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            1. Visão Geral (Overview)
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            O Ceni nasceu da necessidade de eliminar tarefas manuais e repetitivas no fluxo diário de design de produto. Em vez de reconstruir estruturas de componentes básicas do zero a cada novo projeto, o plugin entrega esqueletos interativos e pré-configurados em segundos.
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-stone-900/60 p-4 sm:p-5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-lg">O que é o Ceni?</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Um plugin para Figma criado para gerar componentes base pré-configurados (com estados e animações), permitindo que UI Designers foquem no que importa: a customização visual.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 sm:p-5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-lg">Papel</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                UX/UI Designer e Desenvolvedor do Plugin.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 sm:p-5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-lg">Público-alvo</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                UI Designers que buscam agilidade na etapa de componentização de interfaces.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: O Desafio */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            2. O Desafio (O Problema)
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            A criação de componentes de interface do zero para diferentes projetos costuma ser um grande gargalo de produtividade. Configurar variantes, estados (hover, pressed, disabled) e animações repetidas vezes consome um tempo valioso que poderia ser gasto na própria experiência do usuário.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Durante minha rotina, percebi claramente essa dor. Cheguei a testar soluções de mercado, como o plugin Figr, que gera componentes baseados em paletas. Porém, notei dois problemas na minha jornada: a ferramenta era paga e, por ser excessivamente robusta e cheia de recursos, acabava sendo pesada e demorada para a geração rápida de componentes simples do dia a dia.
          </p>

          <blockquote className="bg-stone-900/80 p-5 rounded-xl text-stone-200 text-base sm:text-lg italic leading-relaxed">
            &quot;E se eu criasse meu próprio plugin, focado exclusivamente na velocidade e simplicidade?&quot;
          </blockquote>
        </section>

        {/* Section 3: A Solução */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            3. A Solução
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Foi assim que nasceu o Ceni. A proposta do plugin não é entregar um componente com o visual final perfeitamente pronto e estilizado, mas sim uma estrutura inteligente, quase como um &quot;wireframe&quot; interativo.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Ele entrega o componente com todas as interações e propriedades lógicas já amarradas. O design visual final (estética, cores, arredondamentos) fica totalmente livre para o designer customizar de acordo com o escopo do seu projeto.
          </p>
        </section>

        {/* Section 4: O Processo e o Design */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            4. O Processo e o Design (UI)
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Como o foco absoluto era a agilidade, a interface do próprio plugin precisava refletir esse princípio básico. Comecei prototipando uma UI minimalista, sem distrações e direta ao ponto:
          </p>

          <ul className="space-y-2 pl-2 text-stone-400 text-base sm:text-lg list-disc list-inside">
            <li>Uma tela de listagem estruturada em formato de cards.</li>
            <li>Barra de busca rápida com respostas imediatas.</li>
            <li>Filtros dinâmicos através de tags para encontrar componentes facilmente.</li>
          </ul>

          <div className="bg-stone-900/60 p-5 sm:p-6 rounded-xl space-y-2 pt-2">
            <h3 className="font-semibold text-white text-lg sm:text-xl">O Desafio Técnico</h3>
            <p className="text-stone-400 text-base leading-relaxed">
              O protótipo da interface no Figma foi a parte mais tranquila. O verdadeiro desafio — e o maior aprendizado prático deste projeto — foi sair da zona de conforto como designer para lidar com a curva de aprendizado do desenvolvimento utilizando a API do Figma. Compreender a árvore estrutural de renderização de nós (nodes) e como injetar propriedades e variantes ativas via código exigiu muita pesquisa, testes e resiliência técnica.
            </p>
          </div>
        </section>

        {/* Section 5: Como Funciona */}
        <section className="space-y-6">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            5. Como Funciona (O Fluxo Principal)
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            A usabilidade do Ceni foi pensada para resolver a dor em pouquíssimos segundos. O &quot;caminho feliz&quot; exige quase nenhum esforço mental do designer:
          </p>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl sm:text-3xl">01</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">Passo 1</div>
              <p className="text-stone-400 text-sm leading-relaxed">Abrir o plugin no canvas do projeto.</p>
            </div>

            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl sm:text-3xl">02</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">Passo 2</div>
              <p className="text-stone-400 text-sm leading-relaxed">Buscar e escolher o componente desejado.</p>
            </div>

            <div className="bg-stone-900/60 p-5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-2xl sm:text-3xl">03</div>
              <div className="mb-2 font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">Passo 3</div>
              <p className="text-stone-400 text-sm leading-relaxed">Clicar no botão de gerar.</p>
            </div>
          </div>

          <p className="text-stone-300 text-base sm:text-lg italic leading-relaxed">
            Pronto. O componente base já está inserido no canvas, perfeitamente linkado e pronto para receber a estilização visual final.
          </p>
        </section>

        {/* Section 6: Resultados, Aprendizados e Próximos Passos */}
        <section className="space-y-6">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            6. Resultados, Aprendizados e Próximos Passos
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            No momento, o Ceni funciona como uma poderosa ferramenta interna (MVP). Ele foi validado no meu próprio fluxo de trabalho e testado por um grupo seleto de amigos atuantes na área de design.
          </p>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 pt-2">
            <div className="bg-stone-900/60 p-5 sm:p-6 rounded-xl space-y-2">
              <div className="font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">Impacto & Ganho</div>
              <h3 className="font-bold text-white text-xl sm:text-2xl">Ganho de Produtividade</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                O tempo repetitivo e operacional que eu gastava configurando as propriedades fundamentais dos componentes caiu drasticamente, acelerando as entregas.
              </p>
            </div>

            <div className="bg-stone-900/60 p-5 sm:p-6 rounded-xl space-y-2">
              <div className="font-semibold text-rose-500 text-xs sm:text-sm uppercase tracking-wider">Impacto & Ganho</div>
              <h3 className="font-bold text-white text-xl sm:text-2xl">Visão Sistêmica Aprimorada</h3>
              <p className="text-stone-400 text-base leading-relaxed">
                Aprender a usar a API do Figma e programar a lógica de componentes me deu uma visão estrutural muito mais profunda de como os softwares de design operam. Isso me torna um designer mais completo e facilita enormemente o alinhamento e o handoff com os times de engenharia de software (Desenvolvedores).
              </p>
            </div>
          </div>

          <div className="bg-stone-900/40 p-5 sm:p-6 rounded-xl space-y-2">
            <h3 className="font-semibold text-white text-lg sm:text-xl">Próximos Passos</h3>
            <p className="text-stone-400 text-base leading-relaxed">
              O plano futuro é dedicar tempo para refinar e otimizar o código fonte, com o objetivo final de publicar o Ceni na Figma Community de forma gratuita, ajudando milhares de outros designers a otimizarem seus processos diários.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-3 pt-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            Conclusão
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Este projeto demonstra como a automação inteligente dentro das ferramentas de design pode transformar gargalos operacionais em ganhos reais de eficiência, permitindo que a criatividade e a usabilidade sejam os focos principais de qualquer entrega.
          </p>
        </section>

      </article>
    </main>
  );
}
