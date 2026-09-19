import React from 'react';
import { Play, Clock, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { LibraryItem, Chapter, SavedProgress, AppLanguage } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';

interface ChapterListModalProps {
  item: LibraryItem | null;
  currentChapterId?: string;
  savedProgress?: SavedProgress | null;
  language?: AppLanguage;
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapter: Chapter, resumeSeconds?: number) => void;
}

export const ChapterListModal: React.FC<ChapterListModalProps> = ({
  item,
  currentChapterId,
  savedProgress,
  language = 'tr',
  isOpen,
  onClose,
  onSelectChapter,
}) => {
  if (!isOpen || !item) return null;

  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="chapter-list-modal"
        className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-neutral-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="w-12 h-12 rounded-xl object-cover border border-neutral-700" 
            />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {item.type === 'podcast' ? t.podcastEpisodes : t.bookChapters}
              </span>
              <h3 className="font-serif text-base font-bold text-neutral-100 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400">
                {t.chaptersCount(item.chapters.length)} • {item.totalDurationFormatted}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters list */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-neutral-800/60">
          {item.chapters.map((ch) => {
            const isCurrent = ch.id === currentChapterId;
            const hasSavedSeconds = savedProgress && savedProgress.chapterId === ch.id && savedProgress.progressSeconds > 0;

            return (
              <div
                key={ch.id}
                className={`py-3.5 px-3 rounded-2xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-amber-500/10 border border-amber-500/30'
                    : 'hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      #{ch.number}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-100 truncate">
                      {ch.title}
                    </h4>
                    {ch.isNew && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {t.newBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {ch.summary}
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {ch.formattedDuration}
                    </span>
                    {hasSavedSeconds && (
                      <span className="text-amber-400 font-medium">
                        {t.resumeCurrentPoint}: {formatTime(savedProgress.progressSeconds)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {hasSavedSeconds && (
                    <button
                      onClick={() => {
                        onSelectChapter(ch, savedProgress.progressSeconds);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {t.resumeListen}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onSelectChapter(ch, 0);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 shrink-0 ${
                      isCurrent
                        ? 'bg-neutral-800 text-amber-300 border border-amber-500/40'
                        : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    <span>{hasSavedSeconds ? t.restartFromBeginning : t.listen}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
