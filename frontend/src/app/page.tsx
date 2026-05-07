import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-8 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-400">HFA Platform</span>
        <div className="flex gap-4">
          <Link href="/login" className="text-slate-300 hover:text-white transition">
            Entrar
          </Link>
          <Link href="/register"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition">
            Começar grátis
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-8 py-32 text-center">
        <div className="inline-block bg-blue-600/20 text-blue-400 text-sm px-4 py-1 rounded-full mb-6 border border-blue-600/30">
          Metodologia SERA • Base Científica Validada
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Análise de Fatores Humanos<br />
          <span className="text-blue-400">com rigor científico</span>
        </h1>
        <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
          Plataforma SaaS para investigação de eventos operacionais utilizando
          a metodologia SERA — Systematic Error and Risk Analysis.
        </p>
        <Link href="/register"
          className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold transition inline-block">
          Iniciar análise gratuita →
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-32 grid grid-cols-3 gap-8">
        {[
          { title: 'Metodologia SERA', desc: 'Análise estruturada seguindo rigorosamente os fluxos de percepção, objetivo e ação.' },
          { title: 'Perfil de Risco', desc: 'Dashboard com as falhas humanas mais recorrentes da sua operação ao longo do tempo.' },
          { title: 'Ações Corretivas', desc: 'Gestão integrada das recomendações geradas em cada análise.' },
        ].map((item) => (
          <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
