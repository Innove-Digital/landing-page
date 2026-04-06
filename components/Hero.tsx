import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center py-10 md:py-24">
      {/* Imagem — topo no mobile, direita no desktop */}
      <div className="flex justify-center md:order-2 md:justify-end">
        <Image
          src="/images/Curva.png"
          alt="Ilustração de automação de processos empresariais — Innove"
          width={665}
          height={1024}
          priority
          sizes="(max-width: 768px) 180px, 400px"
          className="w-full max-w-[180px] md:max-w-md"
        />
      </div>

      {/* Texto — abaixo no mobile, esquerda no desktop */}
      <div className="flex flex-col gap-5 md:order-1 md:gap-6">
        <p className="text-brand-blue text-sm font-medium tracking-widest uppercase">
          ● Automação &amp; Tecnologia Empresarial
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Transforme sua operação com{" "}
          <span className="text-brand-blue">automação inteligente</span>
        </h1>

        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          A Innove mapeia, desenha e automatiza os processos da sua empresa —
          eliminando gargalos, retrabalho e desperdício com automações
          personalizadas usando n8n, Make, Zapier e desenvolvimento custom.
        </p>

        <div>
          <a
            href="#formulario"
            className="inline-block bg-brand-cta text-white font-bold text-base px-8 py-4 rounded-full hover:bg-blue-500 transition-colors whitespace-nowrap"
          >
            Quero automatizar meu negócio →
          </a>
        </div>
      </div>
    </section>
  );
}
