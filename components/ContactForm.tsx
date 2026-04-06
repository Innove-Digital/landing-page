"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IconLock } from "./icons";
import PhoneInput from "./PhoneInput";

// ─── Validation ──────────────────────────────────────────────────────────────

type Fields = "nome" | "empresa" | "telefone" | "email" | "gargalo";

function validate(field: Fields, value: string): string {
  const v = value.trim();
  if (!v) return "Campo obrigatório";
  switch (field) {
    case "nome":
      return v.length < 3 ? "Informe o nome completo" : "";
    case "empresa":
      return v.length < 2 ? "Informe o nome da empresa" : "";
    case "telefone":
      return v.replace(/\D/g, "").length < 8 ? "Número de telefone inválido" : "";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "E-mail inválido";
    case "gargalo":
      return v.length < 5 ? "Descreva com um pouco mais de detalhes" : "";
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Fields, boolean>>>({});

  // Mark field touched and validate on blur
  const handleBlur = useCallback(
    (field: Fields, value: string) => {
      setTouched((t) => ({ ...t, [field]: true }));
      setErrors((e) => ({ ...e, [field]: validate(field, value) }));
    },
    []
  );

  // Validate all fields, mark all touched, return whether form is valid
  function validateAll(form: HTMLFormElement): boolean {
    const fields: Fields[] = ["nome", "empresa", "telefone", "email", "gargalo"];
    const newErrors: Partial<Record<Fields, string>> = {};
    const allTouched: Partial<Record<Fields, boolean>> = {};

    for (const f of fields) {
      allTouched[f] = true;
      const el =
        f === "telefone"
          ? { value: phone }
          : f === "gargalo"
          ? form.elements.namedItem(f) as HTMLTextAreaElement
          : form.elements.namedItem(f) as HTMLInputElement;
      newErrors[f] = validate(f, el?.value ?? "");
    }

    setTouched(allTouched);
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateAll(form)) return;

    setLoading(true);
    setSubmitError(false);

    const data = {
      nome:     (form.elements.namedItem("nome")    as HTMLInputElement).value.trim(),
      empresa:  (form.elements.namedItem("empresa") as HTMLInputElement).value.trim(),
      telefone: phone,
      email:    (form.elements.namedItem("email")   as HTMLInputElement).value.trim(),
      gargalo:  (form.elements.namedItem("gargalo") as HTMLTextAreaElement).value.trim(),
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // non-blocking
    }

    const params = new URLSearchParams({
      name:      data.nome,
      Whatsapp:  data.telefone,
      email:     data.email,
      notes:     data.gargalo,
    });

    router.push(
      `https://agenda.innovedigital.pro/gabriel-amaro/avaliacao-inicial-innove?${params.toString()}`
    );
  }

  // Shared input classes
  function inputClass(field: Fields) {
    const hasError = touched[field] && errors[field];
    return [
      "w-full bg-white/[0.06] border rounded-xl px-4 py-3.5",
      "font-sans text-[15px] font-light text-white placeholder-white/40",
      "outline-none transition",
      hasError
        ? "border-red-400/70 focus:border-red-400"
        : "border-white/15 focus:border-brand-blue/50 focus:bg-brand-blue/[0.06]",
    ].join(" ");
  }

  function FieldError({ field }: { field: Fields }) {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {errors[field]}
      </p>
    );
  }

  return (
    <section id="formulario" className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left col */}
        <div className="flex flex-col gap-4">
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
            — Fale com a Innove
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para{" "}
            <span className="text-brand-blue">automatizar</span> sua empresa?
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Preencha o formulário e nossa equipe entrará em contato para
            entender o seu negócio e propor o melhor caminho de automação.
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {[
              "Diagnóstico gratuito e sem compromisso",
              "Resposta em até 1 dia útil",
              "Especialista dedicado ao seu caso",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="w-5 h-5 rounded-full bg-brand-blue/15 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#00c2ff" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="bg-brand-surface border border-white/[0.08] rounded-2xl p-6 md:p-8">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulário de contato"
          >
            {/* Nome + Empresa */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-xs font-medium text-white/80 mb-1.5">
                  Nome completo <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="João Silva"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!(touched.nome && errors.nome)}
                  onBlur={(e) => handleBlur("nome", e.target.value)}
                  className={inputClass("nome")}
                />
                <FieldError field="nome" />
              </div>
              <div>
                <label htmlFor="empresa" className="block text-xs font-medium text-white/80 mb-1.5">
                  Empresa <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  placeholder="Empresa XYZ Ltda"
                  autoComplete="organization"
                  required
                  aria-required="true"
                  aria-invalid={!!(touched.empresa && errors.empresa)}
                  onBlur={(e) => handleBlur("empresa", e.target.value)}
                  className={inputClass("empresa")}
                />
                <FieldError field="empresa" />
              </div>
            </div>

            {/* WhatsApp — full width para o seletor DDI ter espaço */}
            <div>
              <label htmlFor="telefone" className="block text-xs font-medium text-white/80 mb-1.5">
                WhatsApp <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <PhoneInput
                onChange={setPhone}
                error={touched.telefone ? errors.telefone : undefined}
                onBlur={() => handleBlur("telefone", phone)}
              />
            </div>

            {/* Email — full width */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/80 mb-1.5">
                E-mail <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="voce@empresa.com"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={!!(touched.email && errors.email)}
                onBlur={(e) => handleBlur("email", e.target.value)}
                className={inputClass("email")}
              />
              <FieldError field="email" />
            </div>

            {/* Gargalo */}
            <div>
              <label htmlFor="gargalo" className="block text-xs font-medium text-white/80 mb-1.5">
                Qual é o maior gargalo da sua operação hoje?{" "}
                <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <textarea
                id="gargalo"
                name="gargalo"
                placeholder="Descreva o principal problema ou ineficiência que mais impacta o seu negócio..."
                required
                rows={4}
                aria-required="true"
                aria-invalid={!!(touched.gargalo && errors.gargalo)}
                onBlur={(e) => handleBlur("gargalo", e.target.value)}
                className={`${inputClass("gargalo")} resize-y min-h-[110px] leading-relaxed`}
              />
              <FieldError field="gargalo" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 bg-brand-cta text-white font-bold text-base rounded-full hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(31,79,232,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Agendar meu diagnóstico gratuito →"
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-white/60 mt-1">
              <IconLock size={12} className="shrink-0" />
              Seus dados estão seguros. Não fazemos spam.
            </p>

            {submitError && (
              <p role="alert" className="text-center text-sm text-red-400">
                Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
