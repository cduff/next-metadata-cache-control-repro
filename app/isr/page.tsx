// Comparison: an ISR page with the same revalidate window.
export const revalidate = 3600;

export default function Page() {
  return <p>Rendered at {new Date().toISOString()}</p>;
}
