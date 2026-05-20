import { useState } from 'react';
import SparkleIcon from './icons/SparkleIcon';

const VIBE_SUGGESTIONS = [
  'cozy rainy night comfort watch',
  'mind-bending sci-fi with a twist',
  '90s nostalgic action blockbuster',
  'dark noir detective mystery',
  'epic fantasy adventure quest',
  'feel-good comedy that lifts my mood',
];

function VibeSearch({ onVibeSearch, loading, explanation, source, vibeQuery }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onVibeSearch(trimmed);
  };

  const handleSuggestion = (suggestion) => {
    setQuery(suggestion);
    onVibeSearch(suggestion);
  };

  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-2xl border border-[#c77dff]/30 bg-gradient-to-br from-[#240046]/10 via-white to-[#7b2cbf]/10 p-6 shadow-lg dark:from-[#240046]/40 dark:via-[#10002b] dark:to-[#5a189a]/20 dark:border-[#7b2cbf]/40">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#c77dff]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#5a189a]/20 blur-xl" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#5a189a]/15 px-3 py-1 text-sm font-semibold text-[#5a189a] dark:bg-[#c77dff]/20 dark:text-[#e0aaff]">
              <SparkleIcon className="h-4 w-4" />
              GenAI Vibe Search
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Describe a mood — AI finds matching films
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g. "slow-burn sci-fi that feels like a rainy Sunday" or "chaotic fun heist movie with great banter"'
              rows={3}
              className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#7b2cbf]/30 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder:text-gray-500"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {VIBE_SUGGESTIONS.slice(0, 4).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    disabled={loading}
                    className="rounded-full border border-[#7b2cbf]/30 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-[#7b2cbf] hover:bg-[#7b2cbf]/10 hover:text-[#5a189a] disabled:opacity-50 dark:border-[#c77dff]/30 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:text-[#e0aaff]"
                  >
                    {suggestion.length > 32 ? `${suggestion.slice(0, 32)}…` : suggestion}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5a189a] to-[#7b2cbf] px-6 py-2.5 font-semibold text-white shadow-md transition hover:from-[#7b2cbf] hover:to-[#9d4edd] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SparkleIcon className={`h-5 w-5 ${loading ? 'animate-pulse' : ''}`} />
                {loading ? 'Reading your vibe…' : 'Search by Vibe'}
              </button>
            </div>
          </form>

          {explanation && vibeQuery && (
            <div className="mt-4 animate-fade-in-up rounded-xl border border-[#7b2cbf]/20 bg-[#5a189a]/5 px-4 py-3 dark:bg-[#7b2cbf]/10">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-[#5a189a] dark:text-[#c77dff]">AI matched your vibe:</span>{' '}
                {explanation}
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Query: &ldquo;{vibeQuery}&rdquo;
                {source === 'openai' && ' · Powered by GPT-4o-mini'}
                {source === 'demo' && ' · Demo mode (add OPENAI_API_KEY for full GenAI)'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VibeSearch;
