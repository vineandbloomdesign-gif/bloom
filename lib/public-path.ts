/**
 * Public files live at the site root locally (`/images/...`).
 * GitHub Pages serves this project under `/bloom`, and `next/image`
 * with `unoptimized` does not add that prefix. Read the base path
 * Next already inlines for the router.
 */
export function publicPath(path: string) {
  const base = process.env.__NEXT_ROUTER_BASEPATH || ""
  if (!path.startsWith("/") || path.startsWith("//")) return path
  if (!base || path === base || path.startsWith(`${base}/`)) return path
  return `${base}${path}`
}
