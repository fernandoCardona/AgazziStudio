export async function get() {
  return {
    body: `
        User-agent: *
        Allow: /

        # Sitemap
        Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
    `.trim()
  };
}