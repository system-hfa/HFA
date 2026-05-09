'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }
        .delay-5 { animation-delay: 0.5s; opacity: 0; }
        .delay-6 { animation-delay: 0.6s; opacity: 0; }

        .pipeline-card:hover {
          border-color: #3B82F6;
          background-color: #0D1E35;
        }
        .feature-card:hover {
          border-color: #3B82F6;
        }
        .comparison-row:hover {
          background-color: rgba(59,130,246,0.04);
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: '#060B14', color: '#fff', minHeight: '100vh' }}>

        {/* NAVBAR */}
        <nav style={{ backgroundColor: '#060B14', borderBottom: '1px solid rgba(148,163,184,0.12)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#60A5FA', letterSpacing: '-0.5px' }}>HFA</span>
              <span style={{ fontSize: '12px', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>SERA Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <a
                href="#metodologia"
                onClick={e => { e.preventDefault(); document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'none', fontWeight: 400 }}
              >
                Metodologia
              </a>
              <a
                href="#sobre-sera"
                onClick={e => { e.preventDefault(); document.getElementById('sobre-sera')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'none', fontWeight: 400 }}
              >
                Sobre o SERA
              </a>
              <Link href="/login" style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'none', fontWeight: 400 }}>Entrar</Link>
              <Link href="/register" style={{ backgroundColor: '#2563EB', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Começar grátis
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          backgroundColor: '#060B14',
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px' }}>
            <div className="animate-fade-up delay-1" style={{
              display: 'inline-block',
              backgroundColor: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '999px',
              padding: '5px 16px',
              fontSize: '13px',
              color: '#93C5FD',
              marginBottom: '28px',
              letterSpacing: '0.02em',
            }}>
              Metodologia SERA &bull; Base Científica Validada
            </div>

            <h1 className="animate-fade-up delay-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '64px', lineHeight: 1.12, margin: '0 0 24px', fontWeight: 400 }}>
              Análise de Fatores Humanos<br />
              <span style={{ color: '#60A5FA' }}>com rigor científico</span>
            </h1>

            <p className="animate-fade-up delay-3" style={{ fontSize: '20px', color: '#94A3B8', lineHeight: 1.65, marginBottom: '40px', maxWidth: '660px', margin: '0 auto 40px' }}>
              Plataforma SaaS para investigação de eventos operacionais utilizando a metodologia SERA —
              desenvolvida por K.C. Hendy (Defence R&amp;D Canada, 2003) e validada em estudos da aviação offshore brasileira.
            </p>

            <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '56px', flexWrap: 'wrap' }}>
              <Link href="/register" style={{
                backgroundColor: '#2563EB',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 500,
                textDecoration: 'none',
              }}>
                Iniciar análise gratuita →
              </Link>
              <button
                onClick={() => document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  backgroundColor: 'transparent',
                  color: '#CBD5E1',
                  border: '1px solid #334155',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 400,
                  cursor: 'pointer',
                }}
              >
                Conhecer a metodologia ↓
              </button>
            </div>

            <div className="animate-fade-up delay-5" style={{ display: 'flex', justifyContent: 'center', gap: '0', borderTop: '1px solid rgba(148,163,184,0.1)', paddingTop: '40px' }}>
              {[
                { value: '70–80%', label: 'dos acidentes têm causas humanas identificáveis' },
                { value: '7 etapas', label: 'de análise sistemática e determinística' },
                { value: '3 níveis', label: 'Percepção · Objetivo · Ação' },
              ].map((m, i) => (
                <div key={i} style={{ flex: 1, padding: '0 24px', borderLeft: i > 0 ? '1px solid rgba(148,163,184,0.12)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#60A5FA', marginBottom: '6px' }}>{m.value}</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 3 — O PROBLEMA */}
        <section id="metodologia" style={{ backgroundColor: '#0A1628', padding: '96px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
            {/* Coluna esquerda */}
            <div>
              <div style={{ fontSize: '11px', color: '#3B82F6', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>O PROBLEMA</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', lineHeight: 1.2, fontWeight: 400, margin: '0 0 24px', color: '#F1F5F9' }}>
                &ldquo;Erro humano&rdquo;<br />não é uma resposta.
              </h2>
              <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.8, marginBottom: '16px' }}>
                Durante décadas, investigações de acidentes encerravam com a conclusão &ldquo;erro humano&rdquo; — como se isso
                explicasse alguma coisa. É como dizer que uma queda foi causada pela gravidade: tecnicamente verdadeiro, completamente
                inútil para prevenir o próximo acidente.
              </p>
              <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.8, marginBottom: '32px' }}>
                O que precisamos saber é: por que o operador agiu assim? Quais condições tornaram o erro inevitável?
                O que a organização poderia ter feito diferente?
              </p>
              <blockquote style={{ borderLeft: '3px solid #3B82F6', paddingLeft: '20px', margin: 0 }}>
                <p style={{ fontSize: '15px', color: '#CBD5E1', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '10px' }}>
                  &ldquo;Labeling an event as &apos;human error&apos; provides no useful information about why the error occurred
                  or how to prevent it from occurring again.&rdquo;
                </p>
                <cite style={{ fontSize: '13px', color: '#64748B', fontStyle: 'normal' }}>— K.C. Hendy, SERA (2003)</cite>
              </blockquote>
            </div>

            {/* Coluna direita */}
            <div style={{ backgroundColor: '#0D1A2D', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(148,163,184,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '12px', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Comparação de abordagens</span>
              </div>
              <div className="comparison-row" style={{ padding: '24px', borderBottom: '1px solid rgba(148,163,184,0.07)', transition: 'background 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>❌</span>
                  <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Abordagem tradicional</span>
                </div>
                <div style={{ fontSize: '17px', color: '#F1F5F9', fontFamily: "'DM Serif Display', serif", marginBottom: '10px' }}>&ldquo;Erro do piloto&rdquo;</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#475569', marginTop: '2px' }}>→</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>Nenhuma ação preventiva derivada. Arquivo encerrado.</span>
                </div>
              </div>
              <div className="comparison-row" style={{ padding: '24px', transition: 'background 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>✅</span>
                  <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Abordagem SERA</span>
                </div>
                <div style={{ fontSize: '15px', color: '#F1F5F9', fontFamily: "'DM Serif Display', serif", marginBottom: '12px' }}>
                  &ldquo;P-E: pressão de tempo autoimposta por ansiedade situacional&rdquo;
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#3B82F6', marginTop: '2px' }}>→</span>
                  <span style={{ fontSize: '14px', color: '#94A3B8' }}>Programa de avaliação psicológica periódica implementado.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4 — PIPELINE SERA */}
        <section style={{ backgroundColor: '#060B14', padding: '96px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', fontWeight: 400, color: '#F1F5F9', margin: '0 0 16px' }}>
                7 etapas. Um diagnóstico completo.
              </h2>
              <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '560px', margin: '0 auto' }}>
                O pipeline SERA transforma um relato de evento em classificação estruturada de falhas humanas.
              </p>
            </div>

            {/* Pipeline cards */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch', overflowX: 'auto', paddingBottom: '8px' }}>
              {/* Etapas 1–2 */}
              {[
                { n: '1', name: 'Resumo', desc: 'Extração e estruturação do relato do evento' },
                { n: '2', name: 'Ponto de Fuga', desc: 'Identificação do momento crítico de decisão' },
              ].map((s) => (
                <div key={s.n} className="pipeline-card" style={{
                  flex: '0 0 140px',
                  backgroundColor: '#0A1628',
                  border: '1px solid rgba(148,163,184,0.12)',
                  borderRadius: '10px',
                  padding: '20px 16px',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  cursor: 'default',
                }}>
                  <div style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 600, marginBottom: '8px' }}>Etapa {s.n}</div>
                  <div style={{ fontSize: '15px', color: '#F1F5F9', fontWeight: 500, marginBottom: '8px' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}

              {/* Conector */}
              <div style={{ display: 'flex', alignItems: 'center', color: '#334155', fontSize: '18px', padding: '0 4px' }}>→</div>

              {/* Etapas 3-4-5 em paralelo */}
              <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', letterSpacing: '0.08em', marginBottom: '4px' }}>PARALELO</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'stretch' }}>
                  <div style={{ width: '3px', background: 'rgba(59,130,246,0.3)', borderRadius: '2px', alignSelf: 'stretch' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      { n: '3', name: 'Percepção', desc: 'Análise da percepção do operador' },
                      { n: '4', name: 'Objetivo', desc: 'Avaliação do objetivo perseguido' },
                      { n: '5', name: 'Ação', desc: 'Classificação da ação executada' },
                    ].map((s) => (
                      <div key={s.n} className="pipeline-card" style={{
                        width: '148px',
                        backgroundColor: '#0A1628',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        transition: 'border-color 0.2s, background-color 0.2s',
                        cursor: 'default',
                      }}>
                        <div style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 600, marginBottom: '6px' }}>Etapa {s.n}</div>
                        <div style={{ fontSize: '14px', color: '#F1F5F9', fontWeight: 500, marginBottom: '4px' }}>{s.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conector */}
              <div style={{ display: 'flex', alignItems: 'center', color: '#334155', fontSize: '18px', padding: '0 4px' }}>→</div>

              {/* Etapas 6–7 */}
              {[
                { n: '6', name: 'Conclusão', desc: 'Síntese diagnóstica das falhas identificadas' },
                { n: '7', name: 'Recomendações', desc: 'Ações preventivas estruturadas por nível' },
              ].map((s) => (
                <div key={s.n} className="pipeline-card" style={{
                  flex: '0 0 140px',
                  backgroundColor: '#0A1628',
                  border: '1px solid rgba(148,163,184,0.12)',
                  borderRadius: '10px',
                  padding: '20px 16px',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  cursor: 'default',
                }}>
                  <div style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 600, marginBottom: '8px' }}>Etapa {s.n}</div>
                  <div style={{ fontSize: '15px', color: '#F1F5F9', fontWeight: 500, marginBottom: '8px' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#475569', marginTop: '36px' }}>
              O mesmo evento analisado duas vezes produz sempre o mesmo resultado — o pipeline é determinístico.
            </p>
          </div>
        </section>

        {/* SEÇÃO 5 — BASE CIENTÍFICA */}
        <section id="sobre-sera" style={{ backgroundColor: '#0A1628', padding: '96px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '56px' }}>
              <div style={{ fontSize: '11px', color: '#3B82F6', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>BASE CIENTÍFICA</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', fontWeight: 400, color: '#F1F5F9', margin: 0, maxWidth: '560px' }}>
                Dois modelos teóricos.<br />Uma taxonomia completa.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {/* Card IP */}
              <div style={{ backgroundColor: '#0D1A2D', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '14px', padding: '32px 28px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F1F5F9', marginBottom: '14px', fontWeight: 400 }}>
                  Processamento da Informação
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '20px' }}>
                  Todo erro humano pode ser explicado por dois fatores: quantidade de informação a processar e tempo disponível.
                  Esta fórmula simples fundamenta toda a lógica do SERA.
                </p>
                <div style={{ backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', padding: '14px 16px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#93C5FD', textAlign: 'center' }}>
                    Pressão de Tempo = Informação / Tempo
                  </div>
                </div>
              </div>

              {/* Card PCT */}
              <div style={{ backgroundColor: '#0D1A2D', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '14px', padding: '32px 28px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    <polyline points="21 3 21 9 15 9"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F1F5F9', marginBottom: '14px', fontWeight: 400 }}>
                  Controle Perceptual
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '20px' }}>
                  Operadores agem sobre suas percepções do mundo, não sobre o mundo real. Uma ação &ldquo;irracional&rdquo; pode ser
                  perfeitamente lógica dado o que o operador acreditava ser verdade.
                </p>
                <div style={{ backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', padding: '14px 16px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#93C5FD', textAlign: 'center' }}>
                    Objetivo → Percepção → Comparação → Ação
                  </div>
                </div>
              </div>

              {/* Card SERA vs HFACS */}
              <div style={{ backgroundColor: '#0D1A2D', border: '1px solid rgba(148,163,184,0.1)', borderRadius: '14px', padding: '32px 28px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F1F5F9', marginBottom: '14px', fontWeight: 400 }}>
                  SERA vs. HFACS
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '20px' }}>
                  O HFACS descreve <em>onde</em> na organização ocorreu a falha. O SERA explica <em>por que</em> o comportamento
                  surgiu — usando fluxos de decisão lógicos que produzem resultados determinísticos e automatizáveis.
                </p>
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', color: '#93C5FD', fontWeight: 500 }}>
                  Único framework compatível com IA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6 — FUNCIONALIDADES */}
        <section style={{ backgroundColor: '#060B14', padding: '96px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', fontWeight: 400, color: '#F1F5F9', textAlign: 'center', margin: '0 0 56px' }}>
              Tudo que um investigador precisa
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                {
                  title: 'Pipeline SERA automatizado',
                  desc: 'Upload de PDF/DOCX ou texto. Análise completa em 90 segundos com todas as 7 etapas documentadas.',
                  icon: '⚙️',
                },
                {
                  title: 'Classificação P · O · A',
                  desc: 'Percepção, Objetivo e Ação classificados com justificativa — falhas descartadas também documentadas.',
                  icon: '🔬',
                },
                {
                  title: 'Perfil de Risco Organizacional',
                  desc: 'Dashboard diagnóstico com score de risco, padrões de falha e pré-condições mais frequentes da sua operação.',
                  icon: '📊',
                },
                {
                  title: 'Matriz ISO + ARMS-ERC',
                  desc: 'Visualização dos eventos nas matrizes tradicionais e conforme regulação europeia EU 376/2014.',
                  icon: '🗂️',
                },
                {
                  title: 'Classificação HFACS automática',
                  desc: 'Correspondência automática com o HFACS para organizações que usam as duas metodologias em paralelo.',
                  icon: '🔗',
                },
                {
                  title: 'Relatórios em PDF',
                  desc: 'Export completo da análise com todas as etapas, justificativas e recomendações de prevenção.',
                  icon: '📄',
                },
              ].map((f) => (
                <div key={f.title} className="feature-card" style={{
                  backgroundColor: '#0A1628',
                  border: '1px solid rgba(148,163,184,0.1)',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '14px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '16px', color: '#F1F5F9', fontWeight: 500, marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 7 — PARA QUEM É */}
        <section style={{ backgroundColor: '#0A1628', padding: '96px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', fontWeight: 400, color: '#F1F5F9', textAlign: 'center', margin: '0 0 56px' }}>
              Para quem investiga o que realmente importa
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                {
                  emoji: '✈️',
                  sector: 'Aviação',
                  roles: 'Investigadores de ocorrências, pilotos instrutores, responsáveis de segurança de voo.',
                  detail: 'Aviação civil, militar e offshore.',
                },
                {
                  emoji: '🛢️',
                  sector: 'Óleo & Gás',
                  roles: 'Analistas de HSE, investigadores de incidentes offshore, gestores de segurança operacional.',
                  detail: 'Plataformas e bases de apoio.',
                },
                {
                  emoji: '🏭',
                  sector: 'Indústria',
                  roles: 'Engenheiros de segurança, responsáveis por SSMA, investigadores de acidentes industriais.',
                  detail: 'Qualquer setor de alto risco.',
                },
              ].map((p) => (
                <div key={p.sector} style={{
                  backgroundColor: '#0D1A2D',
                  border: '1px solid rgba(148,163,184,0.1)',
                  borderRadius: '14px',
                  padding: '36px 28px',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '18px' }}>{p.emoji}</div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', fontWeight: 400, color: '#F1F5F9', marginBottom: '12px' }}>{p.sector}</h3>
                  <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '10px' }}>{p.roles}</p>
                  <p style={{ fontSize: '13px', color: '#475569' }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 8 — CTA */}
        <section style={{
          background: 'linear-gradient(160deg, #0A1628 0%, #0F2040 100%)',
          padding: '96px 32px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', fontWeight: 400, color: '#F1F5F9', margin: '0 0 20px', lineHeight: 1.15 }}>
              Comece a entender seus eventos.
            </h2>
            <p style={{ fontSize: '17px', color: '#94A3B8', marginBottom: '40px', lineHeight: 1.7 }}>
              Análise gratuita. Sem cartão de crédito.<br />
              Resultado em menos de 2 minutos.
            </p>
            <Link href="/register" style={{
              display: 'inline-block',
              backgroundColor: '#2563EB',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '10px',
              fontSize: '17px',
              fontWeight: 500,
              textDecoration: 'none',
              marginBottom: '20px',
            }}>
              Criar conta gratuita →
            </Link>
            <div style={{ marginBottom: '48px' }}>
              <Link href="/login" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>
                Já tem conta? Entrar →
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
              {['🔒 Dados seguros', '📋 Metodologia validada', '🚀 Resultado em 90s'].map((t) => (
                <span key={t} style={{ fontSize: '13px', color: '#475569' }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ backgroundColor: '#060B14', borderTop: '1px solid rgba(148,163,184,0.1)', padding: '32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#60A5FA', marginBottom: '8px' }}>HFA Platform</div>
              <p style={{ fontSize: '13px', color: '#475569', maxWidth: '320px', lineHeight: 1.6, margin: 0 }}>
                Baseado na metodologia SERA de K.C. Hendy<br />(Defence R&amp;D Canada, 2003)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              <Link href="/login" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}>Entrar</Link>
              <Link href="/register" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}>Criar conta</Link>
              <a
                href="#sobre-sera"
                onClick={e => { e.preventDefault(); document.getElementById('sobre-sera')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}
              >
                Metodologia SERA
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
