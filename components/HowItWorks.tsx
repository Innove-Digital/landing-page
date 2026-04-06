"use client";

import dynamic from "next/dynamic";

const OrbitWidget = dynamic(() => import("./OrbitWidget"), { ssr: false });

const steps = [
  {
    number: "01",
    title: "Diagnóstico profundo",
    description:
      "Mergulhamos nos seus processos para mapear onde estão os maiores gargalos e oportunidades de ganho.",
  },
  {
    number: "02",
    title: "Arquitetura da solução",
    description:
      "Desenhamos um plano de automação personalizado, com ferramentas e integrações escolhidas para o seu contexto.",
  },
  {
    number: "03",
    title: "Implementação ágil",
    description:
      "Entregamos em sprints curtos de 2 a 4 semanas, com resultados visíveis nas primeiras semanas de projeto.",
  },
  {
    number: "04",
    title: "Evolução contínua",
    description:
      "Monitoramos, ajustamos e expandimos as automações conforme o seu negócio cresce.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
              — Metodologia
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Como a Innove{" "}
              <span className="text-brand-blue">transforma</span> sua operação
            </h2>
          </div>

          <ol className="flex flex-col gap-6" aria-label="Etapas da metodologia Innove">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-5">
                <span
                  className="text-brand-blue font-bold text-2xl tabular-nums w-10 shrink-0 pt-0.5"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-semibold text-lg">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="hidden md:block">
          <OrbitWidget />
        </div>
      </div>
    </section>
  );
}
