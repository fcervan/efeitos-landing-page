"use client";

import type { ReactNode } from "react";

/**
 * Kit visual compartilhado pelas demos.
 * Toda demo tem palco + região de controles permanentemente visível (nada em modal).
 */

export function DemoLayout({
  stage,
  controls,
  note,
}: {
  stage: ReactNode;
  controls: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_310px]">
      <div className="flex min-w-0 flex-col gap-3">
        {stage}
        {note ? <p className="text-[12.5px] leading-relaxed text-body">{note}</p> : null}
      </div>
      <aside
        className="flex h-fit flex-col gap-5 rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-[96px]"
        aria-label="Controles da demo"
      >
        {controls}
      </aside>
    </div>
  );
}

export function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-tangerine-dark">
      {children}
    </h3>
  );
}

export function Stage({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative min-h-[420px] flex-1 overflow-hidden rounded-card border ${
        dark ? "on-dark border-smoke bg-night text-white" : "border-line bg-mist"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const id = `slider-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-semibold text-ink">
          {label}
        </label>
        <span className="font-mono text-[12px] text-body">
          {value.toLocaleString("pt-BR")}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-pill bg-line accent-[#FF5A0A] outline-offset-4"
        style={{
          background: `linear-gradient(90deg, #FF5A0A ${((value - min) / (max - min)) * 100}%, #EDEDED ${
            ((value - min) / (max - min)) * 100
          }%)`,
        }}
      />
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="flex-1">
        <span className="block text-[13px] font-semibold text-ink">{label}</span>
        {hint ? <span className="mt-0.5 block text-[11.5px] leading-snug text-body">{hint}</span> : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-pill border transition-colors duration-300 ${
          checked ? "border-tangerine bg-tangerine" : "border-line bg-mist"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ease-out ${
            checked ? "translate-x-[24px]" : "translate-x-[4px]"
          }`}
        />
      </button>
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ id: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <span className="block text-[13px] font-semibold text-ink">{label}</span>
      <div className="mt-2 flex flex-wrap gap-1 rounded-pill border border-line bg-mist p-1" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            className={`flex-1 rounded-pill px-2.5 py-1.5 text-[12px] font-semibold transition-colors duration-300 ${
              value === option.id ? "bg-ink text-white" : "text-body hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
}) {
  const id = `select-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-mist px-3 py-2 text-[13px] font-semibold text-ink focus:border-tangerine/50 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "solid",
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "solid" | "outline" | "dark";
  ariaLabel?: string;
}) {
  const styles = {
    solid: "bg-tangerine text-white hover:bg-tangerine-dark",
    outline: "border border-line bg-white text-ink hover:border-tangerine/50",
    dark: "bg-ink text-white hover:bg-carbon",
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-pill px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export function Readout({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <dl className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-line bg-mist px-3 py-2">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-body">{item.label}</dt>
          <dd className="mt-0.5 font-mono text-[13px] font-bold text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
