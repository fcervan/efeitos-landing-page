/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },

  // GitHub Pages serve apenas arquivos estáticos: export gera `out/`.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Em project pages (usuario.github.io/repo) o site vive sob um subcaminho.
  // Vazio em dev/local e em domínio próprio.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  experimental: {
    // Tree-shaking agressivo das libs de animação/3D: cada rota só paga o que usa.
    optimizePackageImports: ["framer-motion", "gsap", "lenis", "@react-three/drei"],
  },
};

export default nextConfig;
