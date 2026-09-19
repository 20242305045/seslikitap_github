import React, { useState } from 'react';
import { AudioBookmark, LibraryItem, Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { formatTime, audioEngine } from '../utils/audioEngine';
import { 
  BookmarkCheck, 
  Mic, 
  FileText, 
  Play, 
  Pause, 
  Trash2, 
  Share2, 
  X, 
  Clock, 
  Sparkles,
  Volume2,
  ExternalLink
} from 'lucide-react';

interface AudioBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: AudioBookmark[];
  language: AppLanguage;
  onDeleteBookmark: (id: string) => void;
  onSeekTo: (seconds: number) => void;
  onOpenShareCard: (bookmark: AudioBookmark) => void;
}

export const AudioBookmarkModal: React.FC<AudioBookmarkModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  language,
  onDeleteBookmark,
  onSeekTo,
  onOpenShareCard,
}) => {
  const t = TRANSLATIONS[language];
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTogglePlaySnippet = (bm: AudioBookmark) => {
    if (playingId === bm.id) {
      audioEngine.stopSpeaking();
      setPlayingId(null);
    } else {
      audioEngine.stopSpeaking();
      setPlayingId(bm.id);
      audioEngine.speak(bm.snippet, 1.0, () => {
        setPlayingId(null);
      }, undefined, language);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-neutral-950 shadow-md">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                {t.myAudioBookmarks}
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {bookmarks.length}
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                {language === 'en' 
                  ? '30-second captured audio snippets & quote transcripts' 
                  : 'Son 30 saniyelik yakalanan sesli alıntılar ve transkriptler'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              setPlayingId(null);
              onClose();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Bookmarks */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {bookmarks.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <Mic className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
              <h3 className="text-sm font-semibold text-neutral-200">{t.noAudioBookmarks}</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                {t.noAudioBookmarksDesc}
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => {
              const isSnippetPlaying = playingId === bm.id;

              return (
                <div
                  key={bm.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    isSnippetPlaying
                      ? 'bg-neutral-800/80 border-amber-500/50 shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {/* Top line metadata */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(bm.startSeconds)} - {formatTime(bm.endSeconds)} ({bm.durationSeconds}s)
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 flex items-center gap-1">
                        {bm.savedAs === 'audio' ? <Mic className="w-3 h-3 text-cyan-400" /> : <FileText className="w-3 h-3 text-amber-400" />}
                        {bm.savedAs === 'audio' ? t.saveAsAudio : t.saveAsTranscript}
                      </span>
                    </div>

                    <span className="text-[11px] text-neutral-500">
                      {new Date(bm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-neutral-200 line-clamp-1">
                    {bm.itemTitle} • <span className="text-neutral-400 font-normal">{bm.chapterTitle}</span>
                  </h4>

                  {/* Snippet Quote */}
                  <div className="mt-2.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800/80">
                    <p className="text-xs text-neutral-300 font-serif italic leading-relaxed">
                      "{bm.snippet}"
                    </p>
                  </div>

                  {bm.userNote && (
                    <p className="text-xs text-amber-300/90 mt-2 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      💬 {bm.userNote}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Play snippet */}
                      <button
                        onClick={() => handleTogglePlaySnippet(bm)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          isSnippetPlaying
                            ? 'bg-amber-500 text-neutral-950'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                        }`}
                      >
                        {isSnippetPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>{t.stopSnippet}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{t.playSnippet}</span>
                          </>
                        )}
                      </button>

                      {/* Jump player to bookmark */}
                      <button
                        onClick={() => {
                          audioEngine.stopSpeaking();
                          onSeekTo(bm.startSeconds);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 flex items-center gap-1"
                        title={language === 'en' ? 'Jump player to this timestamp' : 'Oynatıcıyı bu saniyeye atlat'}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                        <span>{language === 'en' ? 'Jump Here' : 'Buraya Atla'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Share as Quote Card */}
                      <button
                        onClick={() => {
                          onOpenShareCard(bm);
                        }}
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                        title={t.shareQuote}
                      >
                        <Share2 className="w-4 h-4 text-cyan-400" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteBookmark(bm.id)}
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
                        title={t.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
