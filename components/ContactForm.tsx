"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    instagram: "",
    source: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const url = process.env.NEXT_PUBLIC_FORMSPREE_URL;
    if (!url) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", age: "", phone: "", email: "", instagram: "", source: "" });
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
      id="contato"
      ref={ref}
      className="bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left */}
          <div>
            <div className="reveal">
              <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight">
                Quero ser
                <br />
                avisada.
              </h2>
            </div>
            <div className="reveal mt-8 space-y-4 font-jakarta font-light text-preto/60 text-lg leading-relaxed">
              <p>
                Por enquanto a personalização tá pausada por aqui. Deixa seu
                contato pra eu te avisar assim que eu voltar com novidades!
              </p>
            </div>
          </div>

          {/* Right — form card */}
          <div className="reveal">
            <div className="bg-preto rounded-3xl p-8 md:p-10">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-6">✈️</div>
                  <h3 className="font-abril text-offwhite text-3xl mb-4">
                    Recebi!
                  </h3>
                  <p className="font-jakarta font-light text-offwhite/60 text-lg leading-relaxed">
                    Anotei tudo! Assim que tiver novidades por aqui, você será
                    uma das primeiras a saber.
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
                      E-mail *
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
                      Instagram{" "}
                      <span className="text-offwhite/30">(opcional)</span>
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      placeholder="@seunome"
                      value={form.instagram}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="source" className={labelClass}>
                      Como me achou? *
                    </label>
                    <select
                      id="source"
                      name="source"
                      required
                      value={form.source}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled className="bg-preto">
                        Selecione uma opção
                      </option>
                      <option value="TikTok" className="bg-preto">TikTok</option>
                      <option value="Instagram" className="bg-preto">Instagram</option>
                      <option value="Indicação de amigo" className="bg-preto">Indicação de amigo</option>
                      <option value="Outro" className="bg-preto">Outro</option>
                    </select>
                  </div>

                  {status === "error" && (
                    <p className="font-jakarta font-medium text-rosa text-sm">
                      Algo deu errado. Tente novamente ou me mande mensagem no
                      Instagram.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-xl hover:bg-rosa/90 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                  >
                    {status === "sending" ? "Enviando..." : "quero ser avisada →"}
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
