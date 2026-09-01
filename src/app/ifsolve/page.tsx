"use client";

import React from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import me from "@/assets/me.png";

export default function IFSolveCaseStudy() {
  const tocItems = [
    { id: "ponto-de-partida", title: "1. O ponto de partida" },
    { id: "desafio", title: "2. O desafio" },
    { id: "como-trabalhei", title: "3. Como eu trabalhei" },
    { id: "achados", title: "4. Achados que me marcaram" },
    { id: "o-que-levo", title: "5. O que levo desse projeto" }
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
            Estudo de caso: avaliação heurística do IFSolve
          </div>

          <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            O que 51 problemas de usabilidade me ensinaram sobre olhar de verdade para uma interface
          </h1>

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
              <div>UX/UI Designer & Pesquisador de Usabilidade</div>
            </div>
          </div>
        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 shadow-2xl border border-white/5 rounded-2xl aspect-video overflow-hidden">
          <video
            src="/assets/ifsolve_home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section 1 */}
        <section id="ponto-de-partida" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            1. O ponto de partida
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Esse projeto nunca pareceu simples. Foi a primeira vez que fiz uma avaliação heurística completa de um software, e não apenas de uma tela isolada como exercício de aula. O IFSolve é um sistema de provas e questões online usado por alunos e professores, e o trabalho envolvia percorrer toda a experiência: login, criação de avaliações, cadastro de questões e resposta de provas.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Comparado aos exercícios anteriores, a diferença era clara. Eu não estava analisando um recorte pronto, eu precisava enxergar o sistema inteiro, entender o contexto de uso de cada tela e, principalmente, justificar cada problema encontrado com uma diretriz concreta.
          </p>
        </section>

        {/* Section 2 */}
        <section id="desafio" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            2. O desafio
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            O projeto fazia parte da faculdade, desenvolvido entre alunos e acompanhado por professores orientadores. Meu papel era percorrer cada tela do sistema como um usuário real faria, comparar o que encontrava com uma lista de diretrizes de usabilidade (a Lista Eureca, de Matos e Freire, 2023) e documentar cada desvio de forma clara o suficiente para que qualquer colega de equipe entendesse o problema e sua gravidade.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            No fim, o relatório reuniu <strong className="text-white">51 violações de diretriz</strong>, organizadas por tela, princípio violado e gravidade (crítico, grave, moderado, leve).
          </p>
        </section>

        {/* Section 3 */}
        <section id="como-trabalhei" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            3. Como eu trabalhei
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Separei o processo em três etapas que hoje uso como base pessoal para qualquer avaliação heurística:
          </p>
          <div className="space-y-4 pt-2 text-stone-300 text-base sm:text-lg leading-relaxed">
            <p><strong className="text-white">1. Mapear a jornada, não só as telas.</strong> Percorri o fluxo completo, login, criação de avaliação, cadastro de questão, resposta e visualização de resultado, como se fosse um aluno de verdade tentando terminar uma prova.</p>
            <p><strong className="text-white">2. Confrontar cada tela com a lista de diretrizes.</strong> Cada achado virou um &quot;VD&quot; (Violação de Diretriz), sempre com a mesma estrutura: descrição do problema, sugestão de correção, princípio violado e gravidade. Essa disciplina de formato foi o que tornou o relatório útil de verdade, e não só uma lista de opiniões.</p>
            <p><strong className="text-white">3. Priorizar pela gravidade, não pela quantidade.</strong> Ter 51 pontos não significa que o sistema é ruim, significa que dava pra separar sinal de ruído. Isso me ensinou a resistir à tentação de &quot;empilhar problemas&quot; e focar em comunicar o que realmente trava o usuário.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="achados" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            4. Alguns achados que me marcaram
          </h2>
          <ul className="list-disc list-inside space-y-4 pt-2 text-stone-300 text-base sm:text-lg leading-relaxed marker:text-rose-500">
            <li><strong className="text-white">A barra de busca que não fazia nada.</strong> O campo de pesquisa no topo do sistema simplesmente não respondia a cliques, um problema clássico de expectativa quebrada, classificado como crítico, porque o usuário nem percebe que é um erro: ele acha que é ele quem está fazendo algo errado.</li>
            <li><strong className="text-white">Perda silenciosa de dados.</strong> Se o usuário fechava a aba no meio do cadastro de uma avaliação, tudo que ele tinha digitado sumia sem aviso. Um problema invisível até acontecer com alguém, e aí já é tarde.</li>
            <li><strong className="text-white">Um campo de resposta que &quot;não existia&quot; visualmente.</strong> O campo de texto para respostas discursivas não tinha borda nem cor de fundo. Do ponto de vista técnico, o campo estava lá. Do ponto de vista do usuário, ele simplesmente não existia.</li>
            <li><strong className="text-white">Nenhum aviso ao tentar enviar uma prova em branco.</strong> Quando o usuário tentava submeter uma avaliação sem responder nenhuma questão, o sistema não exibia qualquer mensagem de alerta, um erro silencioso que só é descoberto depois, quando já é tarde para corrigir.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="o-que-levo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            5. O que eu levo desse projeto
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Eu não conhecia avaliação heurística antes desse projeto. Quem me apresentou o método foi a professora Silva Matos, autora da própria Lista Eureca usada na avaliação, e por isso cheguei sem nenhuma ideia formada sobre como o processo deveria funcionar. Isso acabou sendo bom: aprendi o método enquanto aplicava, sem preconceitos sobre o que &quot;devia&quot; encontrar ou como classificar cada problema.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Com o tempo, percebi que o valor real da avaliação está em traduzir percepção em argumento: não basta sentir que algo está errado, é preciso nomear o princípio, medir a gravidade e propor um caminho de solução que outra pessoa consiga executar sem precisar te perguntar nada.
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Foi também o projeto que me ensinou a não confundir volume com profundidade. Um relatório com 51 pontos só é útil se alguém conseguir abrir ele e, em cinco minutos, saber exatamente o que resolver primeiro.
          </p>
        </section>

      </article>
    </main>
  );
}
