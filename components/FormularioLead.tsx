"use client";

import { useState } from "react";

type FormState = {
  // obrigatórios
  name: string;
  phone: string;
  destino: string;
  // opcionais
  age: string;
  primeiraVez: string;
  dataEstimada: string;
  observacoes: string;
  instagram: string;
  email: string;
};

const FORM_VAZIO: FormState = {
  name: "",
  phone: "",
  destino: "",
  age: "",
  primeiraVez: "",
  dataEstimada: "",
  observacoes: "",
  instagram: "",
  email: "",
};

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  // Se a pessoa digitar o código do país (+55 ou 55), descarta —
  // sem isso o "55" era lido como DDD e o número inteiro saía deslocado.
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function FormularioLead() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState<FormState>(FORM_VAZIO);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormState;
    const value = name === "phone" ? formatPhone(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Só nome, telefone e destino são obrigatórios.
    if (!form.name || !form.phone || !form.destino) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/lead-personalizado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          instagram: form.instagram.replace(/^@/, ""),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(FORM_VAZIO);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-creme border border-grafite/10 text-grafite font-jakarta text-[15px] px-4 py-3 rounded-xl placeholder-cinzaClaro focus:outline-none focus:border-rosa focus:bg-white transition-all duration-200";

  const labelClass =
    "block font-jakarta font-medium text-[13px] text-cinza mb-1.5";

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl border border-grafite/5 p-8 md:p-10 text-center">
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 mx-auto mb-5"
          role="img"
          aria-label="Ilustração de um avião de papel"
        >
          <defs>
            <linearGradient id="aviao-lead" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7E455" />
              <stop offset="100%" stopColor="#F2277E" />
            </linearGradient>
          </defs>
          <path
            d="M58 8 L6 28 L24 36 L32 54 L42 34 Z"
            fill="url(#aviao-lead)"
            stroke="#2B2B2B"
            strokeOpacity="0.3"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M58 8 L24 36" fill="none" stroke="#2B2B2B" strokeOpacity="0.25" strokeWidth="1.6" />
        </svg>
        <h3 className="font-display font-bold text-grafite text-2xl mb-3">Recebi!</h3>
        <p className="font-jakarta text-cinza leading-relaxed">
          Recebi seus dados! Em breve vou entrar em contato com você no WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 border border-grafite/20 text-grafite font-jakarta font-medium text-sm px-5 py-2.5 rounded-full hover:border-grafite/50 transition-all"
        >
          enviar outro
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-grafite/5 p-6 md:p-8">
      <h3 className="font-display font-bold text-grafite text-xl md:text-2xl mb-1">
        Me conta um pouco sobre você
      </h3>
      <p className="font-jakarta text-cinza text-sm mb-6">
        Respondo pessoalmente, em até 2 horas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Obrigatórios */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Como você se chama?"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(11) 99999-9999"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="destino" className={labelClass}>
            Destino desejado *
          </label>
          <input
            id="destino"
            name="destino"
            type="text"
            required
            placeholder="Pra onde você quer ir?"
            value={form.destino}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-grafite/10" />
          <span className="font-jakarta font-medium text-[10px] uppercase tracking-[0.18em] text-cinzaClaro whitespace-nowrap">
            opcional
          </span>
          <span className="h-px flex-1 bg-grafite/10" />
        </div>

        <p className="font-jakarta text-cinzaClaro text-[13px] -mt-1">
          Se quiser, me conta mais sobre você. Ajuda a montar seu roteiro.
        </p>

        {/* Opcionais */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className={labelClass}>
              Idade
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Sua idade"
              min={16}
              max={99}
              value={form.age}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="primeiraVez" className={labelClass}>
              Primeira vez lá?
            </label>
            <select
              id="primeiraVez"
              name="primeiraVez"
              value={form.primeiraVez}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim, primeira vez</option>
              <option value="Não">Não, já estive lá</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dataEstimada" className={labelClass}>
            Quando você pretende ir?
          </label>
          <input
            id="dataEstimada"
            name="dataEstimada"
            type="date"
            value={form.dataEstimada}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          />
        </div>

        <div>
          <label htmlFor="observacoes" className={labelClass}>
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={2}
            placeholder="Restrição alimentar, criança pequena, o que já quer fazer…"
            value={form.observacoes}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Seu @"
              value={form.instagram}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {status === "error" && (
          <p className="font-jakarta font-medium text-rosaDeep text-sm">
            Ops, algo deu errado. Tenta de novo?
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosaDeep transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {status === "sending" ? "Enviando..." : "enviar meus dados"}
        </button>

        <p className="font-jakarta text-cinzaClaro text-[11px] text-center">
          Sem spam. Seus dados são só pra montar seu roteiro.
        </p>
      </form>
    </div>
  );
}
