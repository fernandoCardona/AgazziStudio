export async function GET() {
  return new Response(`User-agent: *
Allow: /
Sitemap: https://agazzistudio.com/sitemap-index.xml`, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}