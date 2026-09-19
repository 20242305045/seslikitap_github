import React from 'react';
import { Play, RotateCcw, Clock, Sparkles, X } from 'lucide-react';
import { LibraryItem, Chapter, SavedProgress, AppLanguage } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';

interface ResumeBannerProps {
  savedProgress: SavedProgress | null;
  libraryItems: LibraryItem[];
  language?: AppLanguage;
  onResume: (itemId: string, chapterId: string, seconds: number) => void;
  onRestart: (itemId: string, chapterId: string) => void;
  onDismiss: () => void;
  onOpenRecap?: (item: LibraryItem, chapter: Chapter) => void;
}

export const ResumeBanner: React.FC<ResumeBannerProps> = ({
  savedProgress,
  libraryItems,
  language = 'tr',
  onResume,
  onRestart,
  onDismiss,
  onOpenRecap,
}) => {
  if (!savedProgress) return null;

  const t = TRANSLATIONS[language];
  const item = libraryItems.find((i) => i.id === savedProgress.itemId);
  if (!item) return null;

  const chapter = item.chapters.find((c) => c.id === savedProgress.chapterId) || item.chapters[0];
  const remainingSecs = Math.max(0, (savedProgress.durationSeconds || chapter.durationSeconds) - savedProgress.progressSeconds);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 border border-amber-500/30 shadow-xl shadow-amber-950/20 p-4 sm:p-5 mb-8">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left info: Cover image + Details */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md border border-neutral-700">
            <img 
              src={item.coverImage} 
              alt={item.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 py-0.5 rounded bg-amber-500 text-neutral-950">
              %{Math.round(savedProgress.percentage)}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/25">
                <Sparkles className="w-3 h-3" /> {t.resumeTitle}
              </span>
              <span className="text-[11px] text-neutral-400">
                {item.type === 'podcast' ? t.podcast : t.audiobook}
              </span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 mt-1 line-clamp-1">
              {item.title}
            </h3>

            <p className="text-xs text-neutral-300 line-clamp-1">
              {chapter.title} • <span className="text-neutral-400">{item.authorOrHost}</span>
            </p>

            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {t.resumeCurrentPoint}: <strong className="text-neutral-200">{formatTime(savedProgress.progressSeconds)}</strong>
              </span>
              <span>•</span>
              <span>{t.remainingTime}: ~{formatTime(remainingSecs)}</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-end">
          {onOpenRecap && (
            <button
              onClick={() => onOpenRecap(item, chapter)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 transition-colors shadow-sm"
              title={t.recapMode}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.recapMode}</span>
            </button>
          )}

          <button
            onClick={() => onRestart(item.id, chapter.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 transition-colors"
            title={t.restartFromBeginning}
          >
            <RotateCcw className="w-3.5 h-3.5" /> {t.restartFromBeginning}
          </button>

          <button
            onClick={() => onResume(item.id, chapter.id, savedProgress.progressSeconds)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-102"
          >
            <Play className="w-4 h-4 fill-current" />
            {t.resumeListen}
          </button>

          <button
            onClick={onDismiss}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title={t.dismiss}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mini Progress Bar */}
      <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(1, savedProgress.percentage))}%` }}
        />
      </div>
    </div>
  );
};
