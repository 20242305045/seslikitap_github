import React, { useState } from 'react';
import { LibraryItem, Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { formatTime } from '../utils/audioEngine';
import { 
  Search, 
  Sparkles, 
  Play, 
  Clock, 
  X, 
  ArrowRight,
  Compass
} from 'lucide-react';

interface SemanticSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem | null;
  chapter: Chapter | null;
  language: AppLanguage;
  onSeekTo: (seconds: number) => void;
}

interface SearchMatch {
  timestampSeconds: number;
  timestampFormatted: string;
  snippet: string;
  relevance: string;
}

export const SemanticSearchModal: React.FC<SemanticSearchModalProps> = ({
  isOpen,
  onClose,
  item,
  chapter,
  language,
  onSeekTo,
}) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchMatch[] | null>(null);

  if (!isOpen || !chapter || !item) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/antigravity/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          chapterTitle: chapter.title,
          itemTitle: item.title,
          script: chapter.script,
          language,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResults(data.matches || []);
      }
    } catch (err) {
      console.error('Semantic search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-neutral-950 shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {t.semanticSearch}
                </span>
              </div>
              <h2 className="text-base font-bold text-neutral-100 mt-0.5">
                {t.searchInChapter}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="p-5 border-b border-neutral-800/80 bg-neutral-950/40">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchSemanticPlaceholder}
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/80"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              {loading ? (
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>{language === 'en' ? 'Search' : 'Ara'}</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2 px-1">
            {language === 'en'
              ? 'AI interprets conceptual meaning even if verbatim words differ.'
              : 'Yapay zekâ, aynı kelimeleri kullanmasanız bile anlam ve tema benzerliğini analiz eder.'}
          </p>
        </form>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {loading ? (
            <div className="py-16 text-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-2" />
              <p className="text-xs text-neutral-400">
                {language === 'en' ? 'Scanning chapter script semantically...' : 'Bölüm metni anlamsal olarak taranıyor...'}
              </p>
            </div>
          ) : results === null ? (
            <div className="py-12 text-center text-neutral-500 text-xs">
              {language === 'en' 
                ? 'Type a topic, question, or phrase to find exact timestamps.' 
                : 'Zaman damgalarını bulmak için bir konu, soru veya cümle yazıp arayın.'}
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs">
              {t.noSearchResults}
            </div>
          ) : (
            results.map((match, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSeekTo(match.timestampSeconds);
                  onClose();
                }}
                className="group cursor-pointer p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-800/60 transition-all duration-200 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 flex items-center gap-1.5 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                    <Play className="w-3 h-3 fill-current" />
                    {match.timestampFormatted}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-medium">
                    {match.relevance}
                  </span>
                </div>

                <p className="text-xs text-neutral-200 font-serif leading-relaxed italic">
                  "{match.snippet}"
                </p>

                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-end text-[11px] text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span className="flex items-center gap-1 font-semibold">
                    {t.jumpToMatch}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
