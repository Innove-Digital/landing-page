"use client";

import { useState } from "react";
import JsonLd from "./JsonLd";

const faqs = [
  {
    question: "O que é automação de processos empresariais?",
    answer:
      "Automação de processos empresariais (BPA — Business Process Automation) é o uso de tecnologia para executar tarefas recorrentes onde o esforço manual pode ser substituído. Isso inclui integração de sistemas via API, robôs de software (RPA), fluxos de trabalho condicionais com ferramentas como n8n e Make, e processos orientados por inteligência artificial.",
  },
  {
    question: "Quanto tempo leva para implementar automação na minha empresa?",
    answer:
      "A Innove entrega os primeiros resultados em sprints curtos de 2 a 4 semanas. O diagnóstico inicial dura 1 semana, e a primeira automação em produção costuma estar disponível entre 3 e 6 semanas após o início do projeto, dependendo da complexidade dos processos.",
  },
  {
    question: "Minha empresa precisa de um time técnico para manter as automações?",
    answer:
      "Não. A Innove inclui treinamento da equipe em todas as implementações. O objetivo é que o time do cliente possa operar, monitorar e evoluir as automações com autonomia total, sem dependência de programadores ou da própria Innove para operação rotineira.",
  },
  {
    question: "Quais sistemas a Innove consegue integrar?",
    answer:
      "A Innove integra CRMs (HubSpot, Pipedrive, Salesforce), ERPs, planilhas do Google e Excel, ferramentas de comunicação como WhatsApp Business e e-mail, plataformas de e-commerce, sistemas de gestão e qualquer serviço com API REST disponível.",
  },
  {
    question: "Como funciona o diagnóstico gratuito da Innove?",
    answer:
      "O diagnóstico gratuito é uma reunião de avaliação inicial com um especialista da Innove. Nessa sessão, analisamos os processos da empresa, identificamos os principais gargalos e apresentamos um mapa de oportunidades de automação com estimativa de impacto — sem compromisso de contratação.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 md:py-24">
      <JsonLd data={faqSchema} />

      <div className="flex flex-col gap-4 mb-12">
        <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
          — Perguntas Frequentes
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Dúvidas sobre{" "}
          <span className="text-brand-blue">automação empresarial</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3 max-w-3xl">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-brand-surface border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left font-semibold text-white hover:text-brand-blue transition-colors"
            >
              <span>{faq.question}</span>
              <span
                className={`text-brand-blue text-xl shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
