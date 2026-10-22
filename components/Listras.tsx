// Faixa listrada de toldo de café parisiense: barras de 28px alternando duas cores.
// Aparece no topo do cartão de abertura e acima do rodapé da home.
export default function Listras({
  cor = "bg-rosa",
  fundo = "bg-manteigaClara",
  className = "",
}: {
  cor?: string;
  fundo?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`flex w-full max-w-full overflow-hidden ${className}`}>
      {Array.from({ length: 80 }).map((_, i) => (
        <span key={i} className={`shrink-0 w-7 h-full ${i % 2 === 0 ? cor : fundo}`} />
      ))}
    </div>
  );
}
