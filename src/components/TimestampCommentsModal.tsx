import React, { useState } from 'react';
import { TimestampComment, LibraryItem, Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { formatTime } from '../utils/audioEngine';
import { 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  Play, 
  ThumbsUp, 
  Eye, 
  EyeOff, 
  X,
  Clock,
  Sparkles
} from 'lucide-react';

interface TimestampCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: TimestampComment[];
  item: LibraryItem | null;
  chapter: Chapter | null;
  currentTime: number;
  language: AppLanguage;
  onAddComment: (text: string, isSpoiler: boolean) => void;
  onSeekTo: (seconds: number) => void;
}

export const TimestampCommentsModal: React.FC<TimestampCommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
  item,
  chapter,
  currentTime,
  language,
  onAddComment,
  onSeekTo,
}) => {
  const t = TRANSLATIONS[language];
  const [newText, setNewText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [hideSpoilers, setHideSpoilers] = useState(true);

  if (!isOpen || !chapter || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onAddComment(newText.trim(), isSpoiler);
    setNewText('');
    setIsSpoiler(false);
  };

  const chapterComments = comments
    .filter((c) => c.chapterId === chapter.id)
    .sort((a, b) => a.timestampSeconds - b.timestampSeconds);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-neutral-950 shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-100">
                  {t.timestampedComments}
                </h2>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {chapterComments.length}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {chapter.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHideSpoilers(!hideSpoilers)}
              className="px-2.5 py-1 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors flex items-center gap-1.5"
            >
              {hideSpoilers ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{hideSpoilers ? t.hideSpoilers : t.showSpoilers}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {chapterComments.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-xs">
              <MessageSquare className="w-10 h-10 mx-auto text-neutral-700 mb-2" />
              <p>{t.noCommentsYet}</p>
            </div>
          ) : (
            chapterComments.map((comment) => (
              <div
                key={comment.id}
                className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 flex flex-col gap-2 transition-colors hover:border-neutral-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-6 h-6 rounded-full object-cover border border-amber-400/40"
                    />
                    <span className="text-xs font-bold text-neutral-200">
                      {comment.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {comment.isSpoiler && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {t.containsSpoiler}
                      </span>
                    )}

                    <button
                      onClick={() => {
                        onSeekTo(comment.timestampSeconds);
                        onClose();
                      }}
                      className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 transition-colors flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>{formatTime(comment.timestampSeconds)}</span>
                    </button>
                  </div>
                </div>

                {comment.isSpoiler && hideSpoilers ? (
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 italic">
                    ⚠️ Bu yorum spoiler içerdiği için gizlendi. Görmek için üstteki butondan açabilirsiniz.
                  </div>
                ) : (
                  <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                    {comment.text}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 text-[10px] text-neutral-500">
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <ThumbsUp className="w-3 h-3" />
                    {comment.likes}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drop a Comment at currentTime Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {language === 'en' ? 'Dropping comment at' : 'Yorum eklenecek an:'}{' '}
              <strong className="text-amber-300 font-mono">{formatTime(currentTime)}</strong>
            </span>

            <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-neutral-300">
              <input
                type="checkbox"
                checked={isSpoiler}
                onChange={(e) => setIsSpoiler(e.target.checked)}
                className="w-3.5 h-3.5 accent-rose-500 rounded"
              />
              <span className={isSpoiler ? 'text-rose-400 font-bold' : ''}>
                {t.containsSpoiler}
              </span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder={t.commentPlaceholder}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/80"
            />
            <button
              type="submit"
              disabled={!newText.trim()}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <span>{t.postComment}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
