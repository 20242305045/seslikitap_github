import React, { useState, useEffect } from 'react';
import { LibraryItem, Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { audioEngine, formatTime } from '../utils/audioEngine';
import { 
  Sparkles, 
  Play, 
  Pause, 
  X, 
  Volume2, 
  Clock, 
  CheckCircle2, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface RecapModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem | null;
  chapter: Chapter | null;
  progressSeconds: number;
  language: AppLanguage;
  onResumeListening: () => void;
}

export const RecapModal: React.FC<RecapModalProps> = ({
  isOpen,
  onClose,
  item,
  chapter,
  progressSeconds,
  language,
  onResumeListening,
}) => {
  const t = TRANSLATIONS[language];
  const [loading, setLoading] = useState(false);
  const [recapScript, setRecapScript] = useState<string>('');
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [isPlayingRecap, setIsPlayingRecap] = useState(false);

  useEffect(() => {
    if (isOpen && item && chapter) {
      fetchRecap();
    } else {
      audioEngine.stopSpeaking();
      setIsPlayingRecap(false);
    }
  }, [isOpen, item?.id, chapter?.id]);

  const fetchRecap = async () => {
    if (!item || !chapter) return;
    setLoading(true);
    try {
      const prevChapters = item.chapters
        .filter((c) => c.number < chapter.number)
        .map((c) => ({ number: c.number, title: c.title, summary: c.summary }));

      const res = await fetch('/api/antigravity/recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle: item.title,
          authorOrHost: item.authorOrHost,
          type: item.type,
          chapterTitle: chapter.title,
          progressSeconds,
          durationSeconds: chapter.durationSeconds,
          chapterSummary: chapter.summary,
          scriptSnippet: chapter.script.slice(0, 300),
          previousChapters: prevChapters,
          language,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRecapScript(data.recapAudioScript);
        setBulletPoints(data.bulletPoints || []);
      }
    } catch (err) {
      console.error('Recap fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlayRecap = () => {
    if (isPlayingRecap) {
      audioEngine.stopSpeaking();
      setIsPlayingRecap(false);
    } else if (recapScript) {
      setIsPlayingRecap(true);
      audioEngine.speak(recapScript, 1.0, () => {
        setIsPlayingRecap(false);
      }, undefined, language);
    }
  };

  if (!isOpen || !item || !chapter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-neutral-950 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {t.recapMode}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  30-45s
                </span>
              </div>
              <h2 className="text-base font-bold text-neutral-100 mt-0.5">
                {t.previouslyOn}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              setIsPlayingRecap(false);
              onClose();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* Target Item Context Pill */}
          <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 flex items-center gap-3">
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="w-12 h-12 rounded-xl object-cover shrink-0" 
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-200 truncate">{item.title}</h4>
              <p className="text-[11px] text-neutral-400 truncate">{chapter.title}</p>
              <span className="text-[10px] font-mono text-amber-400">
                {t.pausedAt} {formatTime(progressSeconds)}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mb-3" />
              <p className="text-xs font-medium text-neutral-300">{t.generatingRecap}</p>
              <p className="text-[11px] text-neutral-500 mt-1">
                {language === 'en' ? 'Scanning chapter progress and plot milestones...' : 'Kaldığınız saniyeye kadarki olaylar sentezleniyor...'}
              </p>
            </div>
          ) : (
            <>
              {/* Spoken Narration Player Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-neutral-900 to-neutral-950 border border-indigo-500/30 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    {t.recapTitle}
                  </span>
                  
                  {isPlayingRecap && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Seslendiriliyor...
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-200 font-serif leading-relaxed italic">
                  "{recapScript}"
                </p>

                <div className="mt-4 pt-3 border-t border-indigo-500/20 flex items-center justify-between">
                  <button
                    onClick={handleTogglePlayRecap}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isPlayingRecap
                        ? 'bg-amber-400 text-neutral-950 scale-105'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {isPlayingRecap ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>{t.stopRecapAudio}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>{t.playRecapAudio}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={fetchRecap}
                    className="p-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    title={language === 'en' ? 'Regenerate Recap' : 'Özeti Yeniden Oluştur'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bullet Points */}
              {bulletPoints.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    {t.recapBulletPoints}
                  </h4>
                  <div className="space-y-2">
                    {bulletPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            {language === 'en' ? 'Ready to dive back in?' : 'Dinlemeye hazır mısınız?'}
          </span>
          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              setIsPlayingRecap(false);
              onClose();
              onResumeListening();
            }}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <span>{t.resumeAfterRecap}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
