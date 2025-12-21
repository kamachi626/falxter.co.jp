import { siteConfig } from '../site.config';

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteConfig.domain}/sitemap-index.xml\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
