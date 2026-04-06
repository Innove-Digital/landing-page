"use client";

import { useState } from "react";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full font-sans transition-all duration-300",
        open
          ? "bg-brand-surface border border-white/[0.10] rounded-b-2xl md:bg-brand-bg/90 md:backdrop-blur-md md:border-0 md:border-b md:border-white/[0.06] md:rounded-none"
          : "bg-brand-bg/90 backdrop-blur-md border-b border-white/[0.06]",
      ].join(" ")}
    >
      {/* Top bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <nav
          className="flex items-center justify-between w-full"
          aria-label="Navegação principal"
        >
          <a
            href="#"
            className="block leading-none text-white font-bold text-2xl tracking-tight"
            aria-label="Innove — Automação e Tecnologia Empresarial"
          >
            Innove<span className="text-brand-blue">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/80 text-sm font-medium tracking-wide hover:text-brand-blue transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#formulario"
            className="hidden md:inline-block bg-brand-cta text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-blue-500 transition-colors whitespace-nowrap"
          >
            Falar com Especialista
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border border-white/15 rounded-xl cursor-pointer p-2 transition-colors hover:border-white/30"
          >
            <span
              className={`block w-full h-0.5 bg-white/80 rounded transition-transform duration-300 origin-center ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white/80 rounded transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white/80 rounded transition-transform duration-300 origin-center ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile drawer — dentro do header, sem borda própria */}
      <div
        id="mobile-drawer"
        aria-hidden={!open}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 sm:px-8 pb-4 pt-1 border-t border-white/[0.08]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="text-white/80 text-base font-medium px-2 py-3.5 border-b border-white/[0.06] last:border-b-0 hover:text-brand-blue transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#formulario"
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="mt-3 text-center bg-brand-cta text-white font-bold py-3.5 text-[15px] rounded-full hover:bg-blue-500 transition-colors whitespace-nowrap"
          >
            Falar com Especialista
          </a>
        </div>
      </div>
    </header>
  );
}
