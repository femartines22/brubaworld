export default function ComoViajar() {
  return (
    <section id="como-viajar" className="scroll-mt-24 py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-10 text-center">
          <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
            Como você quer viajar?
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
            Escolha sua próxima etapa.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal bg-preto rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.45)]">
            <span className="inline-flex items-center gap-2 font-jakarta font-medium text-xs uppercase tracking-[0.2em] text-offwhite/50 mb-6">
              roteiros prontos
            </span>
            <h3 className="font-abril text-offwhite text-3xl md:text-4xl leading-tight">
              Roteiros prontos
            </h3>
            <p className="mt-6 font-jakarta font-light text-offwhite/70 text-base md:text-lg leading-relaxed">
              Guias completos, prontos pra usar, com tudo que você precisa pra já sair viajando.
            </p>
            <a
              href="#roteiros"
              className="mt-10 inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosa/90 transition-all duration-200"
            >
              Ver roteiros disponíveis
            </a>
          </div>

          <div className="reveal bg-preto rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.45)]">
            <span className="inline-flex items-center gap-2 font-jakarta font-medium text-xs uppercase tracking-[0.2em] text-offwhite/50 mb-6">
              roteiro personalizado
            </span>
            <h3 className="font-abril text-offwhite text-3xl md:text-4xl leading-tight">
              Quero montar meu roteiro personalizado
            </h3>
            <p className="mt-6 font-jakarta font-light text-offwhite/70 text-base md:text-lg leading-relaxed">
              Um roteiro pensado só pra sua viagem, do seu jeito.
            </p>
            <a
              href="#form-personalizado"
              className="mt-10 inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-white/10 text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:border-white/20 hover:bg-white/5 transition-all duration-200"
            >
              Quero meu roteiro personalizado
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
