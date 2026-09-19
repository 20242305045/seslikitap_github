import React from 'react';
import { Play, Star, Clock, Sparkles, BookOpen, Radio, ListMusic, Bookmark, Heart, Trash2 } from 'lucide-react';
import { LibraryItem, SavedProgress, AppLanguage } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';

interface LibraryItemCardProps {
  item: LibraryItem;
  savedProgress?: SavedProgress;
  isCurrentlyPlaying: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (itemId: string) => void;
  language?: AppLanguage;
  onPlay: (item: LibraryItem) => void;
  onSelectChapters: (item: LibraryItem) => void;
  onOpenNotes: (item: LibraryItem) => void;
  onDeleteItem?: (itemId: string) => void;
}

export const LibraryItemCard: React.FC<LibraryItemCardProps> = ({
  item,
  savedProgress,
  isCurrentlyPlaying,
  isFavorite = false,
  onToggleFavorite,
  language = 'tr',
  onPlay,
  onSelectChapters,
  onOpenNotes,
  onDeleteItem,
}) => {
  const hasProgress = Boolean(savedProgress && savedProgress.percentage > 2);
  const t = TRANSLATIONS[language];

  return (
    <div 
      className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 border ${
        isCurrentlyPlaying
          ? 'border-amber-500/80 bg-neutral-900/90 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
          : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-850 shadow-lg'
      }`}
    >
      <div>
        {/* Cover Art Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
          <img 
            src={item.coverImage} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

          {/* Type Badge & New Episode Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
              {item.type === 'podcast' ? (
                <>
                  <Radio className="w-3 h-3 text-amber-400" /> {t.podcast}
                </>
              ) : (
                <>
                  <BookOpen className="w-3 h-3 text-amber-400" /> {t.audiobook}
                </>
              )}
            </span>

            {item.isCustom && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> {language === 'en' ? 'Custom' : 'Koleksiyonum'}
              </span>
            )}

            {item.isNewEpisodeAvailable && (
              <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md animate-pulse">
                <Sparkles className="w-2.5 h-2.5" /> {t.newEpisodeBadge}
              </span>
            )}
          </div>

          {/* Top Right Controls: Rating & Favorite & Delete if custom */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {item.isCustom && onDeleteItem && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-950/80 text-neutral-400 hover:text-rose-400 border border-neutral-700/60 transition-colors"
                title={language === 'en' ? 'Remove from library' : 'Kütüphaneden sil'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            {onToggleFavorite && (
              <button
                id={`card-favorite-btn-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/30 text-rose-400 border border-rose-500/50 shadow-md shadow-rose-500/20'
                    : 'bg-black/60 text-neutral-400 hover:text-rose-400 border border-neutral-700/60'
                }`}
                title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            )}

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold text-neutral-200 border border-neutral-700/60">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{item.rating}</span>
            </div>
          </div>

          {/* Quick Play Floating Button on Hover */}
          <button
            onClick={() => onPlay(item)}
            className="absolute bottom-3 right-3 p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold shadow-xl shadow-amber-500/40 opacity-90 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all"
            title={hasProgress ? t.resumeListen : t.startListen}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        </div>

        {/* Progress bar if listened */}
        {hasProgress && savedProgress && (
          <div className="w-full bg-neutral-800 h-1.5 relative overflow-hidden">
            <div 
              className="bg-amber-400 h-full rounded-r-full"
              style={{ width: `${Math.min(100, Math.max(2, savedProgress.percentage))}%` }}
            />
          </div>
        )}

        {/* Details Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span>{item.category}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              {item.totalDurationFormatted}
            </span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
            {item.title}
          </h3>

          <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
            {item.authorOrHost}
          </p>

          {item.narrator && (
            <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
              {t.narrator}: {item.narrator}
            </p>
          )}

          <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
            {item.description}
          </p>

          {hasProgress && savedProgress && (
            <div className="mt-3 py-1 px-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between font-mono">
              <span>{t.resumeCurrentPoint}: {formatTime(savedProgress.progressSeconds)}</span>
              <span className="font-bold font-sans">%{Math.round(savedProgress.percentage)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2 border-t border-neutral-800/60 mt-auto">
        <button
          onClick={() => onSelectChapters(item)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 transition-colors"
        >
          <ListMusic className="w-3.5 h-3.5" />
          <span>{t.chaptersCount(item.chapters.length)}</span>
        </button>

        <button
          onClick={() => onOpenNotes(item)}
          className="p-2 rounded-xl text-neutral-400 hover:text-cyan-300 hover:bg-neutral-800 border border-neutral-800 transition-colors"
          title={t.notes}
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onPlay(item)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-sm"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{hasProgress ? t.continue : t.listen}</span>
        </button>
      </div>

    </div>
  );
};
