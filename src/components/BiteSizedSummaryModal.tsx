import React, { useState, useEffect } from 'react';
import { LibraryItem, Chapter, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { audioEngine } from '../utils/audioEngine';
import { 
  Zap, 
  Play, 
  Pause, 
  X, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  RotateCcw,
  Sparkles,
  Quote
} from 'lucide-react';

interface BiteSizedSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem | null;
  chapter: Chapter | null;
  language: AppLanguage;
}

export const BiteSizedSummaryModal: React.FC<BiteSizedSummaryModalProps> = ({
  isOpen,
  onClose,
  item,
  chapter,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    hook: string;
    audioScript: string;
    keyTakeaways: string[];
    readingMinutes: number;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (isOpen && item && chapter) {
      fetchSummary();
    } else {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
    }
  }, [isOpen, item?.id, chapter?.id]);

  const fetchSummary = async () => {
    if (!item || !chapter) return;
    setLoading(true);
    try {
      const res = await fetch('/api/antigravity/bite-sized-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle: item.title,
          authorOrHost: item.authorOrHost,
          chapterTitle: chapter.title,
          summary: chapter.summary,
          script: chapter.script,
          type: item.type,
          language,
        }),
      });
      const data = await res.json();
      if (data.success && data.summary) {
        setSummaryData(data.summary);
      }
    } catch (err) {
      console.error('Bite-sized summary error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlayAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
    } else if (summaryData?.audioScript) {
      setIsPlayingAudio(true);
      audioEngine.speak(summaryData.audioScript, 1.05, () => {
        setIsPlayingAudio(false);
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
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-neutral-950 shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {t.biteSizedSummary}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t.readingMinutes}
                </span>
              </div>
              <h2 className="text-base font-bold text-neutral-100 mt-0.5 line-clamp-1">
                {item.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              setIsPlayingAudio(false);
              onClose();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mb-3" />
              <p className="text-xs font-medium text-neutral-300">{t.generatingBiteSummary}</p>
              <p className="text-[11px] text-neutral-500 mt-1">
                {language === 'en' ? 'Distilling essence and actionable takeaways...' : 'Ana düşünceler ve 3 dakikalık sesli özet hazırlanıyor...'}
              </p>
            </div>
          ) : summaryData ? (
            <>
              {/* Hook Quote Box */}
              {summaryData.hook && (
                <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 relative">
                  <Quote className="w-6 h-6 text-amber-500/30 absolute right-3 top-3 pointer-events-none" />
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {language === 'en' ? 'Core Thesis & Hook' : 'Temel Tez & Kanca'}
                  </span>
                  <p className="text-xs sm:text-sm font-serif italic text-neutral-200 leading-relaxed">
                    "{summaryData.hook}"
                  </p>
                </div>
              )}

              {/* Spoken Narration Script Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 border border-amber-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    {language === 'en' ? '3-Minute Spoken Essence' : '3 Dakikalık Hap Seslendirme'}
                  </span>
                  {isPlayingAudio && (
                    <span className="text-[10px] text-amber-400 font-mono animate-pulse">
                      ● Ses Çalıyor
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-6">
                  {summaryData.audioScript}
                </p>

                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                  <button
                    onClick={handleTogglePlayAudio}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-400 text-neutral-950 scale-105'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>{t.stopBiteSummaryAudio}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>{t.playBiteSummaryAudio}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={fetchSummary}
                    className="p-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Core Takeaways */}
              <div>
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  {language === 'en' ? '3 Actionable Takeaways' : '3 Önemli Çıkarım'}
                </h4>
                <div className="space-y-2">
                  {summaryData.keyTakeaways?.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );
};
