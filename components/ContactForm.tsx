"use client";

import { useEffect, useRef, useState } from "react";

type FormState = {
  name: string;
  age: string;
  phone: string;
  email: string;
  instagram: string;
  destino: string;
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    age: "",
    phone: "",
    email: "",
    instagram: "",
    destino: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormState;
    const value = name === "phone" ? formatPhone(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/lead-personalizado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", age: "", phone: "", email: "", instagram: "", destino: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-offwhite/10 text-offwhite font-jakarta font-light text-base px-5 py-4 rounded-xl placeholder-offwhite/30 focus:outline-none focus:border-rosa focus:bg-white/10 transition-all duration-200";

  const labelClass = "block font-jakarta font-medium text-sm text-offwhite/60 mb-2";

  return (
    <section
      id="form-personalizado"
      ref={ref}
      className="scroll-mt-24 bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <div className="reveal">
              <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight">
                Dois jeitos de viajar com a Bruba
              </h2>
            </div>
            <div className="reveal mt-8 space-y-6 font-jakarta text-preto/70 text-lg leading-relaxed">
              <p className="max-w-xl">
                Roteiros prontos para destinos selecionados e roteiros personalizados montados especialmente para você.
              </p>
              <div className="space-y-4">
                <div className="rounded-[2rem] border border-preto/10 bg-white p-5 shadow-sm">
                  <span className="font-jakarta font-semibold text-preto text-sm uppercase tracking-[0.18em]">
                    Roteiros prontos
                  </span>
                  <p className="mt-3 font-jakarta font-light text-preto/60 text-base leading-relaxed">
                    Guias limitados para alguns destinos selecionados, feitos por quem já foi. Perfeito para quem quer viajar com segurança, saindo do passo a passo já testado.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-preto/10 bg-white p-5 shadow-sm">
                  <span className="font-jakarta font-semibold text-preto text-sm uppercase tracking-[0.18em]">
                    Roteiro personalizado
                  </span>
                  <p className="mt-3 font-jakarta font-light text-preto/60 text-base leading-relaxed">
                    Você conta os seus planos aqui e a gente entra em contato pelo WhatsApp o mais breve possível para montar o roteiro do seu jeito.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="bg-preto rounded-3xl p-8 md:p-10">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-6">✈️</div>
                  <h3 className="font-abril text-offwhite text-3xl mb-4">Recebi!</h3>
                  <p className="font-jakarta font-light text-offwhite/60 text-lg leading-relaxed">
                    Recebi! Em breve você tem novidades por aqui.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 inline-flex items-center gap-2 border border-offwhite/20 text-offwhite font-jakarta font-medium text-sm px-6 py-3 rounded-full hover:border-offwhite/50 transition-all"
                  >
                    enviar outro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
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
                      <label htmlFor="age" className={labelClass}>
                        Idade *
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        required
                        placeholder="Sua idade"
                        min={16}
                        max={99}
                        value={form.age}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
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
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram" className={labelClass}>
                      Instagram <span className="text-offwhite/30">(opcional)</span>
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      placeholder="Seu nome no Instagram"
                      value={form.instagram}
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

                  {status === "error" && (
                    <p className="font-jakarta font-medium text-rosa text-sm">
                      Ops, algo deu errado. Tenta de novo?
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-xl hover:bg-rosa/90 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                  >
                    {status === "sending" ? "Enviando..." : "quero saber mais"}
                  </button>

                  <p className="font-jakarta font-light text-offwhite/30 text-xs text-center">
                    Sem spam. Seus dados são só pra montar seu roteiro.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
