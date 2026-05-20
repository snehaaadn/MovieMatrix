const TMDB_GENRES = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

const VIBE_SYSTEM_PROMPT = `You are a movie recommendation expert for MovieMatrix. Given a user's natural-language "vibe" description, translate it into TMDB discover API parameters.

Available TMDB genre IDs:
${Object.entries(TMDB_GENRES)
  .map(([name, id]) => `- ${name}: ${id}`)
  .join('\n')}

Respond with ONLY valid JSON (no markdown) in this exact shape:
{
  "with_genres": "comma-separated genre IDs or empty string",
  "primary_release_date.gte": "YYYY-MM-DD or empty string",
  "primary_release_date.lte": "YYYY-MM-DD or empty string",
  "sort_by": "popularity.desc | vote_average.desc | release_date.desc | revenue.desc",
  "vote_average.gte": "number as string e.g. 6.5 or empty string",
  "with_original_language": "en | ko | ja | etc or empty string",
  "explanation": "One friendly sentence explaining what vibe you matched (max 120 chars)"
}

Rules:
- Map moods to appropriate genres (e.g. cozy → Family,Romance; scary → Horror,Thriller; epic → Adventure,Fantasy)
- Use date ranges for era references (90s → 1990-01-01 to 1999-12-31)
- Prefer vote_average.desc for quality-focused vibes, popularity.desc for mainstream vibes
- Keep explanation warm and specific to the user's vibe`;

const DEMO_VIBE_MAP = [
  {
    keywords: ['cozy', 'rainy', 'comfort', 'warm', 'feel-good', 'wholesome'],
    params: {
      with_genres: '10749,35,10751',
      sort_by: 'vote_average.desc',
      'vote_average.gte': '7',
      explanation: 'Cozy feel-good films with heart — rom-coms, warm comedies, and family favorites.',
    },
  },
  {
    keywords: ['mind', 'bending', 'twist', 'psychological', 'surreal', 'confusing'],
    params: {
      with_genres: '878,9648,53',
      sort_by: 'vote_average.desc',
      'vote_average.gte': '7.5',
      explanation: 'Mind-bending sci-fi mysteries with layers — think Inception, not jump scares.',
    },
  },
  {
    keywords: ['scary', 'horror', 'creepy', 'terrifying', 'nightmare', 'haunted'],
    params: {
      with_genres: '27,53',
      sort_by: 'popularity.desc',
      explanation: 'Spine-chilling horror and suspense — the kind that keeps the lights on.',
    },
  },
  {
    keywords: ['90s', 'nineties', 'retro', 'nostalgic', 'classic'],
    params: {
      with_genres: '35,18,28',
      'primary_release_date.gte': '1990-01-01',
      'primary_release_date.lte': '1999-12-31',
      sort_by: 'popularity.desc',
      explanation: '90s nostalgia — blockbusters, cult classics, and the films that defined a decade.',
    },
  },
  {
    keywords: ['epic', 'adventure', 'quest', 'hero', 'battle', 'sword'],
    params: {
      with_genres: '12,14,36',
      sort_by: 'popularity.desc',
      explanation: 'Epic adventures and grand journeys — heroes, battles, and worlds to get lost in.',
    },
  },
  {
    keywords: ['noir', 'dark', 'detective', 'mystery', 'gritty', 'crime'],
    params: {
      with_genres: '80,9648,53',
      sort_by: 'vote_average.desc',
      'vote_average.gte': '7',
      explanation: 'Dark noir and crime thrillers — shadows, detectives, and moral gray zones.',
    },
  },
];

function parseDemoVibe(query) {
  const lower = query.toLowerCase();
  for (const entry of DEMO_VIBE_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { ...entry.params, source: 'demo' };
    }
  }
  return {
    with_genres: '18,53',
    sort_by: 'vote_average.desc',
    'vote_average.gte': '7',
    explanation: 'Curated dramas and thrillers matching your mood — refined picks with strong ratings.',
    source: 'demo',
  };
}

async function parseVibeWithOpenAI(query, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: VIBE_SYSTEM_PROMPT },
        { role: 'user', content: query },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI API error (${response.status})`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  const parsed = JSON.parse(content);
  return { ...parsed, source: 'openai' };
}

function buildDiscoverUrl(params, page, apiKey, baseUrl) {
  const url = new URL(`${baseUrl}/discover/movie`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('page', String(page));
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('include_video', 'false');

  const allowed = [
    'with_genres',
    'primary_release_date.gte',
    'primary_release_date.lte',
    'sort_by',
    'vote_average.gte',
    'vote_average.lte',
    'with_original_language',
    'with_keywords',
    'without_genres',
  ];

  for (const key of allowed) {
    const value = params[key];
    if (value && String(value).trim()) {
      url.searchParams.set(key, String(value).trim());
    }
  }

  if (!url.searchParams.has('sort_by')) {
    url.searchParams.set('sort_by', 'popularity.desc');
  }

  return url.toString();
}

export async function searchMoviesByVibe({ query, page = 1, env = process.env }) {
  const trimmed = query?.trim();
  if (!trimmed) {
    throw new Error('Vibe query is required');
  }

  const tmdbKey = env.VITE_TMDB_API_KEY || env.TMDB_API_KEY;
  const tmdbBase = env.VITE_TMDB_API_BASE_URL || env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
  const openaiKey = env.OPENAI_API_KEY;

  if (!tmdbKey || tmdbKey === 'YOUR_TMDB_API_KEY' || tmdbKey === 'YOUR_TMDB_API_KEY_HERE') {
    throw new Error('TMDB API key is not configured');
  }

  let vibeParams;
  if (openaiKey && openaiKey !== 'YOUR_OPENAI_API_KEY') {
    vibeParams = await parseVibeWithOpenAI(trimmed, openaiKey);
  } else {
    vibeParams = parseDemoVibe(trimmed);
  }

  const endpoint = buildDiscoverUrl(vibeParams, page, tmdbKey, tmdbBase);
  let tmdbResponse;
  try {
    tmdbResponse = await fetch(endpoint);
  } catch (networkErr) {
    throw new Error(
      'Could not reach TMDB. Check your internet connection and try again. If browsing works but Vibe Search fails, restart the dev server after updating .env.'
    );
  }

  if (!tmdbResponse.ok) {
    if (tmdbResponse.status === 401) throw new Error('Invalid TMDB API key — use the v3 API Key from TMDB settings (not the v4 Read Access Token).');
    throw new Error('Failed to fetch movies from TMDB');
  }

  const data = await tmdbResponse.json();
  const movies = (data.results || []).filter((m) => m.poster_path);

  return {
    movies,
    totalPages: data.total_pages || 1,
    totalResults: data.total_results || 0,
    explanation: vibeParams.explanation || 'Movies matched to your vibe.',
    source: vibeParams.source,
    vibeQuery: trimmed,
  };
}

export async function handleVibeSearchRequest(body, env = process.env) {
  const { query, page = 1 } = typeof body === 'string' ? JSON.parse(body) : body;
  return searchMoviesByVibe({ query, page, env });
}
