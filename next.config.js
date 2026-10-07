/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages 404s /memorial/ unless the page is a directory index.
  trailingSlash: true,
}

module.exports = nextConfig
