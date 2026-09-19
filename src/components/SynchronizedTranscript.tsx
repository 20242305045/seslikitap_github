import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { formatTime } from '../utils/audioEngine';
import { Waves, Search, ArrowRight, Play, Check, Volume2 } from 'lucide-react';

interface SynchronizedTranscriptProps {
  chapter: Chapter | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  language: AppLanguage;
  onSeek: (seconds: number) => void;
}

interface TranscriptSentence {
  id: string;
  text: string;
  startSecond: number;
  endSecond: number;
}

export const SynchronizedTranscript: React.FC<SynchronizedTranscriptProps> = ({
  chapter,
  currentTime,
  duration,
  isPlaying,
  language,
  onSeek,
}) => {
  const t = TRANSLATIONS[language];
  const [filterQuery, setFilterQuery] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Divide script into natural timestamped sentences based on proportional length
  const sentences: TranscriptSentence[] = useMemo(() => {
    if (!chapter || !chapter.script) return [];
    
    // Split on sentence boundaries
    const rawParts = chapter.script.match(/[^.!?]+[.!?]+/g) || [chapter.script];
    const totalChars = chapter.script.length || 1;
    const totalDur = duration > 0 ? duration : chapter.durationSeconds;

    let accumulatedChars = 0;
    return rawParts.map((raw, idx) => {
      const trimmed = raw.trim();
      const startSec = Math.floor((accumulatedChars / totalChars) * totalDur);
      accumulatedChars += raw.length;
      const endSec = Math.floor((accumulatedChars / totalChars) * totalDur);

      return {
        id: `sent-${idx}`,
        text: trimmed,
        startSecond: startSec,
        endSecond: Math.max(startSec + 2, endSec),
      };
    });
  }, [chapter, duration]);

  // Find active sentence index
  const activeIndex = useMemo(() => {
    return sentences.findIndex((s) => currentTime >= s.startSecond && currentTime < s.endSecond);
  }, [sentences, currentTime]);

  // Auto scroll to active line
  useEffect(() => {
    if (autoScroll && activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex, autoScroll]);

  if (!chapter) return null;

  const filteredSentences = sentences.filter((s) =>
    s.text.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900/90 rounded-2xl border border-neutral-800 p-4 text-neutral-100 shadow-xl backdrop-blur-md">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-neutral-100 flex items-center gap-2">
              {t.syncTranscript}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {t.karaokeMode}
              </span>
            </h3>
            <p className="text-[11px] text-neutral-400">
              {t.clickWordToJump}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter query */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={language === 'en' ? 'Filter script...' : 'Metinde filtrele...'}
              className="pl-8 pr-2.5 py-1 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 w-36 sm:w-44"
            />
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              autoScroll
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoScroll ? 'bg-amber-400 animate-pulse' : 'bg-neutral-600'}`} />
            <span>{t.autoScroll}</span>
          </button>
        </div>
      </div>

      {/* Synchronized sentences stream */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1 divide-y divide-neutral-800/40 max-h-[380px]"
      >
        {filteredSentences.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            {language === 'en' ? 'No matching sentences found in this chapter.' : 'Bu bölümde eşleşen cümle bulunamadı.'}
          </div>
        ) : (
          filteredSentences.map((sentence, idx) => {
            const isCurrent = idx === activeIndex;

            return (
              <div
                key={sentence.id}
                ref={isCurrent ? activeLineRef : null}
                onClick={() => onSeek(sentence.startSecond)}
                className={`group cursor-pointer p-3 rounded-xl transition-all duration-200 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/20 via-indigo-950/40 to-neutral-900 border border-amber-500/40 shadow-lg shadow-amber-500/10 scale-[1.01]'
                    : 'hover:bg-neutral-800/60 border border-transparent'
                }`}
              >
                {/* Timestamp button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSeek(sentence.startSecond);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold shrink-0 mt-0.5 transition-colors flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : 'bg-neutral-800 group-hover:bg-neutral-700 text-neutral-400 group-hover:text-amber-300'
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-ping" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-current" />
                  )}
                  <span>{formatTime(sentence.startSecond)}</span>
                </button>

                {/* Spoken Text */}
                <div className="flex-1">
                  <p
                    className={`font-serif leading-relaxed text-sm transition-colors ${
                      isCurrent
                        ? 'text-amber-200 font-semibold drop-shadow-sm'
                        : 'text-neutral-300 group-hover:text-neutral-100'
                    }`}
                  >
                    {sentence.text}
                  </p>
                </div>

                {isCurrent && isPlaying && (
                  <div className="shrink-0 flex items-center gap-0.5 pt-1 text-amber-400">
                    <span className="w-1 h-3 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-4 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1 h-2 bg-amber-300 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Hint */}
      <div className="pt-3 mt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1 text-amber-400/90 font-medium">
          <Check className="w-3.5 h-3.5" /> {language === 'en' ? 'Live Karaoke synchronizer active' : 'Canlı Karaoke senkronizasyonu devrede'}
        </span>
        <span className="font-mono text-neutral-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
