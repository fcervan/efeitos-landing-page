"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING_PILL } from "@/lib/ease";

type Status = "idle" | "copied" | "error";

type Props = {
  text: string;
  title?: string;
  compact?: boolean;
};

/**
 * Copia o prompt com Clipboard API e fallback por seleção.
 * O feedback é textual (aria-live) e visual — nunca só cor.
 */
export default function CopyPrompt({ text, title = "Prompt para colar na sua LLM", compact = false }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const flash = (next: Status) => {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2600);
  };

  const selectCode = () => {
    const node = codeRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        flash("copied");
        return;
      }
      throw new Error("clipboard indisponível");
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(area);
      if (ok) {
        flash("copied");
      } else {
        selectCode();
        flash("error");
      }
    }
  };

  const label =
    status === "copied" ? "Prompt copiado" : status === "error" ? "Selecionado: use Ctrl+C" : "Copiar prompt";

  const button = (
    <motion.button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
        status === "copied"
          ? "bg-success text-white"
          : status === "error"
            ? "bg-warning text-ink"
            : "bg-accent text-white hover:bg-accent-dark"
      }`}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={SPRING_PILL}
      aria-label={label}
    >
      {status === "copied" ? (
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 6.4 4.6 9 10 3.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1.2" y="1.2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4.8 11.2a2 2 0 0 0 2 1.6h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-1.6-2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {label}
    </motion.button>
  );

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {button}
        <p className="text-[13px] text-body" role="status" aria-live="polite">
          {status === "copied"
            ? "Está na sua área de transferência. Cole na LLM e ajuste o contexto."
            : status === "error"
              ? "O navegador bloqueou a cópia: o texto foi selecionado para você."
              : "Copia a instrução completa do efeito em destaque (A5)."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-smoke bg-night">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-smoke px-5 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-light">
            {title}
          </p>
          <p className="mt-1 text-[13px] text-white/50" role="status" aria-live="polite">
            {status === "copied"
              ? "Copiado. Cole na sua LLM e troque o contexto pelo seu projeto."
              : status === "error"
                ? "Cópia bloqueada pelo navegador — o texto abaixo foi selecionado."
                : "Inclui receita, restrições de performance e acessibilidade."}
          </p>
        </div>
        {button}
      </div>
      <pre className="code-block scroll-dark max-h-[320px] overflow-y-auto rounded-none border-0 bg-transparent">
        <code ref={codeRef} className="whitespace-pre-wrap break-words">
          {text}
        </code>
      </pre>
    </div>
  );
}
