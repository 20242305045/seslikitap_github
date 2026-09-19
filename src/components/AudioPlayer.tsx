import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookmarkPlus, 
  BookmarkCheck,
  Gauge, 
  Moon, 
  Maximize2, 
  Minimize2, 
  ListMusic, 
  Waves,
  CloudRain,
  Disc,
  Coffee,
  X,
  MessageSquare,
  Search,
  Zap,
  Share2,
  Download,
  Headphones,
  FileText,
  Clock,
  Heart,
  Video
} from 'lucide-react';
import { LibraryItem, Chapter, PlaybackSettings, AppLanguage, TimestampComment } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';
import { SoundCloudScrubber } from './SoundCloudScrubber';
import { SynchronizedTranscript } from './SynchronizedTranscript';

interface AudioPlayerProps {
  item: LibraryItem | null;
  chapter: Chapter | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  settings: PlaybackSettings;
  language?: AppLanguage;
  comments?: TimestampComment[];
  isDownloaded?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (itemId: string) => void;
  onPlayPause: () => void;
  onSeek: (seconds: number) => void;
  onSkipSeconds: (seconds: number) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onChangeSpeed: (speed: number) => void;
  onChangeVolume: (volume: number) => void;
  onToggleMute: () => void;
  onSetSleepTimer: (minutes: number | null) => void;
  sleepTimerRemaining: number | null;
  onChangeAmbientSound: (sound: 'none' | 'rain' | 'library' | 'vinyl') => void;
  onOpenNotes: () => void;
  onOpenAICompanion: () => void;
  onOpenChapterList: () => void;
  onBookmarkLast30?: () => void;
  onOpenBookmarks?: () => void;
  onOpenComments?: () => void;
  onOpenRecap?: () => void;
  onOpenBiteSummary?: () => void;
  onOpenSemanticSearch?: () => void;
  onOpenSmartDownload?: () => void;
  onOpenShareQuote?: () => void;
  onSimulateHeadphoneUnplug?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  item,
  chapter,
  isPlaying,
  currentTime,
  duration,
  settings,
  language = 'tr',
  comments = [],
  isDownloaded = false,
  onPlayPause,
  onSeek,
  onSkipSeconds,
  onPrevChapter,
  onNextChapter,
  onChangeSpeed,
  onChangeVolume,
  onToggleMute,
  onSetSleepTimer,
  sleepTimerRemaining,
  onChangeAmbientSound,
  onOpenNotes,
  onOpenAICompanion,
  onOpenChapterList,
  onBookmarkLast30,
  onOpenBookmarks,
  onOpenComments,
  onOpenRecap,
  onOpenBiteSummary,
  onOpenSemanticSearch,
  onOpenSmartDownload,
  onOpenShareQuote,
  onSimulateHeadphoneUnplug,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [expandedTab, setExpandedTab] = useState<'cover' | 'karaoke' | 'video'>('cover');

  const t = TRANSLATIONS[language];

  if (!item || !chapter) return null;

  const currentDuration = duration > 0 ? duration : chapter.durationSeconds;
  const progressPercent = currentDuration > 0 ? (currentTime / currentDuration) * 100 : 0;

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5];
  const sleepTimerOptions = [
    { label: t.timerOff, value: null },
    { label: t.timerMinutes(5), value: 5 },
    { label: t.timerMinutes(15), value: 15 },
    { label: t.timerMinutes(30), value: 30 },
    { label: t.timerMinutes(45), value: 45 },
    { label: t.timerMinutes(60), value: 60 },
  ];

  const chapterComments = comments.filter((c) => c.chapterId === chapter.id);

  return (
    <>
      {/* ================= COMPACT BOTTOM PLAYER BAR ================= */}
      <div 
        id="compact-audio-player-bar"
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          isExpanded ? 'hidden' : 'block'
        } bg-neutral-900/95 backdrop-blur-2xl border-t border-neutral-800 shadow-2xl shadow-black text-neutral-100`}
      >
        {/* Compact Scrub Line */}
        <div className="relative group w-full h-1.5 bg-neutral-800 cursor-pointer">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-r-full relative"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <input
            type="range"
            min={0}
            max={currentDuration}
            step={1}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Audio progress bar"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          
          {/* Left: Item cover & Title */}
          <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-sm">
            <div 
              className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden shadow-md shrink-0 cursor-pointer group"
              onClick={() => setIsExpanded(true)}
            >
              <img 
                src={item.coverImage} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider">
                  {item.type === 'podcast' ? t.typePodcast : t.typeAudiobook}
                </span>
                <span className="text-[11px] text-neutral-400 truncate">
                  {item.authorOrHost}
                </span>
                {onToggleFavorite && (
                  <button
                    id="compact-player-favorite-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className={`p-1 rounded-md transition-colors ml-auto cursor-pointer ${
                      isFavorite ? 'text-rose-500' : 'text-neutral-500 hover:text-rose-400'
                    }`}
                    title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>
                )}
              </div>
              <h4 
                className="text-xs sm:text-sm font-semibold text-neutral-100 truncate hover:text-amber-400 transition-colors cursor-pointer"
                onClick={() => setIsExpanded(true)}
              >
                {chapter.title}
              </h4>
              <div 
                className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono cursor-pointer"
                onClick={() => setIsExpanded(true)}
              >
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(currentDuration)}</span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Main Playback Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Prev Chapter */}
            <button
              onClick={onPrevChapter}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors hidden sm:block"
              title={t.prevChapter}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Skip -15s */}
            <button
              onClick={() => onSkipSeconds(-15)}
              className="p-1.5 sm:p-2 text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors relative"
              title={t.rewind15}
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="text-[8px] font-bold absolute inset-0 flex items-center justify-center pt-0.5">15</span>
            </button>

            {/* Play / Pause Primary Button */}
            <button
              id="player-play-pause-compact"
              onClick={onPlayPause}
              className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? t.pause : t.play}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Skip +15s */}
            <button
              onClick={() => onSkipSeconds(15)}
              className="p-1.5 sm:p-2 text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors relative"
              title={t.forward15}
            >
              <RotateCw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="text-[8px] font-bold absolute inset-0 flex items-center justify-center pt-0.5">15</span>
            </button>

            {/* Next Chapter */}
            <button
              onClick={onNextChapter}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors hidden sm:block"
              title={t.nextChapter}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Quick Features (Son 30 Sn, Yorumlar, Speed, Expand) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Son 30 Sn İşaretle (Audio Bookmark) Button */}
            {onBookmarkLast30 && (
              <button
                id="compact-bookmark-30s-button"
                onClick={onBookmarkLast30}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/40 transition-all flex items-center gap-1 shadow-sm"
                title={t.bookmarkLast30}
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.bookmarkLast30}</span>
                <span className="md:hidden">30s</span>
              </button>
            )}

            {/* Comments Count Badge */}
            {onOpenComments && (
              <button
                onClick={onOpenComments}
                className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors relative"
                title={t.timestampedComments}
              >
                <MessageSquare className="w-4 h-4" />
                {chapterComments.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-bold text-neutral-950 flex items-center justify-center">
                    {chapterComments.length}
                  </span>
                )}
              </button>
            )}

            {/* Playback Speed Controller Button */}
            <div className="relative hidden sm:block">
              <button
                id="player-speed-button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1"
                title={t.playbackSpeed}
              >
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>{settings.playbackSpeed}x</span>
              </button>

              {/* Speed Popover */}
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-44 rounded-xl bg-neutral-900 border border-neutral-700 p-2 shadow-2xl z-50">
                  <div className="text-[11px] font-semibold text-neutral-400 px-2 pb-1.5 border-b border-neutral-800">
                    {t.playbackSpeed}
                  </div>
                  <div className="grid grid-cols-2 gap-1 mt-1.5">
                    {speedOptions.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => {
                          onChangeSpeed(speed);
                          setShowSpeedMenu(false);
                        }}
                        className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                          settings.playbackSpeed === speed
                            ? 'bg-amber-500 text-neutral-950 font-bold'
                            : 'text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Full Screen Expand Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Expand"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>

      {/* ================= FULL EXPANDED LISTENING SUITE MODAL ================= */}
      {isExpanded && (
        <div 
          id="full-screen-audio-player"
          className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-3xl overflow-y-auto flex flex-col justify-between text-neutral-100 animate-in fade-in duration-200"
        >
          {/* Expanded Top Bar */}
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between border-b border-neutral-800/80">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
            >
              <Minimize2 className="w-4 h-4" /> {t.minimize}
            </button>

            {/* Tab Switcher: [Kapak & Ambiyans] vs [Senkronize Metin (Karaoke)] vs [Video Sahnesi] */}
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-2xl border border-neutral-800">
              <button
                onClick={() => setExpandedTab('cover')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  expandedTab === 'cover'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Artwork' : 'Kapak'}</span>
              </button>
              <button
                onClick={() => setExpandedTab('karaoke')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  expandedTab === 'karaoke'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Waves className="w-3.5 h-3.5" />
                <span>{t.karaokeMode}</span>
              </button>
              <button
                onClick={() => setExpandedTab('video')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  expandedTab === 'video'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Video Player' : 'Video Sahnesi'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  id="expanded-player-favorite-btn"
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    isFavorite 
                      ? 'text-rose-400 bg-rose-500/20 border border-rose-500/40' 
                      : 'text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 border border-neutral-800'
                  }`}
                  title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                >
                  <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              )}
              <button
                onClick={onOpenChapterList}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                title={t.allChapters}
              >
                <ListMusic className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded Center: Artwork OR Synchronized Karaoke Transcript OR Video Stage */}
          <div className="max-w-4xl mx-auto w-full px-6 py-4 flex flex-col items-center flex-1 justify-center">
            
            {expandedTab === 'video' ? (
              <div className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl relative flex flex-col justify-between p-5">
                {/* Background Artwork Blurred with Neon Glow */}
                <div 
                  className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-25 scale-110"
                  style={{ backgroundImage: `url(${item.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/80 to-black/60" />

                {/* Top Video Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                      <Video className="w-3 h-3" />
                      {language === 'en' ? 'English Video Stream' : 'İngilizce Destekli Video'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-800/80 text-[10px] text-neutral-300 font-mono">
                      1080p HD • 60 FPS
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-300 bg-black/60 px-3 py-1 rounded-full border border-neutral-700/60 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {language === 'en' ? 'English Subtitles Active' : 'İngilizce & Türkçe Altyazı'}
                  </span>
                </div>

                {/* Center Visualizer and Subtitle Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
                  {/* Visualizer Wave Animation */}
                  <div className="flex items-end justify-center gap-1.5 h-16 sm:h-20 mb-6">
                    {[40, 65, 85, 45, 95, 75, 100, 60, 90, 50, 70, 85, 60, 45].map((height, i) => (
                      <div 
                        key={i}
                        className={`w-2 sm:w-2.5 rounded-full transition-all duration-150 ${
                          isPlaying 
                            ? 'bg-gradient-to-t from-amber-500 to-cyan-400 animate-pulse' 
                            : 'bg-neutral-700'
                        }`}
                        style={{ 
                          height: isPlaying ? `${Math.max(15, (height * (0.6 + Math.sin(currentTime * 3 + i) * 0.4)))}%` : '20%',
                          animationDelay: `${i * 80}ms`
                        }}
                      />
                    ))}
                  </div>

                  {/* Subtitle / Caption Display */}
                  <div className="max-w-xl p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-neutral-700/60 shadow-xl">
                    <p className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <span>{item.authorOrHost}</span> • <span>{chapter.title}</span>
                    </p>
                    <p className="text-sm sm:text-base font-serif text-white font-medium leading-relaxed drop-shadow">
                      "{chapter.summary || (language === 'en' ? 'Stream audio with synchronized real-time English narration and cinematic soundscapes.' : 'İngilizce dil destekli akış ve senkronize sinematik ses manzarası.')}"
                    </p>
                  </div>
                </div>

                {/* Bottom Video Progress Bar & Controls hint */}
                <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-amber-400 font-bold">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(currentDuration)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neutral-300">
                      {language === 'en' ? 'Full English Audio Catalog' : 'Tüm Videolar İngilizce Dil Destekli'}
                    </span>
                  </div>
                </div>
              </div>
            ) : expandedTab === 'karaoke' ? (
              <div className="w-full h-full min-h-[380px] max-h-[460px]">
                <SynchronizedTranscript
                  chapter={chapter}
                  currentTime={currentTime}
                  duration={currentDuration}
                  isPlaying={isPlaying}
                  language={language}
                  onSeek={onSeek}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center max-w-lg">
                
                {/* Ambient Lighting Cover Art */}
                <div className="relative group w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 border border-neutral-800 mb-5">
                  <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105' : 'scale-100'
                    }`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Category pill */}
                  <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>

                  {/* Offline status badge */}
                  {isDownloaded && (
                    <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/80 backdrop-blur-md text-neutral-950 flex items-center gap-1 font-mono">
                      <Download className="w-3 h-3" /> Offline
                    </span>
                  )}

                  {/* Narrator */}
                  {item.narrator && (
                    <span className="absolute bottom-3 left-3 text-[11px] text-neutral-300 font-medium drop-shadow">
                      {t.narrator}: {item.narrator}
                    </span>
                  )}
                </div>

                {/* Title & Author */}
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight">
                  {chapter.title}
                </h1>
                <p className="text-sm text-neutral-400 mt-1">
                  {item.authorOrHost}
                </p>

                {/* Ambient Acoustic Selector */}
                <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs">
                  <span className="text-neutral-400 text-[11px]">{t.ambient}:</span>
                  <button
                    onClick={() => onChangeAmbientSound('none')}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      settings.ambientSound === 'none' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                    }`}
                  >
                    {t.ambientSilent}
                  </button>
                  <button
                    onClick={() => onChangeAmbientSound('rain')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      settings.ambientSound === 'rain' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-neutral-400'
                    }`}
                  >
                    <CloudRain className="w-2.5 h-2.5" /> {t.ambientRain}
                  </button>
                  <button
                    onClick={() => onChangeAmbientSound('vinyl')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      settings.ambientSound === 'vinyl' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-neutral-400'
                    }`}
                  >
                    <Disc className="w-2.5 h-2.5" /> {t.ambientVinyl}
                  </button>
                  <button
                    onClick={() => onChangeAmbientSound('library')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      settings.ambientSound === 'library' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-neutral-400'
                    }`}
                  >
                    <Coffee className="w-2.5 h-2.5" /> {t.ambientLibrary}
                  </button>
                </div>

                {/* Quick Chapter Summary Box */}
                <div className="w-full mt-4 p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 text-left">
                  <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider block mb-1">
                    {language === 'en' ? 'Chapter Essence' : 'Bölüm Özeti'}
                  </span>
                  <p className="text-xs text-neutral-300 font-serif line-clamp-3 leading-relaxed">
                    {chapter.summary}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Expanded Bottom Controls: SoundCloud Scrubber, Action Pill Tray, Primary Buttons */}
          <div className="max-w-4xl mx-auto w-full px-6 pb-6 pt-2">
            
            {/* SoundCloud-Style Interactive Scrubber with Comment Pins */}
            <SoundCloudScrubber
              currentTime={currentTime}
              duration={currentDuration}
              comments={chapterComments}
              language={language}
              onSeek={onSeek}
              onAddCommentClick={onOpenComments}
            />

            {/* Smart Feature Action Tray (Recap, Hap Özet, Son 30 Sn, Semantik Arama, Paylaş) */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-3 border-y border-neutral-800/80 my-2">
              
              {/* Son 30 Sn İşaretle */}
              {onBookmarkLast30 && (
                <button
                  onClick={onBookmarkLast30}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-1.5 transition-all"
                  title={t.bookmarkLast30}
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>{t.bookmarkLast30}</span>
                </button>
              )}

              {/* Recap Modu */}
              {onOpenRecap && (
                <button
                  onClick={onOpenRecap}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5 transition-colors"
                  title={t.recapMode}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.recapMode}</span>
                </button>
              )}

              {/* Hap Özet */}
              {onOpenBiteSummary && (
                <button
                  onClick={onOpenBiteSummary}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 flex items-center gap-1.5 transition-colors"
                  title={t.biteSizedSummary}
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-yellow-400" />
                  <span>{t.biteSizedSummary}</span>
                </button>
              )}

              {/* Semantik Arama */}
              {onOpenSemanticSearch && (
                <button
                  onClick={onOpenSemanticSearch}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  title={t.semanticSearch}
                >
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.searchInChapter}</span>
                </button>
              )}

              {/* Zaman Damgalı Yorumlar */}
              {onOpenComments && (
                <button
                  onClick={onOpenComments}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  title={t.timestampedComments}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.timestampedComments}</span>
                  {chapterComments.length > 0 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950">
                      {chapterComments.length}
                    </span>
                  )}
                </button>
              )}

              {/* Alıntı Paylaşım Stüdyosu */}
              {onOpenShareQuote && (
                <button
                  onClick={onOpenShareQuote}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  title={t.shareQuote}
                >
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.shareQuote}</span>
                </button>
              )}

              {/* Akıllı Çevrimdışı İndirme Modülü */}
              {onOpenSmartDownload && (
                <button
                  onClick={onOpenSmartDownload}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  title={t.smartOffline}
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.offlineDownloads}</span>
                </button>
              )}

              {/* Kulaklık Çıkarma Simülasyonu (Rewind On Resume Test) */}
              {onSimulateHeadphoneUnplug && (
                <button
                  onClick={onSimulateHeadphoneUnplug}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                  title={t.simulateHeadphoneUnplug}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{t.simulateHeadphoneUnplug}</span>
                </button>
              )}

            </div>

            {/* Primary Control Buttons */}
            <div className="flex items-center justify-between pt-1">
              
              {/* Speed Button */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400 flex items-center gap-1.5"
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{settings.playbackSpeed}x {t.speedSuffix}</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-44 rounded-xl bg-neutral-900 border border-neutral-700 p-2 shadow-2xl z-50">
                    <div className="text-[11px] font-semibold text-neutral-400 px-2 pb-1">
                      {t.playbackSpeed}
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {speedOptions.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            onChangeSpeed(speed);
                            setShowSpeedMenu(false);
                          }}
                          className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                            settings.playbackSpeed === speed
                              ? 'bg-amber-500 text-neutral-950 font-bold'
                              : 'text-neutral-300 hover:bg-neutral-800'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Center Rewind, Play, Forward */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={onPrevChapter}
                  className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
                  title={t.prevChapter}
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onSkipSeconds(-15)}
                  className="p-3 text-neutral-200 hover:text-white rounded-2xl hover:bg-neutral-900 transition-colors relative"
                  title={t.rewind15}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-[9px] font-bold absolute inset-0 flex items-center justify-center pt-0.5">15</span>
                </button>

                <button
                  id="player-play-pause-expanded"
                  onClick={onPlayPause}
                  className="p-4 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => onSkipSeconds(15)}
                  className="p-3 text-neutral-200 hover:text-white rounded-2xl hover:bg-neutral-900 transition-colors relative"
                  title={t.forward15}
                >
                  <RotateCw className="w-5 h-5" />
                  <span className="text-[9px] font-bold absolute inset-0 flex items-center justify-center pt-0.5">15</span>
                </button>

                <button
                  onClick={onNextChapter}
                  className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
                  title={t.nextChapter}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Notes & AI Insights */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-cyan-300 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>{t.takeNote}</span>
                </button>

                <button
                  onClick={onOpenAICompanion}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.aiInsights}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
