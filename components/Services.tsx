import JsonLd from "./JsonLd";
import {
  IconClipboard,
  IconGears,
  IconLink,
  IconCpu,
  IconBarChart,
  IconUsers,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const services: { Icon: IconComponent; name: string; description: string }[] = [
  {
    Icon: IconClipboard,
    name: "Mapeamento de Processos",
    description:
      "Identificamos gargalos e ineficiências nos fluxos do seu negócio com diagnóstico detalhado e priorização estratégica — entregando um mapa de oportunidades de automação com ROI estimado.",
  },
  {
    Icon: IconGears,
    name: "Automação de Fluxos",
    description:
      "Implementamos automações com n8n, Make e Zapier que eliminam tarefas repetitivas e integram sistemas — sem necessidade de código pelo seu time.",
  },
  {
    Icon: IconLink,
    name: "Integração de Sistemas",
    description:
      "Conectamos CRMs, ERPs, planilhas do Google e Excel, WhatsApp Business e qualquer ferramenta com API para criar um ecossistema digital unificado.",
  },
  {
    Icon: IconCpu,
    name: "Estruturação com IA",
    description:
      "Aplicamos modelos de linguagem (LLMs) e análise preditiva para classificação, triagem e tomada de decisão automatizada — tornando os processos mais inteligentes.",
  },
  {
    Icon: IconBarChart,
    name: "Monitoramento e KPIs",
    description:
      "Dashboards em tempo real para acompanhar a performance dos processos e tomar decisões baseadas em dados mensuráveis.",
  },
  {
    Icon: IconUsers,
    name: "Treinamento de Equipes",
    description:
      "Capacitamos o seu time para operar, manter e evoluir as automações com autonomia e confiança — sem dependência de programadores.",
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Serviços de Automação — Innove",
  itemListElement: services.map(({ name, description }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name,
      description,
      provider: {
        "@type": "Organization",
        name: "Innove",
        url: "https://innovedigital.pro",
      },
    },
  })),
};

export default function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24">
      <JsonLd data={servicesSchema} />

      <div className="flex flex-col gap-4 mb-12">
        <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
          — O que fazemos
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Soluções para cada etapa{" "}
          <span className="text-brand-blue">do seu negócio</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl">
          Do mapeamento ao deploy, cobrimos todo o ciclo de automação com
          tecnologia e metodologia comprovada.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ Icon, name, description }) => (
          <article
            key={name}
            className="flex flex-col gap-3 bg-brand-surface border border-white/[0.08] rounded-2xl p-6 hover:border-brand-blue/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Icon size={20} />
            </div>
            <h3 className="text-white font-semibold text-lg">{name}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
