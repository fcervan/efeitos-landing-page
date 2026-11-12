import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/** Fallback estático das demos pesadas: altura reservada, zero CLS, zero WebGL. */
function HeavyFallback({ label }: { label: string }) {
  return (
    <div className="grid min-h-[420px] place-items-center rounded-card border border-smoke bg-night p-8 text-center">
      <div>
        <div
          className="mx-auto h-24 w-24 rounded-full"
          style={{
            background: "radial-gradient(circle at 32% 30%, #9DB0FF, #2B4EFF 45%, #7C3AED 90%)",
          }}
          aria-hidden="true"
        />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
          carregando {label} sob demanda
        </p>
        <p className="mt-2 text-[13px] text-white/40">
          O bundle pesado só entra nesta rota. Nada dele chega à home ou ao índice.
        </p>
      </div>
    </div>
  );
}

/**
 * Mapa de demos — importado apenas por DemoFrame, que só existe em /lab/[slug].
 * Three/R3F/Spline entram com ssr: false e fallback estático.
 */
export const DEMOS: Record<string, ComponentType> = {
  lenis: dynamic(() => import("./LenisDemo")),
  scrollytelling: dynamic(() => import("./ScrollytellingDemo")),
  "scroll-driven": dynamic(() => import("./ScrollDrivenDemo")),
  "sticky-pinned": dynamic(() => import("./StickyDemo")),
  "kinetic-typography": dynamic(() => import("./KineticTypeDemo")),
  webgl: dynamic(() => import("./WebGLDemo"), {
    ssr: false,
    loading: () => <HeavyFallback label="cena WebGL" />,
  }),
  "spline-3d": dynamic(() => import("./SplineDemo"), {
    ssr: false,
    loading: () => <HeavyFallback label="runtime do Spline" />,
  }),
  shaders: dynamic(() => import("./ShaderDemo"), {
    ssr: false,
    loading: () => <HeavyFallback label="shader GLSL" />,
  }),
  "tilt-3d": dynamic(() => import("./TiltDemo")),
  "bento-grid": dynamic(() => import("./BentoDemo")),
  glassmorphism: dynamic(() => import("./GlassDemo")),
  aurora: dynamic(() => import("./AuroraDemo")),
  "film-grain": dynamic(() => import("./GrainDemo")),
  spotlight: dynamic(() => import("./SpotlightDemo")),
  "magnetic-buttons": dynamic(() => import("./MagneticDemo")),
  "spring-physics": dynamic(() => import("./SpringDemo")),
  "gsap-scrolltrigger": dynamic(() => import("./GsapDemo")),
  "reveal-cascata": dynamic(() => import("./RevealDemo")),
  "parallax-camadas": dynamic(() => import("./ParallaxDemo")),
  marquee: dynamic(() => import("./MarqueeDemo")),
  "flip-card": dynamic(() => import("./FlipCardDemo")),
  "count-up": dynamic(() => import("./CountUpDemo")),
  "anel-progresso": dynamic(() => import("./ProgressRingDemo")),
  confetti: dynamic(() => import("./ConfettiDemo")),
  acordeao: dynamic(() => import("./AccordionDemo")),
  pulso: dynamic(() => import("./PulseDemo")),
  shake: dynamic(() => import("./ShakeDemo")),
  "hover-lift": dynamic(() => import("./HoverLiftDemo")),
  "mascara-linha": dynamic(() => import("./LineMaskDemo")),
};
