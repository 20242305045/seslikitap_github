import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  BookOpen, 
  Radio, 
  Play, 
  Plus, 
  ExternalLink, 
  Loader2, 
  Star, 
  Zap, 
  Check, 
  ChevronDown, 
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { LibraryItem, AppLanguage, Chapter } from '../types';

interface DiscoveredItem {
  id: string;
  title: string;
  authorOrHost: string;
  type: 'audiobook' | 'podcast';
  category: string;
  description: string;
  rating: number;
  coverImage: string;
  estimatedDuration: string;
  totalDurationSeconds?: number;
  groundingSources?: Array<{ title: string; uri: string }>;
  suggestedChapters?: Array<{ number: number; title: string; summary: string }>;
}

interface GoogleAntigravitySearchDiscoveryProps {
  searchQuery: string;
  language: AppLanguage;
  activeTab: 'all' | 'audiobooks' | 'podcasts' | 'notes';
  onAddAndPlay: (item: LibraryItem) => void;
  onOpenBiteSummary: (item: LibraryItem) => void;
  existingLibrary: LibraryItem[];
}

export const GoogleAntigravitySearchDiscovery: React.FC<GoogleAntigravitySearchDiscoveryProps> = ({
  searchQuery,
  language,
  activeTab,
  onAddAndPlay,
  onOpenBiteSummary,
  existingLibrary,
}) => {
  const isEn = language === 'en';

  const [isLoading, setIsLoading] = useState(false);
  const [discoveries, setDiscoveries] = useState<DiscoveredItem[]>([]);
  const [webSources, setWebSources] = useState<Array<{ title: string; uri: string }>>([]);
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');

  // Debounced search trigger for queries with 2+ characters
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setDiscoveries([]);
      setWebSources([]);
      return;
    }

    const timer = setTimeout(() => {
      handleFetchDiscovery(q);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, language]);

  const handleFetchDiscovery = async (q: string) => {
    setIsLoading(true);
    setLastSearchedQuery(q);

    const typeParam = activeTab === 'audiobooks' ? 'audiobook' : activeTab === 'podcasts' ? 'podcast' : 'all';

    try {
      const res = await fetch('/api/antigravity/search-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          language,
          type: typeParam,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.discoveries)) {
        setDiscoveries(data.discoveries);
        setWebSources(data.sources || []);
      }
    } catch (err) {
      console.error('Failed to fetch Google Search discovery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDiscoveredItem = async (item: DiscoveredItem) => {
    setAddingItemId(item.id);
    try {
      // Call backend to synthesize real chapters & spoken script
      const res = await fetch('/api/antigravity/generate-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          authorOrHost: item.authorOrHost,
          type: item.type,
          category: item.category,
          language,
          coverImage: item.coverImage,
        }),
      });

      const data = await res.json();
      if (data.success && data.item) {
        setAddedIds(prev => [...prev, item.id]);
        onAddAndPlay(data.item);
      } else {
        // Direct conversion fallback
        const cleanId = `disc-${Date.now()}`;
        const chapters: Chapter[] = (item.suggestedChapters && item.suggestedChapters.length > 0)
          ? item.suggestedChapters.map((ch, idx) => ({
              id: `ch-${cleanId}-${idx + 1}`,
              number: ch.number || (idx + 1),
              title: ch.title,
              durationSeconds: 360,
              formattedDuration: '06:00',
              summary: ch.summary,
              script: isEn 
                ? `Welcome to "${item.title}". In this chapter, we explore ${ch.summary}. Listen with focus and reflect on these transformative ideas.`
                : `"${item.title}" sesli anlatımına hoş geldiniz. Bu bölümde ${ch.summary} konusunu ele alıyoruz. Dikkatinizi toplayın ve bu derin fikirlerin zihninizi aydınlatmasına izin verin.`,
            }))
          : [
              {
                id: `ch-${cleanId}-1`,
                number: 1,
                title: isEn ? 'Foundational Insights' : 'Bölüm 1: Temel İçgörüler ve Çıkış Noktası',
                durationSeconds: 360,
                formattedDuration: '06:00',
                summary: item.description,
                script: isEn 
                  ? `Welcome to "${item.title}". Every profound truth begins with questioning what we take for granted. Let us dive into this journey together.`
                  : `"${item.title}" sesli eserine hoş geldiniz. Büyük gerçekler, en bildiğimizi sandığımız şeyleri sorgulamakla başlar. Gelin bu aydınlatıcı yolculuğa birlikte çıkalım.`,
              }
            ];

        const libraryItem: LibraryItem = {
          id: cleanId,
          type: item.type,
          title: item.title,
          authorOrHost: item.authorOrHost,
          narrator: isEn ? 'Antigravity Vocal Master' : 'Antigravity Doğal Anlatıcı',
          category: item.category,
          coverImage: item.coverImage,
          gradient: item.type === 'podcast' ? 'from-indigo-600 to-cyan-600' : 'from-amber-600 to-indigo-700',
          rating: item.rating || 4.9,
          totalDurationFormatted: item.estimatedDuration || '30 dk',
          totalDurationSeconds: item.totalDurationSeconds || 1800,
          description: item.description,
          isCustom: true,
          chapters,
        };

        setAddedIds(prev => [...prev, item.id]);
        onAddAndPlay(libraryItem);
      }
    } catch (err) {
      console.error('Error adding discovered item:', err);
    } finally {
      setAddingItemId(null);
    }
  };

  if (!searchQuery.trim() || searchQuery.trim().length < 2) {
    return null;
  }

  return (
    <section className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-neutral-900/95 via-neutral-900/90 to-indigo-950/40 border border-amber-500/30 shadow-2xl shadow-amber-500/5 relative overflow-hidden animate-in fade-in duration-300">
      
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-neutral-950 shadow-md shadow-amber-500/20">
            <Globe className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span>{isEn ? 'Google & Antigravity Live Discovery' : 'Google & Antigravity Canlı Keşif'}</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Web Grounded</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {isEn
                ? `Real-time web search for "${searchQuery}" — click any item to add & listen immediately`
                : `"${searchQuery}" için Google Arama ile küresel veri tabanı taranıyor — tek tıkla kütüphanenize ekleyip dinleyin`}
            </p>
          </div>
        </div>

        {/* Refresh button */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{isEn ? 'Searching Google...' : 'Google taranıyor...'}</span>
            </div>
          ) : (
            <button
              onClick={() => handleFetchDiscovery(searchQuery.trim())}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 text-xs font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Refresh Search' : 'Yeniden Ara'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Google Web Citations / Sources */}
      {webSources.length > 0 && (
        <div className="mt-3 py-2 px-3 rounded-xl bg-neutral-950/40 border border-neutral-800/60 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 relative z-10">
          <span className="font-semibold text-neutral-300 flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{isEn ? 'Google Sources:' : 'Google Kaynakları:'}</span>
          </span>
          {webSources.slice(0, 3).map((s, idx) => (
            <a
              key={idx}
              href={s.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-cyan-300 hover:text-cyan-200 border border-neutral-700/40 transition-colors flex items-center gap-1 truncate max-w-xs"
              title={s.title}
            >
              <span className="truncate">{s.title}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>
          ))}
        </div>
      )}

      {/* Discovery Cards Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {isLoading && discoveries.length === 0 ? (
          <div className="col-span-full py-12 text-center text-neutral-400">
            <Loader2 className="w-8 h-8 mx-auto text-amber-400 animate-spin mb-3" />
            <p className="text-sm font-medium text-neutral-300">
              {isEn ? 'Antigravity & Google are gathering verified titles...' : 'Antigravity ve Google doğrulanmış eserleri topluyor...'}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {isEn ? 'Searching Google Books, Podcasts and Academic Archives' : 'Google Kitaplar, Podcastler ve Kültür Arşivleri taranıyor'}
            </p>
          </div>
        ) : discoveries.length === 0 ? (
          <div className="col-span-full py-8 text-center text-neutral-400">
            <p className="text-xs text-neutral-400">
              {isEn ? 'No external matches found. Try modifying your search keywords.' : 'Dış kaynaklarda eşleşme bulunamadı. Aramanızı farklı kelimelerle deneyebilirsiniz.'}
            </p>
          </div>
        ) : (
          discoveries.map((item) => {
            const isAlreadyAdded = addedIds.includes(item.id) || existingLibrary.some(
              (i) => i.title.toLowerCase().trim() === item.title.toLowerCase().trim()
            );
            const isAdding = addingItemId === item.id;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div>
                  {/* Top Item Row */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-md shrink-0 border border-neutral-700/60 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.type === 'podcast'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {item.type === 'podcast' ? <Radio className="w-2.5 h-2.5" /> : <BookOpen className="w-2.5 h-2.5" />}
                          <span>{item.type === 'podcast' ? 'Podcast' : (isEn ? 'Audiobook' : 'Sesli Kitap')}</span>
                        </span>

                        <span className="text-[10px] font-medium text-neutral-400 truncate">
                          {item.category}
                        </span>

                        <span className="ml-auto inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{item.rating.toFixed(1)}</span>
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 font-sans">
                        {item.authorOrHost}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        {item.estimatedDuration}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 mb-3 font-sans">
                    {item.description}
                  </p>

                  {/* Chapters accordion toggle */}
                  {item.suggestedChapters && item.suggestedChapters.length > 0 && (
                    <div className="mb-3">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-amber-300 transition-colors"
                      >
                        <span>{item.suggestedChapters.length} {isEn ? 'Chapters Outline' : 'Bölüm Taslağı'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-1.5 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs">
                          {item.suggestedChapters.map((ch, idx) => (
                            <div key={idx} className="pb-1.5 border-b border-neutral-800/60 last:border-none">
                              <span className="font-semibold text-neutral-200 block text-[11px]">
                                {ch.number}. {ch.title}
                              </span>
                              <span className="text-[10px] text-neutral-400 leading-relaxed block">
                                {ch.summary}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleAddDiscoveredItem(item)}
                    disabled={isAdding}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isAlreadyAdded
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{isEn ? 'Synthesizing...' : 'Sentezleniyor...'}</span>
                      </>
                    ) : isAlreadyAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Added • Listen Now' : 'Kütüphanede • Dinle'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Add to Library & Listen' : 'Kütüphaneme Ekle & Dinle'}</span>
                      </>
                    )}
                  </button>

                  {/* 3-minute essence button */}
                  <button
                    onClick={() => {
                      const tempItem: LibraryItem = {
                        id: item.id,
                        type: item.type,
                        title: item.title,
                        authorOrHost: item.authorOrHost,
                        category: item.category,
                        coverImage: item.coverImage,
                        gradient: 'from-amber-600 to-indigo-700',
                        rating: item.rating,
                        totalDurationFormatted: item.estimatedDuration,
                        totalDurationSeconds: 1800,
                        description: item.description,
                        chapters: [
                          {
                            id: `temp-${item.id}`,
                            number: 1,
                            title: item.title,
                            durationSeconds: 300,
                            formattedDuration: '05:00',
                            summary: item.description,
                            script: item.description,
                          }
                        ]
                      };
                      onOpenBiteSummary(tempItem);
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-neutral-700 transition-colors"
                    title={isEn ? 'Generate 3-minute Bite-Sized Summary' : '3 Dakikalık Hap Özet Çıkar'}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </section>
  );
};
