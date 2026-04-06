"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";

// ─── Country list ────────────────────────────────────────────────────────────

interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const PRIORITY = ["BR", "US", "PT", "AR", "MX", "CO", "CL", "ES"];

const COUNTRIES: Country[] = [
  { code: "ZA", name: "África do Sul",     dial: "+27",  flag: "🇿🇦" },
  { code: "DE", name: "Alemanha",           dial: "+49",  flag: "🇩🇪" },
  { code: "AO", name: "Angola",             dial: "+244", flag: "🇦🇴" },
  { code: "SA", name: "Arábia Saudita",     dial: "+966", flag: "🇸🇦" },
  { code: "AR", name: "Argentina",          dial: "+54",  flag: "🇦🇷" },
  { code: "AU", name: "Austrália",          dial: "+61",  flag: "🇦🇺" },
  { code: "AT", name: "Áustria",            dial: "+43",  flag: "🇦🇹" },
  { code: "BE", name: "Bélgica",            dial: "+32",  flag: "🇧🇪" },
  { code: "BO", name: "Bolívia",            dial: "+591", flag: "🇧🇴" },
  { code: "BR", name: "Brasil",             dial: "+55",  flag: "🇧🇷" },
  { code: "CA", name: "Canadá",             dial: "+1",   flag: "🇨🇦" },
  { code: "CL", name: "Chile",              dial: "+56",  flag: "🇨🇱" },
  { code: "CN", name: "China",              dial: "+86",  flag: "🇨🇳" },
  { code: "CO", name: "Colômbia",           dial: "+57",  flag: "🇨🇴" },
  { code: "KR", name: "Coreia do Sul",      dial: "+82",  flag: "🇰🇷" },
  { code: "CR", name: "Costa Rica",         dial: "+506", flag: "🇨🇷" },
  { code: "DK", name: "Dinamarca",          dial: "+45",  flag: "🇩🇰" },
  { code: "AE", name: "Emirados Árabes",    dial: "+971", flag: "🇦🇪" },
  { code: "EC", name: "Equador",            dial: "+593", flag: "🇪🇨" },
  { code: "SK", name: "Eslováquia",         dial: "+421", flag: "🇸🇰" },
  { code: "ES", name: "Espanha",            dial: "+34",  flag: "🇪🇸" },
  { code: "US", name: "Estados Unidos",     dial: "+1",   flag: "🇺🇸" },
  { code: "EE", name: "Estônia",            dial: "+372", flag: "🇪🇪" },
  { code: "ET", name: "Etiópia",            dial: "+251", flag: "🇪🇹" },
  { code: "PH", name: "Filipinas",          dial: "+63",  flag: "🇵🇭" },
  { code: "FI", name: "Finlândia",          dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "França",             dial: "+33",  flag: "🇫🇷" },
  { code: "GH", name: "Gana",               dial: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Grécia",             dial: "+30",  flag: "🇬🇷" },
  { code: "GT", name: "Guatemala",          dial: "+502", flag: "🇬🇹" },
  { code: "HN", name: "Honduras",           dial: "+504", flag: "🇭🇳" },
  { code: "HK", name: "Hong Kong",          dial: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungria",            dial: "+36",  flag: "🇭🇺" },
  { code: "IN", name: "Índia",              dial: "+91",  flag: "🇮🇳" },
  { code: "ID", name: "Indonésia",          dial: "+62",  flag: "🇮🇩" },
  { code: "IE", name: "Irlanda",            dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel",             dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Itália",             dial: "+39",  flag: "🇮🇹" },
  { code: "JP", name: "Japão",              dial: "+81",  flag: "🇯🇵" },
  { code: "KE", name: "Quênia",             dial: "+254", flag: "🇰🇪" },
  { code: "LV", name: "Letônia",            dial: "+371", flag: "🇱🇻" },
  { code: "LT", name: "Lituânia",           dial: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxemburgo",         dial: "+352", flag: "🇱🇺" },
  { code: "MY", name: "Malásia",            dial: "+60",  flag: "🇲🇾" },
  { code: "MA", name: "Marrocos",           dial: "+212", flag: "🇲🇦" },
  { code: "MX", name: "México",             dial: "+52",  flag: "🇲🇽" },
  { code: "MZ", name: "Moçambique",         dial: "+258", flag: "🇲🇿" },
  { code: "NO", name: "Noruega",            dial: "+47",  flag: "🇳🇴" },
  { code: "NZ", name: "Nova Zelândia",      dial: "+64",  flag: "🇳🇿" },
  { code: "NL", name: "Países Baixos",      dial: "+31",  flag: "🇳🇱" },
  { code: "PK", name: "Paquistão",          dial: "+92",  flag: "🇵🇰" },
  { code: "PY", name: "Paraguai",           dial: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru",               dial: "+51",  flag: "🇵🇪" },
  { code: "PL", name: "Polônia",            dial: "+48",  flag: "🇵🇱" },
  { code: "PT", name: "Portugal",           dial: "+351", flag: "🇵🇹" },
  { code: "GB", name: "Reino Unido",        dial: "+44",  flag: "🇬🇧" },
  { code: "CZ", name: "Rep. Tcheca",        dial: "+420", flag: "🇨🇿" },
  { code: "RO", name: "Romênia",            dial: "+40",  flag: "🇷🇴" },
  { code: "RU", name: "Rússia",             dial: "+7",   flag: "🇷🇺" },
  { code: "SG", name: "Singapura",          dial: "+65",  flag: "🇸🇬" },
  { code: "SE", name: "Suécia",             dial: "+46",  flag: "🇸🇪" },
  { code: "CH", name: "Suíça",              dial: "+41",  flag: "🇨🇭" },
  { code: "TH", name: "Tailândia",          dial: "+66",  flag: "🇹🇭" },
  { code: "TW", name: "Taiwan",             dial: "+886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzânia",           dial: "+255", flag: "🇹🇿" },
  { code: "TR", name: "Turquia",            dial: "+90",  flag: "🇹🇷" },
  { code: "UA", name: "Ucrânia",            dial: "+380", flag: "🇺🇦" },
  { code: "UY", name: "Uruguai",            dial: "+598", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela",          dial: "+58",  flag: "🇻🇪" },
  { code: "VN", name: "Vietnã",             dial: "+84",  flag: "🇻🇳" },
].sort((a, b) => a.name.localeCompare(b.name, "pt"));

const DEFAULT = COUNTRIES.find((c) => c.code === "BR")!;

// ─── Phone mask ──────────────────────────────────────────────────────────────

function maskPhone(raw: string, countryCode: string): string {
  const digits = raw.replace(/\D/g, "");

  if (countryCode === "BR") {
    const d = digits.slice(0, 11);
    if (d.length === 0) return "";
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10)
      return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  // Generic: groups of 3 digits separated by spaces
  const d = digits.slice(0, 15);
  return d.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

// ─── Component ───────────────────────────────────────────────────────────────

interface PhoneInputProps {
  onChange: (full: string) => void;
  error?: string;
  onBlur?: () => void;
}

export default function PhoneInput({
  onChange,
  error,
  onBlur,
}: PhoneInputProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;

  const [country, setCountry] = useState<Country>(DEFAULT);
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Build filtered list: priority group on top, then rest alphabetically
  const filtered = (() => {
    const q = search.toLowerCase();
    const all = COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q)
    );
    if (!q) {
      const priority = PRIORITY.map((code) =>
        all.find((c) => c.code === code)
      ).filter(Boolean) as Country[];
      const rest = all.filter((c) => !PRIORITY.includes(c.code));
      return { priority, rest };
    }
    return { priority: [] as Country[], rest: all };
  })();

  const flatList = [...filtered.priority, ...filtered.rest];

  // Notify parent whenever country or phone changes
  useEffect(() => {
    onChange(phone ? `${country.dial} ${phone}` : "");
  }, [country, phone]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) {
      setActiveIndex(flatList.findIndex((c) => c.code === country.code));
      setTimeout(() => searchRef.current?.focus(), 30);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll active item into view
  useEffect(() => {
    const item = listRef.current?.querySelector(
      `[id="${uid}-opt-${activeIndex}"]`
    ) as HTMLElement | null;
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, uid]);

  const select = useCallback(
    (c: Country) => {
      setCountry(c);
      setOpen(false);
      setSearch("");
      setPhone("");
      onChange("");
      setTimeout(() => triggerRef.current?.focus(), 30);
    },
    [onChange]
  );

  function handleSearchKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatList[activeIndex]) select(flatList[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
      triggerRef.current?.focus();
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = maskPhone(e.target.value, country.code);
    setPhone(masked);
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger + phone input row */}
      <div
        className={`flex items-stretch gap-0 border rounded-xl overflow-hidden transition ${
          error ? "border-red-400/70" : "border-white/15"
        } focus-within:border-brand-blue/50 focus-within:bg-brand-blue/[0.03]`}
      >
        {/* DDI trigger */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={`País selecionado: ${country.name} ${country.dial}. Clique para alterar`}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-3.5 bg-white/[0.04] border-r border-white/10 text-white text-sm font-medium whitespace-nowrap hover:bg-white/[0.08] transition shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-inset"
        >
          <span aria-hidden="true" className="text-base leading-none">
            {country.flag}
          </span>
          <span className="text-white/70 text-xs tabular-nums">
            {country.dial}
          </span>
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-white/40 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Phone input */}
        <input
          id="telefone"
          type="tel"
          name="telefone"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          placeholder={country.code === "BR" ? "(11) 99999-9999" : "Número"}
          required
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? `${uid}-err` : undefined}
          className="flex-1 min-w-0 bg-transparent px-3 py-3.5 text-[15px] font-light text-white placeholder-white/40 outline-none"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 w-full bg-[#111b40] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-white/[0.08]">
            <input
              ref={searchRef}
              type="text"
              role="searchbox"
              aria-label="Buscar país"
              aria-controls={listboxId}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleSearchKey}
              placeholder="Buscar país ou código..."
              className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-brand-blue/50"
            />
          </div>

          {/* List */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Países"
            aria-activedescendant={
              flatList[activeIndex]
                ? `${uid}-opt-${activeIndex}`
                : undefined
            }
            className="max-h-52 overflow-y-auto py-1"
          >
            {flatList.length === 0 && (
              <li className="px-4 py-3 text-sm text-white/40 text-center">
                Nenhum país encontrado
              </li>
            )}

            {/* Separator after priority group */}
            {filtered.priority.map((c, i) => (
              <li
                key={c.code}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={c.code === country.code}
                onMouseDown={() => select(c)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  i === activeIndex
                    ? "bg-brand-blue/20 text-white"
                    : "text-white/80 hover:bg-white/[0.06]"
                } ${c.code === country.code ? "font-medium" : ""}`}
              >
                <span aria-hidden="true" className="text-base w-6 text-center">
                  {c.flag}
                </span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-white/40 tabular-nums text-xs">
                  {c.dial}
                </span>
              </li>
            ))}

            {filtered.priority.length > 0 && filtered.rest.length > 0 && (
              <li role="separator" className="mx-3 my-1 border-t border-white/[0.08]" />
            )}

            {filtered.rest.map((c, i) => {
              const idx = filtered.priority.length + i;
              return (
                <li
                  key={c.code}
                  id={`${uid}-opt-${idx}`}
                  role="option"
                  aria-selected={c.code === country.code}
                  onMouseDown={() => select(c)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    idx === activeIndex
                      ? "bg-brand-blue/20 text-white"
                      : "text-white/80 hover:bg-white/[0.06]"
                  } ${c.code === country.code ? "font-medium" : ""}`}
                >
                  <span aria-hidden="true" className="text-base w-6 text-center">
                    {c.flag}
                  </span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-white/40 tabular-nums text-xs">
                    {c.dial}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Inline error */}
      {error && (
        <p id={`${uid}-err`} role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
