"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components";
import me from "@/assets/me.png";

export default function IFSolveCaseStudy() {
  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />

      {/* Main Article Content Container - Clean, fluid minimalist layout */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs uppercase tracking-wider">
            Avaliação Heurística • UX Research & Redesign de Interface • Estudo de Caso
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Avaliação Heurística e Redesign do Sistema IFSolve: Eliminando Atritos e Prevenindo Erros Críticos em Avaliações Digitais
          </h1>

          <p className="text-stone-400 text-lg sm:text-xl leading-relaxed">
            Como uma auditoria minuciosa de usabilidade baseada na Lista Eureca identificou 51 violações e guiou o redesign de uma plataforma acadêmica com foco em acessibilidade, responsividade e prevenção de falhas humanas.
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
              <div>UX/UI Designer & Pesquisador de Usabilidade • Lista Eureca, WCAG 2.1, Figma • 2023 - 2024</div>
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

        {/* Section 1: O Desafio e o Contexto */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            1. O Desafio e o Contexto
          </h2>
          <p className="text-stone-300 leading-relaxed">
            O IFSolve nasceu como um projeto acadêmico desenvolvido em grupo, com o propósito de solucionar uma dor clara no ambiente educacional: facilitar a aplicação de provas e criar um repositório centralizado onde professores pudessem armazenar e reutilizar questões de forma eficiente.
          </p>
          <p className="text-stone-300 leading-relaxed">
            Embora o sistema fosse funcional, a interface original apresentava atritos que prejudicavam a experiência tanto de quem aplicava (professores) quanto de quem resolvia as provas (alunos).
          </p>
          <p className="text-stone-300 leading-relaxed">
            Meu papel neste projeto foi conduzir uma auditoria rigorosa de usabilidade e propor intervenções focadas em acessibilidade, prevenção de erros e consistência visual.
          </p>

          <div className="gap-3 grid grid-cols-1 md:grid-cols-3 pt-2">
            <div className="bg-stone-900/60 p-4 border border-white/5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">O que é o IFSolve?</h3>
              <p className="text-stone-400 text-sm">
                Plataforma acadêmica para criação, aplicação e gerenciamento centralizado de provas e repositório de questões educacionais.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 border border-white/5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">Meu Papel</h3>
              <p className="text-stone-400 text-sm">
                Auditoria heurística de usabilidade, diagnóstico técnico dos gargalos e redesign de fluxos de interação e interfaces.
              </p>
            </div>

            <div className="bg-stone-900/60 p-4 border border-white/5 rounded-xl">
              <h3 className="mb-1 font-semibold text-white text-base">Pilares Centrais</h3>
              <p className="text-stone-400 text-sm">
                Acessibilidade (WCAG 2.1), prevenção ativa de erros críticos e responsividade mobile integral.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: O Processo: Mapeando a Usabilidade */}
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            2. O Processo: Mapeando a Usabilidade
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Para estruturar a análise com rigor científico, utilizei a <span className="font-semibold text-white">Lista Eureca de Diretrizes de Usabilidade (Matos e Freire, 2023)</span>. Esta metodologia proporcionou um olhar analítico, sistemático e focado sobre cada ponto de contato e interação do usuário na plataforma.
          </p>
          <p className="text-stone-300 leading-relaxed">
            O maior desafio do processo foi a natureza repetitiva e minuciosa da tarefa. Passar pelas mesmas telas diversas vezes simulando diferentes cenários exigiu um alto nível de atenção aos detalhes, garantindo que nenhuma violação sutil passasse despercebida.
          </p>

          {/* Metrics & Overview Banner */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 pt-2">
            <div className="bg-stone-900/60 p-5 border border-white/5 rounded-xl text-center">
              <div className="mb-1 font-bold text-rose-500 text-3xl sm:text-4xl">51</div>
              <div className="mb-1 font-semibold text-white text-xs uppercase tracking-wider">Violações Documentadas</div>
              <p className="text-stone-400 text-xs">Mapeadas minuciosamente em todos os fluxos de professores e alunos.</p>
            </div>

            <div className="bg-stone-900/60 p-5 border border-white/5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-3xl sm:text-4xl">4 Níveis</div>
              <div className="mb-1 font-semibold text-rose-500 text-xs uppercase tracking-wider">Escala de Gravidade</div>
              <p className="text-stone-400 text-xs">Classificação em Leve, Moderado, Grave e Crítico para priorização.</p>
            </div>

            <div className="bg-stone-900/60 p-5 border border-white/5 rounded-xl text-center">
              <div className="mb-1 font-bold text-white text-3xl sm:text-4xl">Eureca</div>
              <div className="mb-1 font-semibold text-rose-500 text-xs uppercase tracking-wider">Framework Teórico</div>
              <p className="text-stone-400 text-xs">Metodologia consolidada de diretrizes de usabilidade (Matos e Freire, 2023).</p>
            </div>
          </div>
        </section>

        {/* Section 3: Diagnóstico e Priorização (O Foco no Impacto) */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="font-bold text-white text-2xl tracking-tight">
              3. Diagnóstico e Priorização (O Foco no Impacto)
            </h2>
            <p className="text-stone-300 leading-relaxed">
              Com um backlog de 51 problemas identificados, o passo seguinte exigiu priorização estratégica. Selecionei os gargalos mais críticos da jornada — aqueles com potencial direto de impedir o sucesso do usuário ou causar frustrações irreversíveis. Abaixo, detalho os três principais problemas atacados e o racional por trás do redesign.
            </p>
          </div>

          {/* Problema A */}
          <div className="space-y-6 bg-stone-900/60 p-6 sm:p-8 border border-rose-500/20 rounded-2xl">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="bg-rose-500/10 px-3 py-1 border border-rose-500/30 rounded-full font-semibold text-rose-400 text-xs uppercase tracking-wider">
                Gravidade: Crítico
              </span>
              <span className="font-mono text-stone-400 text-xs">
                Diretrizes: AF9 (Prevenção de erros) • CO2 (Feedback Adequado)
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-xl sm:text-2xl">
                Problema A: A Armadilha da Submissão Vazia (Prevenção de Erros)
              </h3>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Cenário</h4>
                <p className="text-stone-400 leading-relaxed">
                  Na tarefa principal do aluno — responder a uma avaliação —, o sistema permitia que uma prova fosse submetida inteiramente em branco, sem qualquer alerta ou barreira de confirmação.
                </p>
              </div>

              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Impacto (UX e Negócio)</h4>
                <p className="text-stone-400 leading-relaxed">
                  Em um contexto avaliativo, o custo desse erro é altíssimo. O aluno sofria com frustração e ansiedade pelo envio acidental, enquanto o professor lidava com dados corrompidos (provas nulas). A interface falhava em proteger o usuário de ações não intencionais.
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-stone-950/80 p-5 border border-emerald-500/20 rounded-xl">
              <h4 className="font-semibold text-emerald-400 text-sm uppercase tracking-wide">A Solução Projetada</h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                Projetei um sistema de feedback imediato. O botão de submissão permanece desabilitado e só é ativado após o preenchimento das questões essenciais, além da inclusão de um modal de confirmação com resumo das respostas e alerta seguro contra fechamento acidental da tela.
              </p>
            </div>
          </div>

          {/* Problema B */}
          <div className="space-y-6 bg-stone-900/60 p-6 sm:p-8 border border-rose-500/20 rounded-2xl">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="bg-rose-500/10 px-3 py-1 border border-rose-500/30 rounded-full font-semibold text-rose-400 text-xs uppercase tracking-wider">
                Gravidade: Crítico
              </span>
              <span className="font-mono text-stone-400 text-xs">
                Diretrizes: PD3 (Responsividade) • FM6 (Proximidade)
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-xl sm:text-2xl">
                Problema B: A Barreira Mobile (Responsividade)
              </h3>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Cenário</h4>
                <p className="text-stone-400 leading-relaxed">
                  A tela não possuía comportamento responsivo, gerando quebras severas de layout em telas menores. A barra de navegação superior, por exemplo, sobrepunha o conteúdo de forma inadequada e ocultava elementos cruciais.
                </p>
              </div>

              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Impacto</h4>
                <p className="text-stone-400 leading-relaxed">
                  No ecossistema de educação pública e acadêmica, o smartphone é frequentemente o principal — ou único — dispositivo de acesso do estudante. A falta de responsividade configurava uma barreira direta de acessibilidade digital.
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-stone-950/80 p-5 border border-emerald-500/20 rounded-xl">
              <h4 className="font-semibold text-emerald-400 text-sm uppercase tracking-wide">A Solução Projetada</h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                Reestruturação completa do grid estrutural. O layout foi reorganizado para adotar orientação vertical no mobile, otimizando os botões de ação e alvos de toque (touch targets) e colapsando a navegação em um menu hambúrguer para preservar 100% da área útil de leitura.
              </p>
            </div>
          </div>

          {/* Problema C */}
          <div className="space-y-6 bg-stone-900/60 p-6 sm:p-8 border border-amber-500/20 rounded-2xl">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="bg-amber-500/10 px-3 py-1 border border-amber-500/30 rounded-full font-semibold text-amber-400 text-xs uppercase tracking-wider">
                Gravidade: Grave
              </span>
              <span className="font-mono text-stone-400 text-xs">
                Diretrizes: FM1 (Visibilidade) • FM9 (Contraste WCAG 2.1)
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-xl sm:text-2xl">
                Problema C: Cegueira Visual na Interface (Acessibilidade e Contraste)
              </h3>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Cenário</h4>
                <p className="text-stone-400 leading-relaxed">
                  Múltiplos elementos interativos essenciais, como campos de texto para respostas discursivas e placeholders de preenchimento, apresentavam tons quase idênticos à cor de fundo, sem qualquer delimitação de bordas.
                </p>
              </div>

              <div className="space-y-2 bg-stone-950/60 p-4 border border-white/5 rounded-xl">
                <h4 className="font-semibold text-stone-200">O Impacto</h4>
                <p className="text-stone-400 leading-relaxed">
                  O baixo contraste dificultava severamente a identificação das áreas clicáveis, exigindo esforço cognitivo desnecessário do usuário para descobrir onde digitar e violando os critérios globais de acessibilidade da WCAG 2.1.
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-stone-950/80 p-5 border border-emerald-500/20 rounded-xl">
              <h4 className="font-semibold text-emerald-400 text-sm uppercase tracking-wide">A Solução Projetada</h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                Ajuste imediato da paleta cromática dos componentes de formulário. Introduzi bordas com contraste balanceado e reajustei as cores de texto e placeholders para garantir a proporção mínima de contraste exigida pelas normas de acessibilidade, mantendo o visual limpo e legível.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Conclusão e Próximos Passos */}
        <section className="space-y-6">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            4. Conclusão e Próximos Passos
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Realizar a avaliação heurística do IFSolve foi um exercício poderoso de empatia analítica. A aplicação metódica da Lista Eureca permitiu transformar percepções subjetivas de &quot;interface confusa&quot; em um diagnóstico técnico, acionável e focado em melhorias reais de usabilidade.
          </p>
          <p className="text-stone-300 leading-relaxed">
            O maior aprendizado foi compreender que pequenos desajustes de contraste ou a ausência de um simples modal de aviso possuem um efeito em cadeia tremendo na confiança e segurança emocional do usuário durante momentos de alta pressão, como a realização de um exame.
          </p>

          <blockquote className="bg-stone-900/80 p-5 border-rose-500 border-l-4 rounded-xl text-stone-200 italic leading-relaxed">
            &quot;Heurísticas são bússolas excelentes, mas não substituem o mapa real que é o usuário.&quot;
          </blockquote>

          <div className="space-y-2 bg-stone-900/60 p-5 border border-white/5 rounded-xl">
            <h3 className="font-semibold text-white text-lg">O Próximo Passo</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Como evolução contínua deste projeto, o objetivo é colocar os novos protótipos construídos nas mãos dos professores e alunos. A realização de Testes de Usabilidade moderados será fundamental para validar se as hipóteses de redesenho eliminaram a fricção na prática ou se geraram novos comportamentos que demandem ajustes.
            </p>
          </div>
        </section>

      </article>
    </main>
  );
}
