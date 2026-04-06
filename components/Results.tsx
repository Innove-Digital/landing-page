const metrics = [
  {
    value: "3x",
    label: "Mais velocidade nos processos operacionais",
  },
  {
    value: "70%",
    label: "Redução de erros e retrabalho manual",
  },
  {
    value: "40%",
    label: "Redução de custos operacionais",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="py-16 md:py-24">
      <div className="flex flex-col gap-4 mb-12">
        <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
          — Resultados
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Impacto <span className="text-brand-blue">real</span> na sua operação
        </h2>
        <p className="text-white/60 text-lg max-w-2xl">
          Nossos clientes experimentam transformações mensuráveis nas primeiras
          semanas de implementação.
        </p>
      </div>

      <dl className="grid sm:grid-cols-3 gap-6">
        {metrics.map((m) => (
          <div
            key={m.value}
            className="bg-brand-surface border border-white/[0.08] rounded-2xl p-8 flex flex-col gap-3"
          >
            <dt className="text-5xl font-bold text-brand-blue">{m.value}</dt>
            <dd className="text-white/70 text-base">{m.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
