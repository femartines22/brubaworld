// PROVISÓRIO: estes depoimentos são exemplos, não de clientes reais.
// Ficam por decisão da Bruna até chegarem depoimentos de verdade (com autorização).
// Pendência registrada: trocar antes de divulgar mais o site.
const reviews = [
  {
    text: "O roteiro foi simplesmente perfeito. Cada detalhe fez sentido pra gente.",
    name: "Simone",
    destination: "Malta",
  },
  {
    text: "Nunca tinha viajado com tanta segurança. Sabia exatamente onde ir em cada momento.",
    name: "Rafaella",
    destination: "Paris",
  },
  {
    text: "Parecia que alguém que conhecia a cidade tinha montado pra mim. Muito além do que esperava.",
    name: "Fernando",
    destination: "Londres",
  },
  {
    text: "Cada restaurante, cada passeio, tudo encaixou. Foi a melhor viagem que já fiz.",
    name: "Maria",
    destination: "Barcelona",
  },
];

export default function Reviews() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="titulo-avaliacoes"
      className="scroll-mt-6 bg-manteigaSoft rounded-2xl px-5 py-16 lg:px-12 lg:py-28"
    >
      <h2
        id="titulo-avaliacoes"
        data-reveal
        className="font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em]"
      >
        Quem já viajou
      </h2>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mt-12 lg:mt-16">
        {reviews.map((review) => (
          <figure key={review.name} data-reveal>
            <blockquote className="font-display font-semibold text-grafite text-[1.25rem] lg:text-[1.875rem] leading-[1.25] tracking-[-0.01em]">
              <p>&ldquo;{review.text}&rdquo;</p>
            </blockquote>
            <figcaption className="font-jakarta text-[1.0625rem] mt-5">
              <span className="font-semibold text-grafite">{review.name}</span>
              <span className="text-cinza"> · {review.destination}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
