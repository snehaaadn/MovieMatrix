export async function fetchVibeMovies(query, page = 1) {
  const response = await fetch('/api/vibe-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, page }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Vibe search failed');
  }

  return data;
}
