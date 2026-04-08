"use client";

import { useState } from "react";
import JsonLd from "./JsonLd";

const faqs = [
  {
    question: "O que é automação de processos empresariais?",
    answer:
      "É basicamente fazer a tecnologia trabalhar no lugar das pessoas em tarefas repetitivas. Sabe aquele processo de receber um lead, jogar no CRM, mandar um email de boas-vindas e avisar o time no WhatsApp? Tudo isso pode acontecer sozinho, em segundos, sem ninguém tocar. Usamos ferramentas como n8n para conectar os sistemas que sua agência já usa e criar esses fluxos automáticos.",
  },
  {
    question: "Quanto tempo leva para implementar automação na minha empresa?",
    answer:
      "A primeira automação funcionando em produção costuma levar entre 3 e 6 semanas. A gente começa com 1 semana de diagnóstico para entender seus processos, e daí trabalha em sprints curtos de 2 a 4 semanas. Ou seja: em menos de um mês você já vê resultado real, não só promessa.",
  },
  {
    question: "Minha empresa precisa de um time técnico para manter as automações?",
    answer:
      "Não. Qualquer pessoa do seu time consegue operar o que a gente entrega — sem precisar saber programar. Toda implementação inclui treinamento e documentação para que sua equipe entenda o que está rodando, consiga monitorar e fazer ajustes simples sem depender da gente no dia a dia.",
  },
  {
    question: "Quais sistemas a Innove consegue integrar?",
    answer:
      "Praticamente qualquer ferramenta que sua agência já usa: HubSpot, Pipedrive, RD Station, Google Sheets, WhatsApp Business, email, plataformas de e-commerce, ERPs e qualquer sistema que tenha API — que hoje é a grande maioria. Se a ferramenta se fala com outras, a gente integra.",
  },
  {
    question: "Como funciona o diagnóstico gratuito da Innove?",
    answer:
      "É uma reunião com um especialista onde a gente mergulha nos seus processos atuais, identifica onde você está perdendo mais tempo e dinheiro, e entrega um mapa de oportunidades de automação com estimativa de impacto real para o seu negócio. Sem enrolação e sem compromisso de contratar depois.",
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
