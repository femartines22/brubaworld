import { paisesVisitados } from "@/data/paisesVisitados";
import { cidadesVisitadas } from "@/data/cidades";

// Lugares onde a Bruba já esteve: as cidades e os países das listas da home.
// Usado no formulário para avisar quando o destino digitado é um lugar que ela conhece.
const LUGARES = [...cidadesVisitadas, ...paisesVisitados];

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function escaparRegex(texto: string) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Devolve o nome do lugar visitado que aparece no texto, ou null. Ignora acento e maiúscula. */
export function lugarVisitado(texto: string): string | null {
  const alvo = normalizar(texto);
  if (alvo.length < 3) return null;

  return (
    LUGARES.find((lugar) =>
      new RegExp(`(^|[^a-z])${escaparRegex(normalizar(lugar))}([^a-z]|$)`).test(alvo)
    ) ?? null
  );
}
