// Comparison: a cached Route Handler with the same revalidate window.
export const revalidate = 3600;

export function GET() {
  return new Response(`Rendered at ${new Date().toISOString()}`);
}
