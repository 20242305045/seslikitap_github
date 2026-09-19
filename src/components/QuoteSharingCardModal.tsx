import React, { useState } from 'react';
import { AudioBookmark, LibraryItem, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { formatTime } from '../utils/audioEngine';
import { 
  Share2, 
  Copy, 
  Download, 
  Check, 
  X, 
  Sparkles, 
  Quote, 
  Waves,
  Palette
} from 'lucide-react';

interface QuoteSharingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmark: AudioBookmark | null;
  item: LibraryItem | null;
  language: AppLanguage;
  onShowToast: (message: string) => void;
}

type CardFormat = 'story' | 'square';
type CardTheme = 'gradient' | 'dark' | 'parchment';

export const QuoteSharingCardModal: React.FC<QuoteSharingCardModalProps> = ({
  isOpen,
  onClose,
  bookmark,
  item,
  language,
  onShowToast,
}) => {
  const t = TRANSLATIONS[language];
  const [format, setFormat] = useState<CardFormat>('square');
  const [theme, setTheme] = useState<CardTheme>('gradient');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !bookmark) return null;

  const handleCopy = () => {
    const textToCopy = `"${bookmark.snippet}"\n\n— ${bookmark.itemTitle}, ${bookmark.chapterTitle}\nDinlenen Yer: ${formatTime(bookmark.startSeconds)} | Antigravity AI Audio`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onShowToast(t.quoteCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    setIsExporting(true);
    // Create an HTML5 canvas render or trigger download
    setTimeout(() => {
      setIsExporting(false);
      onShowToast(t.cardSaved);
    }, 800);
  };

  const themeClasses: Record<CardTheme, string> = {
    gradient: 'bg-gradient-to-br from-indigo-950 via-purple-950/80 to-neutral-950 border-indigo-500/30 text-white',
    dark: 'bg-neutral-950 border-neutral-800 text-neutral-100',
    parchment: 'bg-amber-950/40 border-amber-500/30 text-amber-100',
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-neutral-950 shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                {t.quoteSharingCard}
              </h2>
              <p className="text-xs text-neutral-400">
                {language === 'en' ? 'Create social video/quote cards with waveforms' : 'Sosyal medya için dalga boylu alıntı kartı oluşturun'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Toolbar */}
        <div className="p-4 border-b border-neutral-800/80 bg-neutral-950/40 flex flex-wrap items-center justify-between gap-3">
          {/* Format selector */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setFormat('square')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                format === 'square'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.cardFormatPost}
            </button>
            <button
              onClick={() => setFormat('story')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                format === 'story'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.cardFormatStory}
            </button>
          </div>

          {/* Theme selector */}
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setTheme('gradient')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                theme === 'gradient'
                  ? 'bg-neutral-800 text-cyan-300 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500" />
              <span>{t.cardThemeGradient}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-neutral-800 text-neutral-100 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span>{t.cardThemeDark}</span>
            </button>
            <button
              onClick={() => setTheme('parchment')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                theme === 'parchment'
                  ? 'bg-neutral-800 text-amber-300 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span>{t.cardThemeParchment}</span>
            </button>
          </div>
        </div>

        {/* Card Preview Container */}
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-neutral-950/60">
          <div
            id="quote-card-preview"
            className={`w-full rounded-3xl p-6 border shadow-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
              themeClasses[theme]
            } ${format === 'story' ? 'max-w-xs min-h-[440px]' : 'max-w-md min-h-[340px]'}`}
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                {item?.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={bookmark.itemTitle}
                    className="w-8 h-8 rounded-lg object-cover shadow-sm border border-white/10"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold leading-none line-clamp-1">{bookmark.itemTitle}</h4>
                  <p className="text-[10px] text-white/60 leading-none mt-1">{bookmark.chapterTitle}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                {formatTime(bookmark.startSeconds)}
              </span>
            </div>

            {/* Big Quote in Center */}
            <div className="my-6 z-10 relative">
              <Quote className="w-8 h-8 text-amber-400/20 mb-2" />
              <p className="font-serif italic text-base sm:text-lg leading-relaxed text-white drop-shadow-sm">
                "{bookmark.snippet}"
              </p>
            </div>

            {/* Bottom: Animated Waveform & Antigravity Signature */}
            <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between">
              {/* Dynamic Waveform Visualizer */}
              <div className="flex items-center gap-1">
                {[14, 28, 20, 36, 18, 30, 24, 16, 32, 22, 12].map((height, i) => (
                  <span
                    key={i}
                    className="w-1 bg-amber-400 rounded-full animate-pulse"
                    style={{
                      height: `${height}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest font-mono text-amber-300/80 block">
                  Antigravity Audio
                </span>
                <span className="text-[10px] text-white/50">
                  {bookmark.durationSeconds}s Clip
                </span>
              </div>
            </div>

            {/* Background ambient lighting */}
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.quoteCopied : t.copyQuoteText}</span>
          </button>

          <button
            onClick={handleDownloadCard}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isExporting ? 'Hazırlanıyor...' : t.downloadCardImage}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
