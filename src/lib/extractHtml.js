export function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return match ? match[1] : html
}