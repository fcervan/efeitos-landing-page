import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import Steps from "@/components/home/Steps";
import Marquee from "@/components/home/Marquee";
import Proof from "@/components/home/Proof";
import CtaStats from "@/components/home/CtaStats";
import CtaFinal from "@/components/home/CtaFinal";

/**
 * Home curada: exatamente os 8 efeitos marcados no Anexo A
 * (A5, B4, C1, C3, D1, E1, E3, E5) + Lenis e springs globais.
 * Zero WebGL, zero seção pinada, nenhum componente de components/demos.
 */
export default function HomePage() {
  return (
    <main className="pt-[72px]">
      <Hero />
      <Bento />
      <Steps />
      <Marquee />
      <Proof />
      <CtaStats />
      <CtaFinal />
    </main>
  );
}
