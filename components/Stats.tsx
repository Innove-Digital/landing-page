const stats = [
  { value: "3x", label: "Mais produtividade" },
  { value: "70%", label: "Redução de retrabalho" },
  { value: "100+", label: "Processos automatizados" },
];

export default function Stats() {
  return (
    <section aria-label="Resultados em números" className="py-10">
      <dl className="grid grid-cols-3 gap-4 md:gap-8">
        {stats.map((s) => (
          <div
            key={s.value}
            className="flex flex-col items-center md:items-start gap-1 text-center md:text-left"
          >
            <dt className="text-3xl md:text-4xl font-bold text-brand-blue">
              {s.value}
            </dt>
            <dd className="text-white/60 text-sm md:text-base">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
