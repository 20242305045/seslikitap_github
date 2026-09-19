import React, { useState } from 'react';
import { TimestampComment, AppLanguage } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';
import { MessageSquare, AlertTriangle, Play, ThumbsUp, Eye, EyeOff } from 'lucide-react';

interface SoundCloudScrubberProps {
  currentTime: number;
  duration: number;
  comments: TimestampComment[];
  language: AppLanguage;
  onSeek: (seconds: number) => void;
  onAddCommentClick?: () => void;
}

export const SoundCloudScrubber: React.FC<SoundCloudScrubberProps> = ({
  currentTime,
  duration,
  comments,
  language,
  onSeek,
  onAddCommentClick,
}) => {
  const t = TRANSLATIONS[language];
  const [hoveredComment, setHoveredComment] = useState<TimestampComment | null>(null);
  const [activePin, setActivePin] = useState<TimestampComment | null>(null);
  const [hideSpoilers, setHideSpoilers] = useState(true);

  const safeDuration = duration > 0 ? duration : 300;
  const progressPercent = Math.min(100, Math.max(0, (currentTime / safeDuration) * 100));

  const shownComment = activePin || hoveredComment;

  return (
    <div className="relative w-full py-4 select-none">
      
      {/* SoundCloud-Style Floating Comment Bubble Tooltip */}
      {shownComment && (
        <div
          className="absolute bottom-full mb-3 z-30 transition-all duration-200 pointer-events-auto shadow-2xl"
          style={{
            left: `${Math.min(85, Math.max(15, (shownComment.timestampSeconds / safeDuration) * 100))}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl p-3 text-left w-64 text-neutral-100 shadow-xl backdrop-blur-xl relative animate-in fade-in zoom-in-95">
            {/* Header with avatar & time */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={shownComment.avatar}
                  alt={shownComment.author}
                  className="w-5 h-5 rounded-full object-cover shrink-0 border border-amber-400/40"
                />
                <span className="text-xs font-bold text-neutral-200 truncate">
                  {shownComment.author}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 shrink-0">
                {formatTime(shownComment.timestampSeconds)}
              </span>
            </div>

            {/* Comment Text with Spoiler Protection */}
            {shownComment.isSpoiler && hideSpoilers ? (
              <div className="py-2 px-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
                <span className="flex items-center gap-1 text-[11px] font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.containsSpoiler}
                </span>
                <button
                  onClick={() => setHideSpoilers(false)}
                  className="text-[10px] underline hover:text-amber-200"
                >
                  Göster
                </button>
              </div>
            ) : (
              <p className="text-xs text-neutral-300 font-serif leading-relaxed italic">
                "{shownComment.text}"
              </p>
            )}

            {/* Bottom Actions */}
            <div className="mt-2 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
              <button
                onClick={() => {
                  onSeek(shownComment.timestampSeconds);
                  setActivePin(null);
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>{t.jumpToMatch}</span>
              </button>

              <span className="flex items-center gap-1 text-neutral-400">
                <ThumbsUp className="w-3 h-3" />
                {shownComment.likes}
              </span>
            </div>

            {/* Little Arrow Indicator */}
            <div className="w-2.5 h-2.5 bg-neutral-900 border-r border-b border-amber-500/40 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
          </div>
        </div>
      )}

      {/* Main Track Bar with Waveform Fill */}
      <div className="relative h-4 flex items-center cursor-pointer group">
        
        {/* Background track */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden relative">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-indigo-500 rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Real Scrub Range Input */}
        <input
          type="range"
          min={0}
          max={safeDuration}
          step={1}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Audio seeker"
        />

        {/* Active Playhead Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-amber-500 pointer-events-none transition-transform group-hover:scale-125"
          style={{ left: `calc(${progressPercent}% - 8px)` }}
        />

        {/* SoundCloud-Style Timestamped Comment Pins */}
        {comments.map((comment) => {
          const pinPercent = Math.min(100, Math.max(0, (comment.timestampSeconds / safeDuration) * 100));
          const isPinHovered = hoveredComment?.id === comment.id || activePin?.id === comment.id;

          return (
            <div
              key={comment.id}
              onClick={(e) => {
                e.stopPropagation();
                setActivePin(comment);
                onSeek(comment.timestampSeconds);
              }}
              onMouseEnter={() => setHoveredComment(comment)}
              onMouseLeave={() => setHoveredComment(null)}
              className="absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-135"
              style={{ left: `calc(${pinPercent}% - 8px)` }}
              title={`${comment.author}: ${comment.text.slice(0, 30)}...`}
            >
              <div className="relative">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className={`w-4 h-4 rounded-full object-cover border transition-all ${
                    isPinHovered
                      ? 'border-amber-400 ring-2 ring-amber-400/50 scale-125'
                      : comment.isSpoiler
                      ? 'border-rose-400 opacity-80'
                      : 'border-white/80 opacity-90'
                  }`}
                />
                {comment.isSpoiler && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 border border-neutral-900" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info row */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mt-1.5">
        <div className="flex items-center gap-2">
          <span>{formatTime(currentTime)}</span>
          <span className="text-neutral-600">/</span>
          <span>{formatTime(safeDuration)}</span>
        </div>

        {/* Spoiler Toggle & Comments Count */}
        <div className="flex items-center gap-3 font-sans text-[11px]">
          {comments.length > 0 && (
            <button
              onClick={() => setHideSpoilers(!hideSpoilers)}
              className="flex items-center gap-1 text-neutral-400 hover:text-amber-300 transition-colors"
            >
              {hideSpoilers ? <EyeOff className="w-3 h-3 text-rose-400" /> : <Eye className="w-3 h-3 text-emerald-400" />}
              <span>{hideSpoilers ? t.hideSpoilers : t.showSpoilers}</span>
            </button>
          )}

          <div className="flex items-center gap-1 text-amber-400/90 font-medium">
            <MessageSquare className="w-3 h-3" />
            <span>{comments.length} {language === 'en' ? 'pins' : 'yorum'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
