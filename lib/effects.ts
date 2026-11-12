/**
 * REGISTRO — fonte única da verdade do Efeitos Landing Page.
 * Alimenta: índice /lab, filtros, badges de custo, generateStaticParams,
 * generateMetadata, ficha técnica, prompt copiável e o mapa de demos.
 *
 * Seleção do Anexo A: laboratório completo (29 efeitos) + home curada com 8.
 */

export type EffectCategory = "scroll" | "3d" | "estetica" | "interacao";
export type EffectCost = "leve" | "medio" | "pesado";

export type Effect = {
  slug: string;
  code: string;
  name: string;
  category: EffectCategory;
  cost: EffectCost;
  deps: string[];
  summary: string;
  prompt: string;
  onHome?: boolean;
  what: string;
  when: string;
  how: string[];
  care: string[];
  perf: string;
};

export const CATEGORY_LABEL: Record<EffectCategory, string> = {
  scroll: "Scroll",
  "3d": "3D",
  estetica: "Estética",
  interacao: "Interação",
};

export const COST_LABEL: Record<EffectCost, string> = {
  leve: "leve",
  medio: "médio",
  pesado: "pesado",
};

export const COST_HINT: Record<EffectCost, string> = {
  leve: "Roda em qualquer celular. Só transform/opacity ou CSS.",
  medio: "Custa GPU em áreas grandes ou cria contexto de scroll. Meça antes.",
  pesado: "Bundle grande + contexto WebGL. Carregue lazy e com fallback.",
};

export const EFFECTS: Effect[] = [
  /* ---------------------------------------------------------------- A. Scroll */
  {
    slug: "lenis",
    code: "A1",
    name: "Smooth Scroll / Lenis",
    category: "scroll",
    cost: "leve",
    deps: ["lenis"],
    summary: "Rolagem com inércia e interpolação: a base fluida dos sites de movimento.",
    prompt:
      "Use Lenis 1.3 para smooth scroll com inércia (duration 1.15, easing t => 1 - Math.pow(1 - t, 4), smoothWheel: true), rodando em um único requestAnimationFrame com cleanup no unmount. Exponha um singleton getLenis() para scrollToId. Desligue em prefers-reduced-motion e em telas de toque, mantendo o scroll nativo. Integre com GSAP ScrollTrigger via lenis.on('scroll', ScrollTrigger.update) e chame ScrollTrigger.refresh() depois de fontes e imagens.",
    what:
      "Lenis intercepta a roda do mouse e interpola a posição de rolagem em vez de saltar. O resultado é aquele peso macio de site premiado, sem sequestrar o teclado nem a barra de rolagem.",
    when:
      "Landing pages com animação de scroll. É a fundação: parallax, pin e scrub ficam visivelmente melhores quando a rolagem já é interpolada.",
    how: [
      "new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true }).",
      "Um único loop: requestAnimationFrame chamando lenis.raf(time), cancelado no cleanup.",
      "CSS: html.lenis, html.lenis body { height: auto } e .lenis.lenis-smooth { scroll-behavior: auto !important }.",
      "lenis.on('scroll', ScrollTrigger.update) + ScrollTrigger.refresh() após fontes/imagens.",
      "Singleton getLenis()/setLenis() para que botões chamem lenis.scrollTo(alvo, { duration: 1.3 }).",
    ],
    care: [
      "Prefers-reduced-motion: não instancie. Scroll instantâneo é a versão acessível.",
      "Em toque, o scroll nativo é melhor: aqui o provider só liga em ponteiro fino e tela ≥ 1024px.",
      "Containers internos precisam de data-lenis-prevent para não brigar com a instância global.",
    ],
    perf: "Poucos kB de JS e nenhum trabalho de layout: Lenis só escreve scrollTop. O custo real aparece se você acoplar efeitos caros ao scroll.",
  },
  {
    slug: "scrollytelling",
    code: "A2",
    name: "Scrollytelling",
    category: "scroll",
    cost: "medio",
    deps: ["gsap", "ScrollTrigger", "framer-motion"],
    summary: "Narrativa em passos: a seção trava e o conteúdo troca conforme a rolagem.",
    prompt:
      "Faça uma seção de scrollytelling com GSAP ScrollTrigger: ScrollTrigger.create({ trigger, start: 'top top', end: '+=320%', pin: true, anticipatePin: 1, onUpdate }) dentro de gsap.context com ctx.revert() no cleanup. No onUpdate, atualize o passo ativo com Math.min(n - 1, Math.floor(progress * n)) e uma barra lateral com scaleY(progress). Troque o conteúdo do passo com AnimatePresence animando só opacity, y e scale. Cada passo da lista é clicável e faz scrollTo para o ponto correspondente. Em telas pequenas e em prefers-reduced-motion, renderize a lista estática sem pin.",
    what:
      "Uma seção alta com um palco interno fixado. A rolagem vira linha do tempo: cada trecho revela um passo da história enquanto o palco permanece no lugar.",
    when:
      "Explicar produto em etapas, contar um processo de 3 a 5 passos ou acompanhar um mockup que muda de estado.",
    how: [
      "ScrollTrigger.create({ pin: true, start: 'top top', end: '+=320%', anticipatePin: 1 }).",
      "onUpdate: setActive(Math.min(n - 1, Math.floor(self.progress * n))).",
      "Barra de progresso com scaleY(progress) e transform-origin: top.",
      "AnimatePresence mode=\"wait\" com opacity/y/scale para trocar o passo.",
      "Passos clicáveis: scrollTo(trigger.start + (trigger.end - trigger.start) * (i / n)).",
    ],
    care: [
      "pin cria um pin-spacer: chame ScrollTrigger.refresh() depois de fontes e imagens carregarem.",
      "Pin em tela pequena é hostil: aqui vira lista estática abaixo de 1024px.",
      "Uma seção pinada por página. Duas brigam pelo espaço e pelo orçamento de scroll.",
    ],
    perf: "ScrollTrigger soma ~40 kB. O pin é barato porque só transforma o palco; o custo vem de trocar conteúdo pesado a cada passo.",
  },
  {
    slug: "scroll-driven",
    code: "A3",
    name: "Scroll-driven / Scroll-triggered",
    category: "scroll",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Scrub liga a animação ao progresso; triggered dispara uma vez na entrada.",
    prompt:
      "Implemente as duas famílias de animação de scroll com Framer Motion e deixe claro qual é qual. Scrub: useScroll({ target, offset: ['start end', 'end start'] }) + useTransform para parallax, rotação e barras, com o usuário controlando ida e volta. Triggered: whileInView com viewport={{ once: true, margin: '-60px' }} para revelar cards e títulos. Nunca misture Framer useScroll e GSAP no mesmo elemento: um dono por elemento. Anime só transform e opacity e desligue tudo com useReducedMotion().",
    what:
      "Dois padrões que costumam ser confundidos. No scroll-driven (scrub) a animação é uma função do progresso da rolagem. No scroll-triggered ela dispara quando o elemento entra na viewport e segue sozinha.",
    when:
      "Scrub para parallax, desenho de linha e barras de progresso. Triggered para revelar títulos, cards e números — qualquer coisa que deve acontecer uma vez só.",
    how: [
      "Scrub: const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] }).",
      "useTransform(scrollYProgress, [0, 1], ['0%', '-24%']) aplicado em y, rotate ou scaleX.",
      "Triggered: whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}.",
      "Para números, GSAP to(obj, { v, onUpdate }) com scrollTrigger: { once: true } (demo E5).",
    ],
    care: [
      "Um dono por elemento: Framer useScroll ou GSAP, nunca os dois.",
      "Scrub com muitos elementos escutando o mesmo scroll fica caro: agrupe no container.",
      "Com reduced motion, entregue o estado final imediatamente.",
    ],
    perf: "Framer Motion já está no bundle da home; o scrub não cria listeners extras por elemento (usa um scroll listener compartilhado).",
  },
  {
    slug: "sticky-pinned",
    code: "A4",
    name: "Sticky / Pinned Sections",
    category: "scroll",
    cost: "leve",
    deps: [],
    summary: "A seção trava na viewport enquanto o conteúdo interno avança — sem JS.",
    prompt:
      "Crie uma seção sticky em CSS puro: wrapper alto (300vh) e palco interno com position: sticky; top: 0; height: 100svh. Nenhum ancestral pode ter overflow: hidden. Use 100svh/100dvh em vez de 100vh por causa da barra dinâmica do mobile. Faça o conteúdo interno avançar com IntersectionObserver em blocos-gatilho, sem loop de animação. Ofereça fallback estático em prefers-reduced-motion.",
    what:
      "position: sticky prende um elemento dentro do próprio container. É o primo barato do pin do GSAP: nenhum JavaScript, nenhum espaçador calculado, nenhum listener de scroll.",
    when:
      "Comparações lado a lado, features em etapas, coluna de texto que acompanha uma imagem. Quando você não precisa de scrub numérico, sticky resolve.",
    how: [
      "Wrapper com altura em vh (300vh) e palco filho com position: sticky; top: 0; height: 100svh.",
      "Blocos-gatilho dentro do wrapper observados por IntersectionObserver para trocar o estado.",
      "top calc(var(--nav-h)) quando existe navbar fixa.",
      "Para controle fino de progresso, troque por GSAP pin: true (demo A2).",
    ],
    care: [
      "overflow: hidden em qualquer ancestral mata o sticky — use overflow-x: clip no body.",
      "100vh no mobile muda com a barra do navegador: prefira 100svh.",
      "Sticky não é pin: ele não empurra o layout, então o wrapper precisa da altura certa.",
    ],
    perf: "Custo de JS zero. O navegador resolve no compositor; é o padrão mais barato de seção travada.",
  },
  {
    slug: "kinetic-typography",
    code: "A5",
    name: "Kinetic Typography",
    category: "scroll",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Palavras reveladas por máscara com stagger e leve reação ao mouse.",
    prompt:
      "Crie kinetic typography no hero: quebre o título em palavras, cada uma em um span com display: inline-block e overflow: hidden, e anime o filho de y: '110%' para 0 com stagger (delay 0.1 + i * 0.09, easing cubic-bezier(0.22,1,0.36,1)). Destaque uma palavra com a cor de acento. Adicione reação ao mouse com useMotionValue + useSpring + useTransform aplicando rotateX/rotateY leves. Dê padding-bottom ao mask para não cortar descendentes (g, p, q) e quebre a headline em telas pequenas. Com useReducedMotion(), mostre o texto final sem movimento. Não use plugins pagos de split de texto.",
    onHome: true,
    what:
      "Tipografia que se apresenta em movimento: cada palavra sobe por trás de uma máscara, com atraso entre elas. É o jeito mais barato de causar primeira impressão.",
    when:
      "Hero e títulos de seção. Funciona especialmente bem com fontes de peso alto e entrelinha apertada.",
    how: [
      "Split manual: title.split(' ').map(...) — sem biblioteca de split.",
      "Máscara: span inline-block com overflow: hidden e padding-bottom para descendentes.",
      "Filho motion.span com initial={{ y: '110%' }} animate={{ y: 0 }} e delay 0.1 + i * 0.09.",
      "Reação ao mouse: molas independentes em rotateX/rotateY, amplitude de 3 a 6 graus.",
    ],
    care: [
      "overflow: hidden corta g, p, q: reserve padding-bottom e leading generoso.",
      "Palavras longas quebram o layout em 390px: use clamp() no font-size.",
      "Não anime letter-spacing ou font-size em loop — só transform.",
    ],
    perf: "Puro transform/opacity em poucos nós. Custo desprezível e nenhum listener global.",
  },

  /* ------------------------------------------------------------------- B. 3D */
  {
    slug: "webgl",
    code: "B1",
    name: "WebGL / Three / R3F",
    category: "3d",
    cost: "pesado",
    deps: ["three", "@react-three/fiber", "@react-three/drei"],
    summary: "3D real com luzes coloridas, partículas e órbita — carregado só nesta rota.",
    prompt:
      "Adicione uma cena 3D com React Three Fiber carregada sob demanda: next/dynamic com ssr: false e fallback estático com aspect-ratio reservado. Canvas com dpr={[1, 1.75]}, câmera única, geometrias e materiais reaproveitados (useMemo), sem recriar nada por frame. Ilumine com key colorida, rim e fill, use fog e partículas emissivas para atmosfera. Pause o render quando o canvas sair da viewport (IntersectionObserver) ou a aba ficar oculta (visibilitychange) e rode em frameloop demand quando parado. Um único canvas por página, orbit com damping e cleanup completo no unmount.",
    what:
      "Malhas, luzes e materiais renderizados na GPU. Não é um vídeo: a câmera responde ao arrasto, a luz tem direção e o material tem brilho de verdade.",
    when:
      "Quando o 3D é o produto ou o diferencial visual. Caso contrário, B4 (tilt em CSS) entrega 90% do impacto por 1% do custo.",
    how: [
      "dynamic(() => import('./WebGLDemo'), { ssr: false, loading: fallback }) — só nesta rota.",
      "<Canvas dpr={[1, 1.75]} frameloop={ativo ? 'always' : 'demand'}> com OrbitControls de drei.",
      "Geometria e materiais em useMemo; nada de new Material dentro de useFrame.",
      "IntersectionObserver + visibilitychange decidem se o loop roda.",
      "Luzes: key cobalto, rim violeta, fill magenta, fog para profundidade.",
    ],
    care: [
      "Um contexto WebGL por página. Vários canvases disputam memória de GPU e o navegador começa a descartar contextos.",
      "Sempre fallback estático: o LCP não pode depender do 3D.",
      "Sem teste em celular antigo, não coloque 3D na home.",
    ],
    perf: "O custo é bundle (centenas de kB) + memória de GPU. Por isso vive em rota própria, com import dinâmico e render pausado fora da tela.",
  },
  {
    slug: "spline-3d",
    code: "B2",
    name: "Spline 3D",
    category: "3d",
    cost: "pesado",
    deps: ["@splinetool/react-spline", "@splinetool/runtime"],
    summary: "Cena montada em editor visual, embutida com runtime lazy e pôster estático.",
    prompt:
      "Incorpore uma cena Spline interativa com carregamento lazy: dynamic(() => import('@splinetool/react-spline'), { ssr: false }) e a URL do projeto em scene. Reserve a altura com aspect-ratio e mostre um pôster estático até a cena carregar. Só inicialize o runtime depois de um clique explícito do usuário (ou quando entrar na viewport), mostre erro com botão de tentar de novo se a cena externa falhar e nunca bloqueie o LCP. Declare o peso do runtime no relatório.",
    what:
      "Você monta a cena no editor do Spline (câmera, luz, interação) e embute o resultado. O runtime interpreta o arquivo .splinecode no navegador.",
    when:
      "Quando o time tem mais design que engenharia de gráficos e a cena não precisa de shaders customizados.",
    how: [
      "dynamic(() => import('@splinetool/react-spline'), { ssr: false }).",
      "scene = URL pública do projeto exportada do editor.",
      "onLoad guarda a aplicação; eventos (mouseDown, keyDown) vêm do runtime.",
      "Pôster + botão 'Carregar cena' antes de baixar o runtime: o custo fica sob controle do usuário.",
    ],
    care: [
      "A cena é um asset externo: se a URL cair, o fallback precisa segurar a página — aqui há erro visível e botão de retry.",
      "Runtime + cena podem passar de 1 MB. Nunca carregue automático na home.",
      "Exporte com poucas luzes e sem física se o alvo é celular.",
    ],
    perf: "O maior bundle do laboratório. Carregamento por clique, pôster com aspect-ratio e nenhum pixel de 3D antes da interação.",
  },
  {
    slug: "shaders",
    code: "B3",
    name: "Custom Shaders / GLSL",
    category: "3d",
    cost: "pesado",
    deps: ["three", "@react-three/fiber"],
    summary: "Distorção líquida em GLSL com ruído simplex reagindo ao cursor.",
    prompt:
      "Aplique um shader GLSL de distorção que reage ao cursor: plano em tela cheia com THREE.ShaderMaterial (ou shaderMaterial do drei), uniforms uTime, uPointer e uResolution, ruído simplex 2D/3D no fragment shader para o padrão orgânico e smoothstep para as bordas. Atualize uPointer com interpolação (lerp) para o movimento ficar macio. Carregue com next/dynamic ssr: false, ofereça fallback em CSS (gradiente estático) quando WebGL não existir ou prefers-reduced-motion estiver ativo, e pause o loop fora da viewport.",
    what:
      "Um programa que roda por pixel na GPU. Aqui, um campo de ruído simplex que se dobra em torno do cursor e mistura cobalto, magenta e violeta.",
    when:
      "Identidade visual muito específica, fundos líquidos, transições de imagem. Quando não precisa reagir ao usuário, um vídeo é mais barato e mais fácil de manter.",
    how: [
      "Plano 2x2 com câmera ortográfica: o shader cobre a área inteira sem geometria cara.",
      "uniforms: uTime (tempo), uPointer (lerp do cursor), uResolution, uIntensity.",
      "Simplex noise em GLSL + fbm de 3 oitavas para textura orgânica.",
      "Fallback: o mesmo gradiente em CSS, sem canvas, quando não há WebGL.",
    ],
    care: [
      "Shader é código: difícil de manter e de depurar. Documente os uniforms.",
      "fbm com muitas oitavas derruba FPS em GPU integrada: aqui são 3.",
      "Precisão mediump no fragment evita custo extra em mobile.",
    ],
    perf: "Three entra no bundle, mas a geometria é mínima. O custo é fill-rate: área grande em DPR alto exige limitar o pixel ratio.",
  },
  {
    slug: "tilt-3d",
    code: "B4",
    name: "Interactive 3D Mesh / Tilt 3D",
    category: "3d",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Camadas em perspectiva que inclinam com o mouse — 3D sem WebGL.",
    prompt:
      "Faça um tilt 3D em CSS: contêiner com perspective: 1200px, filho com transform-style: preserve-3d e rotateX/rotateY vindos de useMotionValue + useSpring. No mousemove do próprio contêiner, normalize a posição para -1..1, inverta o rotateX e limite a amplitude a ~10 graus. Distribua as camadas com translateZ (90px, 120px, 160px) para criar profundidade real. onMouseLeave zera tudo. Desative em toque e em prefers-reduced-motion, e nunca use listeners globais.",
    onHome: true,
    what:
      "Perspective + preserve-3d + translateZ. O navegador monta a profundidade; você só gira o conjunto. Parece WebGL, mas roda no compositor.",
    when:
      "Cards, mockups de produto, hero. É o melhor custo-benefício do catálogo para dar volume a uma interface plana.",
    how: [
      "Contêiner com perspective: 1200px e overflow visível.",
      "Filho preserve-3d com rotateX/rotateY em useSpring (stiffness 150, damping 18).",
      "Camadas em translateZ: fundo 0, mockup 60px, badge 120px, bolha 160px.",
      "mousemove só no contêiner; mouseleave zera os motion values.",
    ],
    care: [
      "Touch não tem hover: desative e mostre a composição parada.",
      "translateZ grande estoura o container — deixe padding no pai.",
      "Sombras em elementos muito inclinados ficam estranhas: use sombras suaves.",
    ],
    perf: "Zero dependência nova. Só transform, nenhuma GPU de verdade, nenhum contexto para destruir.",
  },

  /* -------------------------------------------------------------- C. Estética */
  {
    slug: "bento-grid",
    code: "C1",
    name: "Bento Grid",
    category: "estetica",
    cost: "leve",
    deps: [],
    summary: "Grade modular assimétrica de 12 colunas, com blocos de tamanhos diferentes.",
    prompt:
      "Organize os recursos em um bento grid assimétrico: CSS Grid de 12 colunas no desktop com blocos em col-span-4/8 e row-span-2, gap consistente e cantos arredondados. Cada card tem hover com translateY(-4px) e sombra mais longa (transição só de transform/opacity). No mobile vire coluna única, garanta h-full para alturas coerentes e não deixe buracos na grade. Conteúdo vem de um array no topo do arquivo, nunca hardcoded no JSX.",
    onHome: true,
    what:
      "Grade de blocos com tamanhos diferentes, como uma caixa de bento. O contraste de tamanho cria hierarquia sem precisar de mais texto.",
    when:
      "Apresentar de 4 a 8 recursos, dashboards, páginas de features. Também é o layout ideal para um índice de efeitos.",
    how: [
      "grid grid-cols-1 lg:grid-cols-12 com gap-4 e auto-rows definidas.",
      "Spans por item: lg:col-span-8, lg:col-span-4, lg:row-span-2.",
      "Cards com h-full, overflow-hidden e hover lift curto.",
      "Dados em array tipado no topo do componente.",
    ],
    care: [
      "Sem auto-rows fixas o row-span-2 não fecha a conta e aparecem buracos.",
      "Em 768px, dois blocos largos por linha já é o limite legível.",
      "Não use bento para texto longo: o bloco pequeno pede frases curtas.",
    ],
    perf: "CSS puro, custo zero de JS. O único cuidado é não animar width/height no hover.",
  },
  {
    slug: "glassmorphism",
    code: "C2",
    name: "Glassmorphism",
    category: "estetica",
    cost: "medio",
    deps: [],
    summary: "Vidro fosco: transparência, blur de fundo e borda interna iluminada.",
    prompt:
      "Aplique glassmorphism em cards pequenos sobre fundo colorido: background rgba(255,255,255,0.10), backdrop-filter blur(18px) saturate(140%), borda 1px rgba(255,255,255,0.22) e box-shadow inset 0 1px 0 rgba(255,255,255,0.35). Garanta contraste AA escurecendo o fundo atrás do vidro ou usando scrim. Nunca aplique backdrop-filter em área de tela cheia nem anime o blur: para dar vida, anime transform/opacity de elementos já desfocados. Inclua fallback sem backdrop-filter via @supports.",
    what:
      "Uma superfície que embaça o que está atrás e devolve um reflexo na borda superior. Dá sensação de camada física sobre a foto ou o gradiente.",
    when:
      "Badges flutuantes sobre mockups, painéis sobre imagem, cards de prova social. Sempre em áreas pequenas.",
    how: [
      "bg-white/10 + backdrop-blur-xl + border-white/20 + shadow inset iluminado.",
      "Scrim escuro atrás do vidro quando o fundo é claro, para o texto passar em AA.",
      "@supports not (backdrop-filter: blur(1px)) → fundo sólido translúcido.",
      "Movimento: transform no card, nunca no blur.",
    ],
    care: [
      "backdrop-filter é caro: cada card cria uma camada de composição que amostra o fundo.",
      "Contraste cai fácil — meça o texto sobre o pior caso do fundo.",
      "Vidro sobre vidro (aninhado) fica ilegível e pesado.",
    ],
    perf: "Custo de GPU proporcional à área. Três cards pequenos são baratos; um painel full-screen não é.",
  },
  {
    slug: "aurora",
    code: "C3",
    name: "Mesh Gradients / Aurora",
    category: "estetica",
    cost: "medio",
    deps: [],
    summary: "Manchas de gradiente desfocados em movimento lento, sem animar o blur.",
    prompt:
      "Crie um fundo aurora com 3 ou 4 blobs de radial-gradient em hue diferentes, filter: blur(60-120px) aplicado uma única vez e animação lenta só de transform (translate/scale, 20-40s, alternate, easing suave). Use pointer-events: none, contain: paint e aria-hidden no container. Nunca anime o valor do blur. Em prefers-reduced-motion, congele os blobs na posição inicial. Reserve contraste para o texto com um scrim ou uma superfície sólida por cima.",
    onHome: true,
    what:
      "Manchas de cor desfocadas que se movem devagar, criando um fundo orgânico. É o jeito mais barato de tirar o aspecto chapado de uma seção.",
    when:
      "Hero, CTA final, fundos de seção escura. Combina bem com grain por cima.",
    how: [
      "Container absoluto com overflow: hidden, contain: paint e pointer-events: none.",
      "3–4 divs com radial-gradient em cores diferentes e blur fixo de 70–110px.",
      "Keyframes só de transform: translate3d + scale, 26s/34s/30s para não sincronizar.",
      "Texto por cima em superfície sólida ou com scrim para manter contraste.",
    ],
    care: [
      "Blur grande em tela cheia é o maior vilão de FPS em celular: limite a área.",
      "Não anime filter: blur() — anime scale de um elemento já desfocado.",
      "Cuidado com o contraste do texto sobre a mancha mais clara.",
    ],
    perf: "O blur é rasterizado uma vez e o movimento é compositor. Bem comportado se a área for contida.",
  },
  {
    slug: "film-grain",
    code: "C4",
    name: "Noise / Film Grain",
    category: "estetica",
    cost: "leve",
    deps: [],
    summary: "Granulado sutil em SVG feTurbulence por cima de tudo, a 4,5% de opacidade.",
    prompt:
      "Adicione um overlay de film grain com SVG feTurbulence inline em data URI como background-image (type fractalNoise, baseFrequency 0.9, numOctaves 3, stitchTiles stitch), position: fixed, inset: 0, pointer-events: none, opacity entre 0.03 e 0.06, mix-blend-mode: overlay e z-index acima do conteúdo. Não use PNG grande, não anime a textura em loop e não deixe o overlay capturar cliques. Ofereça controle de intensidade quando fizer parte de uma demo.",
    what:
      "Uma camada de ruído que quebra a superfície lisa dos gradientes. O olho lê como textura de filme, não como sujeira.",
    when:
      "Por cima de gradientes, auroras e fotos. Em identidade visual mais crua ou editorial.",
    how: [
      "SVG feTurbulence em data URI — sem arquivo externo, sem PNG pesado.",
      "position: fixed; inset: 0; pointer-events: none; mix-blend-mode: overlay.",
      "opacity .045 é o ponto doce; acima de .08 começa a sujar o texto.",
      "Deixe estático: grain animado custa caro e quase ninguém percebe.",
    ],
    care: [
      "pointer-events: none é obrigatório, senão o overlay come todos os cliques.",
      "mix-blend-mode cria contexto de composição: teste com elementos fixed.",
      "Em telas muito claras o overlay quase desaparece — ajuste a opacidade por seção.",
    ],
    perf: "Uma imagem SVG minúscula repetida. Sem JS, sem loop, sem repaint por frame.",
  },
  {
    slug: "spotlight",
    code: "C5",
    name: "Dark Mode + Neon Glow / Spotlight",
    category: "estetica",
    cost: "leve",
    deps: [],
    summary: "Brilho radial que segue o cursor e acende a borda dos cards no escuro.",
    prompt:
      "Crie uma seção escura com spotlight que segue o cursor: no pointermove do card, escreva --mx e --my em px via requestAnimationFrame (um único RAF pendente por elemento). O overlay usa radial-gradient(420px circle at var(--mx) var(--my), rgba(43,78,255,.20), transparent 70%) com opacity em transição curta. Para a borda iluminada, use um pseudo-elemento com o mesmo gradiente e mask em modo exclude. Em toque, use posição fixa; em prefers-reduced-motion, deixe o brilho estático. Remova o listener no cleanup.",
    what:
      "Fundo quase preto, cards escuros e um facho de luz que acompanha o cursor, revelando bordas e textura só onde você aponta.",
    when:
      "Seções premium, pricing, features de destaque. Funciona bem como contraponto a uma página clara.",
    how: [
      "pointermove no card → getBoundingClientRect → setProperty('--mx'/'--my').",
      "Atualização agrupada em requestAnimationFrame, cancelado no cleanup.",
      "Overlay radial com opacity 0→1 no hover; borda com mask exclude.",
      "Cores do facho vindas da paleta (cobalto + violeta), nunca branco puro.",
    ],
    care: [
      "Sem RAF, cada pointermove escreve estilo e força trabalho de pintura.",
      "Em touch não existe hover: fixe o facho no centro.",
      "Texto precisa de AA no ponto mais claro do facho, não só no fundo.",
    ],
    perf: "Um gradiente por card, atualizado no máximo uma vez por frame. Barato e sem dependência.",
  },

  /* ---------------------------------------------------------- D. Interações */
  {
    slug: "magnetic-buttons",
    code: "D1",
    name: "Magnetic Buttons",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "O botão puxa o cursor, com parallax interno no rótulo e no ícone.",
    prompt:
      "Faça botões magnéticos com Framer Motion: useMotionValue x/y alimentados no mousemove do próprio botão (dx = clientX - centro, x.set(dx * 0.28), y.set(dy * 0.35)) e suavizados por useSpring (stiffness 220, damping 14, mass 0.5). Adicione um segundo par de molas com fator menor para o conteúdo interno, criando parallax. Limite o deslocamento a ~12px com clamp, zere tudo no mouseleave e use whileHover scale 1.04 / whileTap 0.96. Desative em toque e com prefers-reduced-motion. O elemento continua sendo um link ou button semântico, navegável por teclado.",
    onHome: true,
    what:
      "O botão se desloca alguns pixels na direção do cursor, como se fosse atraído por ele. O rótulo se move um pouco menos, criando profundidade.",
    when:
      "CTA principal e ícones sociais. Um ou dois por tela — mais que isso vira parque de diversões.",
    how: [
      "useMotionValue + useSpring para x e y do wrapper.",
      "dx * 0.28 e dy * 0.35, com clamp em ±12px.",
      "Segundo par de molas com fator 0.12 para o conteúdo interno.",
      "whileHover/whileTap para o retorno tátil; mouseleave zera os valores.",
    ],
    care: [
      "Deslocamento grande parece bug: mantenha até 12px.",
      "Em toque não faz sentido — o alvo já é o dedo.",
      "Não transforme div em botão: use <a> ou <button> para manter teclado e leitor de tela.",
    ],
    perf: "Quatro molas por botão, só transform. Custo baixo, desde que não haja 20 botões magnéticos na tela.",
  },
  {
    slug: "spring-physics",
    code: "D2",
    name: "Bouncy / Spring Physics",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Molas em vez de easing: pílula que desliza entre abas com layoutId.",
    prompt:
      "Use spring physics do Framer Motion: transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.6 }} para micro-interações e valores mais amortecidos (damping 26-32) para elementos grandes. Para a pílula que desliza entre abas, use layoutId compartilhado dentro de LayoutGroup, com as abas como botões reais (role tablist/tab, aria-selected e navegação por setas). Exponha controles de stiffness, damping e mass para comparar o comportamento e respeite prefers-reduced-motion trocando a mola por duração zero.",
    what:
      "Em vez de uma curva de tempo fixa, a animação simula massa, rigidez e amortecimento. O movimento herda velocidade e para de um jeito orgânico.",
    when:
      "Pílulas de aba, toggles, cards que reordenam, qualquer coisa que precise parecer física e não linear.",
    how: [
      "transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.6 }}.",
      "layoutId + LayoutGroup para a pílula que atravessa as abas.",
      "Sliders para stiffness/damping/mass: o jeito rápido de achar o ajuste certo.",
      "Elementos grandes pedem damping alto (26+) para não balançar demais.",
    ],
    care: [
      "Mola muito elástica cansa em uso repetido: stiffness 200–450 é a faixa segura.",
      "layoutId exige que só um elemento com aquele id esteja montado por vez.",
      "Com reduced motion, troque por transição instantânea.",
    ],
    perf: "O solver roda em JS, mas escreve só transform. Dezenas de molas simultâneas ainda são baratas.",
  },
  {
    slug: "gsap-scrolltrigger",
    code: "D3",
    name: "GSAP + ScrollTrigger",
    category: "interacao",
    cost: "medio",
    deps: ["gsap", "ScrollTrigger"],
    summary: "Timeline orquestrada com scrub, dentro de gsap.context e matchMedia.",
    prompt:
      "Use GSAP com ScrollTrigger para pin e scrub: registre o plugin uma única vez em um módulo client, crie tudo dentro de useLayoutEffect com gsap.context(() => {...}, ref) e retorne () => ctx.revert(). Use gsap.matchMedia() para variantes por breakpoint e para (prefers-reduced-motion: reduce), onde a versão deve ser estática. Anime só transform/opacity, chame ScrollTrigger.refresh() depois de fontes/imagens e nunca deixe triggers duplicados (Strict Mode monta efeitos duas vezes). Quando houver Lenis, conecte lenis.on('scroll', ScrollTrigger.update).",
    what:
      "A biblioteca padrão para orquestrar animação com scroll: timelines, scrub, pin, callbacks e controle preciso de progresso.",
    when:
      "Sequências longas, várias animações coordenadas, pin com progresso numérico. Para revelar um card, Framer já basta.",
    how: [
      "gsap.registerPlugin(ScrollTrigger) em lib/gsap.ts, importado só por componentes client.",
      "useLayoutEffect + gsap.context(..., ref) + return () => ctx.revert().",
      "gsap.matchMedia() com condições de breakpoint e de reduced motion.",
      "timeline com scrollTrigger: { scrub: 1 } e alvos em transform/opacity.",
    ],
    care: [
      "Sem ctx.revert(), o Strict Mode duplica triggers e a animação dobra de velocidade.",
      "Não misture GSAP e Framer no mesmo elemento.",
      "Guarde o matchMedia e chame mm.revert() no cleanup.",
    ],
    perf: "GSAP + ScrollTrigger somam ~40 kB. Fora das rotas que precisam, o bundle não paga nada.",
  },

  /* --------------------------------------------------------------- E. Bônus */
  {
    slug: "reveal-cascata",
    code: "E1",
    name: "Reveal em cascata",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Itens entram em sequência quando o bloco aparece, uma única vez.",
    prompt:
      "Faça reveal em cascata com Framer Motion: whileInView={{ opacity: 1, y: 0 }} a partir de { opacity: 0, y: 28 }, viewport={{ once: true, margin: '-60px' }} e delay i * 0.08 (com teto de ~0.4s para listas longas). Crie um wrapper Reveal reutilizável que aceita delay e as, use useReducedMotion() para entregar o estado final direto e mantenha o conteúdo no HTML para funcionar sem JavaScript.",
    onHome: true,
    what:
      "Cada item de um grupo entra com um pequeno atraso em relação ao anterior. O olho segue a sequência e entende a ordem do conteúdo.",
    when:
      "Listas de recursos, grades de cards, depoimentos. É o efeito de entrada padrão de uma landing bem-acabada.",
    how: [
      "initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}.",
      "viewport={{ once: true, margin: '-60px' }} para disparar antes de chegar.",
      "delay: Math.min(i * 0.08, 0.4).",
      "Wrapper Reveal para não repetir a config em todo lugar.",
    ],
    care: [
      "once: true evita re-disparo e economiza trabalho de scroll.",
      "Listas longas com stagger linear deixam o último item esperando demais: use teto.",
      "Nada de opacity: 0 no CSS base — sem JS o conteúdo precisa aparecer.",
    ],
    perf: "Uma animação por item, uma vez na vida da página. Praticamente de graça.",
  },
  {
    slug: "parallax-camadas",
    code: "E2",
    name: "Parallax de camadas",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Grid, blob e mockup seguem o mouse com molas de fatores diferentes.",
    prompt:
      "Faça parallax de camadas no mouse: um único pointermove no container alimenta motion values normalizados (-1..1) e cada camada tem seu próprio useSpring com fator diferente (grid 6px, blob 18px, mockup 30px, badge 46px). Use transform apenas, will-change durante a interação e nada de listeners globais. Desative em toque e com prefers-reduced-motion, e zere as posições no pointerleave.",
    what:
      "Camadas em profundidades diferentes se deslocam em velocidades diferentes. O cérebro interpreta como profundidade, mesmo com tudo em 2D.",
    when:
      "Hero com composição de mockup, ilustras com fundo e frente, seções de destaque.",
    how: [
      "Um pointermove no container → mx/my normalizados.",
      "useTransform(mx, [-1, 1], [-fator, fator]) por camada.",
      "useSpring com stiffness menor nas camadas de trás (movem mais devagar).",
      "pointerleave zera; toque e reduced motion ficam parados.",
    ],
    care: [
      "Fatores grandes fazem a camada sair do container: reserve padding.",
      "Não coloque listener em window para um efeito local.",
      "Texto longo tremendo é ilegível: paralaxe só em elementos gráficos.",
    ],
    perf: "Só transform em poucas camadas, um listener. Um dos efeitos mais baratos por impacto.",
  },
  {
    slug: "marquee",
    code: "E3",
    name: "Marquee infinito",
    category: "estetica",
    cost: "leve",
    deps: [],
    summary: "Faixa contínua com linha duplicada, pausa no hover e versão estática.",
    prompt:
      "Faça um marquee infinito em CSS: uma faixa com o conteúdo duplicado (a segunda cópia com aria-hidden) animando translateX de 0 a -50% em keyframes lineares de 38s. Pause com animation-play-state no hover e no focus-within, aplique mask-image nas bordas para o fade e use will-change: transform só na faixa. Em prefers-reduced-motion, remova a animação e mostre a lista estática quebrada em linhas. Sem JavaScript e sem medir largura.",
    onHome: true,
    what:
      "Uma faixa que desliza para sempre. Como a linha é duplicada e a animação anda exatamente metade, o loop não tem emenda.",
    when:
      "Idiomas, parceiros, logos, listas de tags. Conteúdo que não precisa ser lido com pressa.",
    how: [
      "Duas cópias idênticas dentro de um flex com width: max-content.",
      "@keyframes translateX(0 → -50%) em 38s linear infinite.",
      "animation-play-state: paused no hover/focus-within.",
      "mask-image com gradiente transparente nas pontas.",
    ],
    care: [
      "Marquee é péssimo para conteúdo essencial: nunca coloque preço ou aviso ali.",
      "A segunda cópia precisa de aria-hidden para o leitor de tela não ler duas vezes.",
      "Sem reduced motion, é um movimento infinito na tela — obrigatório desligar.",
    ],
    perf: "Zero JS. Uma camada em transform, pausada quando o usuário quer ler.",
  },
  {
    slug: "flip-card",
    code: "E4",
    name: "Flip card",
    category: "interacao",
    cost: "leve",
    deps: [],
    summary: "Card que gira em rotateY e mostra o verso, com faces escondidas.",
    prompt:
      "Crie um flip card acessível: container com perspective, inner com preserve-3d e rotateY(180deg) na transição, duas faces absolutas com backface-visibility: hidden. O controle é um <button aria-pressed> que também funciona por teclado, e o verso fica com aria-hidden quando não está visível. Transição só de transform, 0.7s com easing suave; em prefers-reduced-motion, troque as faces por opacity instantânea.",
    what:
      "Um card com frente e verso no mesmo espaço. O giro em Y com backface-visibility cria a ilusão de um objeto físico.",
    when:
      "Flashcards, detalhes sob demanda, comparações rápidas. Bom quando o verso é opcional.",
    how: [
      "perspective no pai, preserve-3d no inner, rotateY(180deg) no verso.",
      "Faces absolutas com backface-visibility: hidden.",
      "Botão real com aria-pressed controlando o estado.",
      "Altura fixa por aspect-ratio para não saltar entre as faces.",
    ],
    care: [
      "Conteúdo essencial não pode ficar escondido no verso sem controle por teclado.",
      "backface-visibility falha em alguns navegadores se houver filter no ancestral.",
      "Não use flip para texto longo: a altura precisa ser igual nos dois lados.",
    ],
    perf: "CSS puro, uma transição de transform por clique.",
  },
  {
    slug: "count-up",
    code: "E5",
    name: "Count-up",
    category: "interacao",
    cost: "leve",
    deps: ["gsap", "ScrollTrigger"],
    summary: "Números que sobem do zero ao valor final uma vez, formatados em pt-BR.",
    prompt:
      "Faça count-up com GSAP: gsap.to(obj, { v: valor, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger, start: 'top 92%', once: true }, onUpdate }) escrevendo Math.round(obj.v).toLocaleString('pt-BR') no textContent do nó (sem setState por frame). Crie dentro de gsap.context com ctx.revert() no cleanup. O valor final precisa estar no HTML desde o servidor para funcionar sem JS e para leitores de tela; com prefers-reduced-motion, mantenha o valor final sem animar.",
    onHome: true,
    what:
      "O número conta do zero até o valor real quando entra na tela. Dá peso a uma estatística sem exigir interação.",
    when:
      "Blocos de números, provas sociais, métricas de produto. Três ou quatro valores, não vinte.",
    how: [
      "gsap.to({ v: 0 }, { v: alvo, onUpdate }) dentro de gsap.context.",
      "scrollTrigger: { start: 'top 92%', once: true }.",
      "Escreva no textContent em vez de setState a cada frame.",
      "toLocaleString('pt-BR') para separador de milhar correto.",
    ],
    care: [
      "O HTML inicial precisa ter o número final (SEO, sem JS e leitor de tela).",
      "aria-live em contador que atualiza 60 vezes por segundo é agressivo: deixe o valor estático para o leitor.",
      "Nunca invente precisão: arredonde coerentemente com o dado.",
    ],
    perf: "Uma tween por número, escrita direta no DOM. Sem re-render do React por frame.",
  },
  {
    slug: "anel-progresso",
    code: "E6",
    name: "Anel de progresso",
    category: "estetica",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "SVG com pathLength animado, rótulo no centro e estado acessível.",
    prompt:
      "Crie um anel de progresso em SVG com Framer Motion: círculo de trilha e círculo de valor com pathLength animado de 0 até valor/100, strokeLinecap round e transform rotate(-90deg) para começar no topo. Anime pathLength (não stroke-dashoffset calculado na mão) e mantenha o número central em texto real. Use role=\"progressbar\" com aria-valuenow/min/max e label. Em prefers-reduced-motion, mostre o valor final sem animação.",
    what:
      "Um círculo que se preenche até a porcentagem desejada. Lê mais rápido que uma barra quando o espaço é quadrado.",
    when:
      "Metas, conclusão de perfil, uso de plano, notas de desempenho. Um por card.",
    how: [
      "Dois <circle>: trilha em cor neutra e valor em cor de acento.",
      "motion.circle com initial={{ pathLength: 0 }} e animate={{ pathLength: valor / 100 }}.",
      "rotate(-90deg) no grupo para o início ficar em cima.",
      "role=progressbar + aria-valuenow para leitores de tela.",
    ],
    care: [
      "pathLength é animação de geometria SVG: use em poucos elementos, não em listas grandes.",
      "Contraste da trilha importa: cinza muito claro desaparece no fundo branco.",
      "Não coloque só a cor para diferenciar dois anéis: rótulo direto resolve.",
    ],
    perf: "SVG pequeno, uma animação por anel. Custo baixo, mas evite dezenas ao mesmo tempo.",
  },
  {
    slug: "confetti",
    code: "E7",
    name: "Confetti no clique",
    category: "interacao",
    cost: "leve",
    deps: [],
    summary: "Partículas com Web Animations API, sem biblioteca e com autolimpeza.",
    prompt:
      "Faça confetti no clique com a Web Animations API: crie N partículas position: fixed no ponto do clique, cada uma com element.animate([{ transform: translate(0,0) rotate(0), opacity: 1 }, { transform: translate(dx, dy) rotate(deg), opacity: 0 }], { duration, easing: 'cubic-bezier(0.22,1,0.36,1)' }) e remova o nó no onfinish. Use cores da paleta, limite a ~28 partículas, cancele animações pendentes no unmount e não crie nada com prefers-reduced-motion (mostre um feedback estático no lugar). Sem biblioteca externa.",
    what:
      "Uma explosão curta de partículas coloridas no ponto do clique. Celebra uma ação concluída sem precisar de modal.",
    when:
      "Concluir tarefa, copiar prompt, salvar algo. Uma vez por ação — repetido perde o sentido.",
    how: [
      "Criar spans fixed no clique, com cores da paleta e tamanhos variados.",
      "element.animate(...) com trajetória em transform e fade em opacity.",
      "onfinish → element.remove(); array de animações cancelado no unmount.",
      "Máximo de 28 partículas e duração de 900ms.",
    ],
    care: [
      "Sem reduced motion, nada de partículas: use um check estático.",
      "Não deixe nós órfãos no body: remova sempre no onfinish.",
      "pointer-events: none nas partículas para não bloquear o próximo clique.",
    ],
    perf: "WAAPI roda no compositor e não precisa de React. Zero kB de dependência.",
  },
  {
    slug: "acordeao",
    code: "E8",
    name: "Acordeão de altura",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "height 0 → auto com AnimatePresence, botão semântico e foco preservado.",
    prompt:
      "Faça um acordeão com Framer Motion: botão real com aria-expanded e aria-controls, painel em AnimatePresence com initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} e overflow hidden. Essa é a exceção aceita à regra de animar só transform/opacity: a transição é curta (0.35s) e dispara só no clique. Mantenha o conteúdo no DOM quando aberto para busca e leitores de tela, e com prefers-reduced-motion abra instantaneamente.",
    what:
      "Um painel que cresce do zero até a altura do conteúdo. A única forma honesta de esconder detalhe sem tirar o conteúdo da página.",
    when:
      "FAQ, detalhes técnicos, fichas longas. Quando a leitura linear ficaria maior que a tela.",
    how: [
      "AnimatePresence + motion.div com height: 0 → 'auto'.",
      "overflow: hidden no painel para o conteúdo não vazar durante a transição.",
      "aria-expanded no botão e aria-controls apontando para o painel.",
      "Duração curta (0.35s) e easing compartilhado.",
    ],
    care: [
      "Animar height causa layout: mantenha curto e só sob interação, nunca em loop.",
      "Não use display: none no conteúdo fechado se ele precisa ser encontrado pela busca da página.",
      "Um painel aberto por vez evita salto grande de layout.",
    ],
    perf: "Layout pontual no clique. Aceitável exatamente porque não é loop.",
  },
  {
    slug: "pulso",
    code: "E9",
    name: "Pulso / ping",
    category: "estetica",
    cost: "leve",
    deps: [],
    summary: "Anel que expande e desaparece para sinalizar algo vivo.",
    prompt:
      "Crie um indicador de pulso com um anel absoluto animando scale(0.85) → scale(1.9) e opacity 0.7 → 0 em loop de 2.4s, mais um ponto central sólido. Use só transform/opacity, aria-hidden no anel decorativo e um rótulo textual real para o estado (ex.: 'ao vivo'). Em prefers-reduced-motion, congele o anel e mantenha o ponto e o rótulo. Não use o pulso em mais de um ou dois pontos da tela.",
    what:
      "Um anel que nasce do ponto central, cresce e desaparece. Sinaliza atividade sem precisar de texto piscando.",
    when:
      "Status ao vivo, notificação nova, ponto de interesse em um mapa. Sempre acompanhado de rótulo.",
    how: [
      "Ponto central sólido + anel absoluto com o mesmo raio.",
      "Keyframes de scale e opacity, 2.4s, easing de saída.",
      "aria-hidden no anel; o estado vai em texto para o leitor de tela.",
      "Duas instâncias com delay diferente quando há um par de indicadores.",
    ],
    care: [
      "Loop infinito chama atenção para sempre: use onde o estado é realmente temporário.",
      "Nunca seja o único sinal do estado — cor e movimento não bastam.",
      "Desligar em reduced motion é obrigatório.",
    ],
    perf: "Duas propriedades de compositor em um nó pequeno. Praticamente grátis.",
  },
  {
    slug: "shake",
    code: "E10",
    name: "Shake de erro",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Tremor curto em x para erro de formulário, com mensagem acessível.",
    prompt:
      "Faça um shake de erro com Framer Motion: animate={{ x: [0, -8, 8, -6, 6, 0] }} em 0.4s disparado por um contador de tentativas, junto com borda em cor de erro, aria-invalid no campo e mensagem em role=\"alert\". O movimento nunca é o único sinal do erro. Use useReducedMotion() para pular o tremor e manter borda e mensagem, e não coloque o shake em loop.",
    what:
      "Um deslocamento rápido para os lados, como um 'não' com a cabeça. Comunica erro em 400ms.",
    when:
      "Validação de formulário, código incorreto, ação bloqueada. Uma vez por tentativa.",
    how: [
      "Keyframes em x: [0, -8, 8, -6, 6, 0], duration 0.4.",
      "Disparo por mudança de um contador, não por estado booleano preso.",
      "aria-invalid + mensagem em role=alert junto do movimento.",
      "Borda e ícone em cor de erro para quem não vê o movimento.",
    ],
    care: [
      "Shake sem mensagem é inútil para leitor de tela.",
      "Repetir a cada tecla irrita: dispare só no submit.",
      "Amplitude acima de 10px parece quebra de layout.",
    ],
    perf: "Uma tween curta por tentativa. Nenhum custo persistente.",
  },
  {
    slug: "hover-lift",
    code: "E11",
    name: "Hover lift",
    category: "interacao",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Card sobe 4px e ganha sombra — o feedback de clicável mais barato.",
    prompt:
      "Aplique hover lift com whileHover={{ y: -4 }} e uma sombra que muda por transição de opacity em uma camada pseudo-elemento (evite animar box-shadow direto). Use transition de 0.4s com cubic-bezier(0.22,1,0.36,1), whileTap={{ y: -1, scale: 0.995 }} e cursor pointer apenas em elementos realmente clicáveis. Em toque, não há hover; em prefers-reduced-motion, mantenha só a mudança de sombra.",
    what:
      "O card sobe alguns pixels e a sombra se alonga, como se saísse da página. É o sinal de 'isto é clicável'.",
    when:
      "Qualquer card clicável. É o feedback padrão que faz uma grade parecer viva sem custar nada.",
    how: [
      "whileHover={{ y: -4 }} com easing compartilhado.",
      "Sombra em camada separada com opacity 0 → 1 (box-shadow não é compositor).",
      "whileTap para o retorno no clique.",
      "Foco por teclado precisa do mesmo feedback que o hover.",
    ],
    care: [
      "Animar box-shadow direto causa repaint: use uma camada com opacity.",
      "Não aplique em elemento não clicável — promete uma interação que não existe.",
      "4px é suficiente; 12px parece que o card soltou da grade.",
    ],
    perf: "Transform + opacity em dois nós. O efeito mais barato do catálogo.",
  },
  {
    slug: "mascara-linha",
    code: "E12",
    name: "Texto com máscara por linha",
    category: "estetica",
    cost: "leve",
    deps: ["framer-motion"],
    summary: "Cada linha sobe por trás de um recorte, como texto revelado à mão.",
    prompt:
      "Faça texto com máscara por linha: cada linha em um wrapper com overflow: hidden e o filho animando y de '100%' a 0 com stagger de 0.12s e easing cubic-bezier(0.22,1,0.36,1). Quebre as linhas manualmente no conteúdo (array de strings) para não depender de medição de layout, dê padding-bottom ao wrapper para não cortar descendentes e use useReducedMotion() para mostrar tudo imediato. Mantenha o texto completo no HTML para SEO e leitores de tela.",
    what:
      "Parecido com kinetic typography, mas o recorte é por linha inteira, não por palavra. Dá um ritmo mais editorial e calmo.",
    when:
      "Manifestos, citações, blocos de texto curto em seção escura. Onde a leitura deve ser guiada.",
    how: [
      "Array de linhas no topo do arquivo — sem medir DOM.",
      "Wrapper overflow: hidden por linha, filho com y: '100%' → 0.",
      "whileInView com once: true e stagger de 0.12s.",
      "padding-bottom no wrapper para g/p/q não serem cortados.",
    ],
    care: [
      "Quebra manual precisa de revisão em 390px: linhas longas quebram em duas e o recorte corta.",
      "Não use em parágrafo longo: o efeito perde sentido e atrasa a leitura.",
      "Sem JS, o texto precisa estar visível.",
    ],
    perf: "Transform/opacity em poucos nós. Nenhum listener, nenhuma medição.",
  },
];

export const bySlug = (slug: string): Effect | undefined =>
  EFFECTS.find((effect) => effect.slug === slug);

export const homeEffects = (): Effect[] => EFFECTS.filter((effect) => effect.onHome);

export const neighbours = (slug: string): { prev: Effect; next: Effect } => {
  const index = EFFECTS.findIndex((effect) => effect.slug === slug);
  const safe = index < 0 ? 0 : index;
  const prev = EFFECTS[(safe - 1 + EFFECTS.length) % EFFECTS.length] as Effect;
  const next = EFFECTS[(safe + 1) % EFFECTS.length] as Effect;
  return { prev, next };
};

export const CATEGORIES: EffectCategory[] = ["scroll", "3d", "estetica", "interacao"];
export const COSTS: EffectCost[] = ["leve", "medio", "pesado"];
