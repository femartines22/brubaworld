"use client";

import { useEffect } from "react";
import { codigoValido, guardarIndicacao } from "@/lib/indicacao";

/** Guarda o código de indicação (?ref=) assim que a pessoa entra em qualquer página. */
export default function CapturaIndicacao() {
  useEffect(() => {
    const codigo = codigoValido(new URLSearchParams(window.location.search).get("ref"));
    if (codigo) guardarIndicacao(codigo);
  }, []);
  return null;
}
