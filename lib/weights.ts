import report from "./build-report.json";

export type RouteWeight = { firstLoad: string; kb: number };
export type BuildReport = {
  next: string;
  generatedAt: string;
  shared: string;
  routes: Record<string, RouteWeight>;
};

/**
 * Peso real de First Load JS por rota, coletado do output de `next build`
 * por scripts/collect-weights.mjs. É o número que aparece nos cards e nas fichas.
 */
export const BUILD_REPORT = report as BuildReport;

export const routeWeight = (route: string): RouteWeight | undefined =>
  BUILD_REPORT.routes[route];

export const effectWeight = (slug: string): RouteWeight | undefined =>
  routeWeight(`/lab/${slug}`);
