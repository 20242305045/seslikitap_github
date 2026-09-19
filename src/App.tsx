import React, { useState, useEffect, useRef } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  ResumeBanner 
} from './components/ResumeBanner';
import { 
  LibraryItemCard 
} from './components/LibraryItemCard';
import { 
  AudioPlayer 
} from './components/AudioPlayer';
import { 
  NotesPanel 
} from './components/NotesPanel';
import { 
  AntigravityAISidebar 
} from './components/AntigravityAISidebar';
import { 
  ChapterListModal 
} from './components/ChapterListModal';
import {
  AudioBookmarkModal
} from './components/AudioBookmarkModal';
import {
  SmartDownloadModal
} from './components/SmartDownloadModal';
import {
  RecapModal
} from './components/RecapModal';
import {
  BiteSizedSummaryModal
} from './components/BiteSizedSummaryModal';
import {
  SemanticSearchModal
} from './components/SemanticSearchModal';
import {
  QuoteSharingCardModal
} from './components/QuoteSharingCardModal';
import {
  TimestampCommentsModal
} from './components/TimestampCommentsModal';
import {
  GenreFilterBar
} from './components/GenreFilterBar';
import {
  AuthModal
} from './components/AuthModal';
import {
  ProfileModal
} from './components/ProfileModal';
import {
  AddItemModal
} from './components/AddItemModal';
import {
  GoogleAntigravitySearchDiscovery
} from './components/GoogleAntigravitySearchDiscovery';

import { 
  LibraryItem, 
  Chapter, 
  Note, 
  SavedProgress, 
  AppNotification, 
  ThemeMode, 
  PlaybackSettings,
  AppLanguage,
  AudioBookmark,
  TimestampComment,
  OfflineDownloadItem,
  OfflineSettings,
  UserProfile
} from './types';
import {
  getCurrentUser,
  logoutUser,
  updateUserProfile,
  toggleUserFavorite,
  toggleUserDownload
} from './utils/authStorage';
import { 
  getLocalizedLibrary,
  getLocalizedNotifications
} from './data/libraryData';
import {
  getCustomLibraryItems,
  saveCustomLibraryItem,
  deleteCustomLibraryItem
} from './utils/customLibraryStorage';
import { INITIAL_COMMENTS } from './data/mockComments';
import { 
  audioEngine, 
  formatTime 
} from './utils/audioEngine';
import { TRANSLATIONS } from './utils/i18n';

import { 
  BookOpen, 
  Radio, 
  Sparkles, 
  Bookmark, 
  Clock, 
  BookmarkCheck,
  Download,
  Zap,
  Plus
} from 'lucide-react';

export default function App() {
  // 1. Language state & Localized Library + Custom items
  const [language, setLanguage] = useState<AppLanguage>(() => {
    return (localStorage.getItem('antigravity_language') as AppLanguage) || 'tr';
  });
  const t = TRANSLATIONS[language];
  const [customItems, setCustomItems] = useState<LibraryItem[]>(() => getCustomLibraryItems());
  const baseLibrary = getLocalizedLibrary(language);
  const library = [...customItems, ...baseLibrary];

  // Add Item Modal state
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  // 2. Navigation & UI state
  const [activeTab, setActiveTab] = useState<'all' | 'audiobooks' | 'podcasts' | 'notes'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'shelves' | 'grid'>('shelves');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('antigravity_theme') as ThemeMode) || 'night';
  });

  // 3. Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('antigravity_notifications');
    return saved ? JSON.parse(saved) : getLocalizedNotifications(language);
  });
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  // 4. Saved Playback Progress per item (for "Kaldığı Yerden Devam Et")
  const [savedProgressMap, setSavedProgressMap] = useState<Record<string, SavedProgress>>(() => {
    const saved = localStorage.getItem('antigravity_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {
      'book-simyaci': {
        itemId: 'book-simyaci',
        chapterId: 'ch-s-1',
        progressSeconds: 135,
        durationSeconds: 320,
        percentage: 42.1,
        lastPlayedAt: Date.now() - 3600000,
      }
    };
  });

  // Most recent progress for top banner
  const [showResumeBanner, setShowResumeBanner] = useState(true);

  // 5. Notes State
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('antigravity_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'note-1',
        itemId: 'book-simyaci',
        chapterId: 'ch-s-1',
        itemTitle: 'Simyacı',
        chapterTitle: 'Bölüm 1: Endülüs Ovaları',
        timestampSeconds: 45,
        timestampFormatted: '00:45',
        text: 'Firavuninciri ağacının altındaki rüya. İnsanın kendi Kişisel Menkıbesini bulması için konfor alanından çıkması şart.',
        category: 'idea',
        createdAt: Date.now() - 7200000,
      },
      {
        id: 'note-2',
        itemId: 'podcast-zihin-norobilim',
        chapterId: 'ch-pod-zn-1',
        itemTitle: 'Zihnin Sınırları & Nörobilim',
        chapterTitle: 'Bölüm 18: Dijital Dikkat Dağınıklığı',
        timestampSeconds: 110,
        timestampFormatted: '01:50',
        text: 'Prefrontal korteks mikro-dopamin sıçramalarıyla yoruluyor. 20 dakikalık kesintisiz odaklanma bilişsel esnekliği %40 artırıyor!',
        category: 'quote',
        createdAt: Date.now() - 3600000,
      }
    ];
  });

  // 6. Playback Settings (with rewindOnResumeSeconds)
  const [playbackSettings, setPlaybackSettings] = useState<PlaybackSettings>(() => {
    const saved = localStorage.getItem('antigravity_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      playbackSpeed: 1.0,
      volume: 1.0,
      isMuted: false,
      sleepTimerMinutes: null,
      ambientSound: 'none',
      rewindOnResumeSeconds: 3,
    };
  });

  // 7. Active Audio State
  const [currentItem, setCurrentItem] = useState<LibraryItem | null>(library[0]);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(library[0].chapters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(library[0].chapters[0].durationSeconds);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);

  // 8. Audio Bookmarks State
  const [audioBookmarks, setAudioBookmarks] = useState<AudioBookmark[]>(() => {
    const saved = localStorage.getItem('antigravity_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'bm-initial-1',
        itemId: 'book-simyaci',
        chapterId: 'ch-s-1',
        itemTitle: 'Simyacı',
        chapterTitle: 'Bölüm 1: Endülüs Ovaları',
        startSeconds: 30,
        endSeconds: 60,
        durationSeconds: 30,
        snippet: 'Rüzgâr nereden eserse essin, insan kendi kaderini aramaya koyulduğunda bütün evren onunla iş birliği yapar.',
        savedAs: 'both',
        userNote: 'Kişisel menkıbe & evrenin uyumu',
        createdAt: Date.now() - 3600000,
      }
    ];
  });

  // 9. Timestamped Comments State
  const [comments, setComments] = useState<TimestampComment[]>(() => {
    const saved = localStorage.getItem('antigravity_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_COMMENTS;
  });

  // 10. Offline Downloads State
  const [downloads, setDownloads] = useState<OfflineDownloadItem[]>(() => {
    const saved = localStorage.getItem('antigravity_downloads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        itemId: 'book-simyaci',
        chapterId: 'ch-s-1',
        title: 'Bölüm 1: Endülüs Ovaları',
        itemTitle: 'Simyacı',
        sizeMb: 14.2,
        downloadedAt: Date.now() - 86400000,
        isCompleted: true,
        autoDeleteOnFinish: true,
      }
    ];
  });

  // 11. Smart Offline Settings State
  const [offlineSettings, setOfflineSettings] = useState<OfflineSettings>(() => {
    const saved = localStorage.getItem('antigravity_offline_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      autoDownloadOnWifiOnly: true,
      requireCharging: false,
      autoDeletePlayed: true,
      storageLimitMb: 5000,
      simulatedWifi: true,
      simulatedCharging: true,
    };
  });

  // 12. Modals & Sidebars
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [chapterModalItem, setChapterModalItem] = useState<LibraryItem | null>(null);

  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isSmartDownloadOpen, setIsSmartDownloadOpen] = useState(false);
  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [recapModalContext, setRecapModalContext] = useState<{ item: LibraryItem; chapter: Chapter } | null>(null);
  const [isBiteSummaryOpen, setIsBiteSummaryOpen] = useState(false);
  const [isSemanticSearchOpen, setIsSemanticSearchOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isQuoteCardOpen, setIsQuoteCardOpen] = useState(false);
  const [selectedBookmarkForCard, setSelectedBookmarkForCard] = useState<AudioBookmark | null>(null);

  // 13. User Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Refs for tracking playback loop
  const progressSaveTimeoutRef = useRef<any>(null);

  // Theme effect
  useEffect(() => {
    localStorage.setItem('antigravity_theme', theme);
    const root = document.documentElement;
    if (theme === 'night') {
      root.classList.add('dark');
      document.body.className = 'bg-neutral-950 text-neutral-100 antialiased';
    } else if (theme === 'oled') {
      root.classList.add('dark');
      document.body.className = 'bg-black text-neutral-100 antialiased';
    } else {
      root.classList.remove('dark');
      document.body.className = 'bg-stone-100 text-neutral-900 antialiased';
    }
  }, [theme]);

  // Language effect: persist and update active playing item to localized version
  useEffect(() => {
    localStorage.setItem('antigravity_language', language);
    if (currentItem) {
      const updatedItem = library.find((i) => i.id === currentItem.id);
      if (updatedItem) {
        setCurrentItem(updatedItem);
        if (currentChapter) {
          const updatedChapter = updatedItem.chapters.find((c) => c.id === currentChapter.id) || updatedItem.chapters[0];
          setCurrentChapter(updatedChapter);
        }
      }
    }
  }, [language]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('antigravity_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('antigravity_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('antigravity_progress', JSON.stringify(savedProgressMap));
  }, [savedProgressMap]);

  useEffect(() => {
    localStorage.setItem('antigravity_settings', JSON.stringify(playbackSettings));
  }, [playbackSettings]);

  useEffect(() => {
    localStorage.setItem('antigravity_bookmarks', JSON.stringify(audioBookmarks));
  }, [audioBookmarks]);

  useEffect(() => {
    localStorage.setItem('antigravity_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('antigravity_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('antigravity_offline_settings', JSON.stringify(offlineSettings));
  }, [offlineSettings]);

  // Audio Playback Ticker & Speech Engine integration
  useEffect(() => {
    let interval: any = null;

    if (isPlaying && currentChapter) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25 * playbackSettings.playbackSpeed;
          const max = duration > 0 ? duration : currentChapter.durationSeconds;

          // Check for chapter finish
          if (next >= max) {
            handleChapterFinished();
            return max;
          }
          return next;
        });
      }, 250);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentChapter?.id, duration, playbackSettings.playbackSpeed]);

  // Sleep timer ticker
  useEffect(() => {
    let sleepInterval: any = null;
    if (isPlaying && sleepTimerRemaining !== null && sleepTimerRemaining > 0) {
      sleepInterval = setInterval(() => {
        setSleepTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setIsPlaying(false);
            audioEngine.stopSpeaking();
            audioEngine.stopAmbientTone();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (sleepInterval) clearInterval(sleepInterval);
    };
  }, [isPlaying, sleepTimerRemaining]);

  // Save progress periodically when playing
  useEffect(() => {
    if (currentItem && currentChapter && currentTime > 0) {
      clearTimeout(progressSaveTimeoutRef.current);
      progressSaveTimeoutRef.current = setTimeout(() => {
        const dur = duration > 0 ? duration : currentChapter.durationSeconds;
        const pct = Math.min(100, (currentTime / dur) * 100);

        setSavedProgressMap((prev) => ({
          ...prev,
          [currentItem.id]: {
            itemId: currentItem.id,
            chapterId: currentChapter.id,
            progressSeconds: Math.floor(currentTime),
            durationSeconds: dur,
            percentage: pct,
            lastPlayedAt: Date.now(),
          }
        }));
      }, 1000);
    }
  }, [currentTime, currentItem?.id, currentChapter?.id, duration]);

  // Handle Chapter Finished: auto-delete played offline downloads & advance
  const handleChapterFinished = () => {
    if (!currentItem || !currentChapter) return;

    // Smart Offline: auto delete listened chapters if configured
    if (offlineSettings.autoDeletePlayed) {
      setDownloads((prev) => {
        const exists = prev.some((d) => d.chapterId === currentChapter.id);
        if (exists) {
          setActiveToast({
            id: `clean-${Date.now()}`,
            title: language === 'en' ? 'Offline Storage Cleaned' : 'Akıllı Hafıza Yönetimi',
            message: language === 'en'
              ? `Listened chapter "${currentChapter.title}" was automatically deleted to save storage.`
              : `Tamamlanan "${currentChapter.title}" bölümü hafızayı rahatlatmak için otomatik olarak silindi.`,
            dateFormatted: t.justNow,
            read: false,
            targetItemId: currentItem.id,
            type: 'system',
          });
          return prev.filter((d) => d.chapterId !== currentChapter.id);
        }
        return prev;
      });
    }

    const currentIndex = currentItem.chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentIndex < currentItem.chapters.length - 1) {
      const nextChapter = currentItem.chapters[currentIndex + 1];
      setCurrentChapter(nextChapter);
      setCurrentTime(0);
      setDuration(nextChapter.durationSeconds);
      audioEngine.speak(nextChapter.script, playbackSettings.playbackSpeed);
    } else {
      setIsPlaying(false);
      audioEngine.stopSpeaking();
    }
  };

  // Play / Pause Toggle with Rewind on Resume
  const handlePlayPause = () => {
    if (!currentChapter) return;

    if (isPlaying) {
      setIsPlaying(false);
      audioEngine.pauseSpeaking();
      audioEngine.stopAmbientTone();
    } else {
      // Rewind on Resume if paused and time > 4s
      const rewindSecs = playbackSettings.rewindOnResumeSeconds ?? 3;
      if (currentTime > 4 && rewindSecs > 0) {
        const rewound = Math.max(0, currentTime - rewindSecs);
        setCurrentTime(rewound);
        setActiveToast({
          id: `rewind-${Date.now()}`,
          title: language === 'en' ? 'Playback Resumed' : 'Kaldığınız Yerden Devam Ediliyor',
          message: t.rewindToast(rewindSecs),
          dateFormatted: t.justNow,
          read: false,
          targetItemId: currentItem?.id || '',
          type: 'system',
        });
      }

      setIsPlaying(true);
      const scriptText = currentChapter.script;
      audioEngine.speak(scriptText, playbackSettings.playbackSpeed);
      if (playbackSettings.ambientSound !== 'none') {
        audioEngine.startAmbientTone(playbackSettings.ambientSound);
      }
    }
  };

  // Simulated Headphone Unplug (Demonstrating rewind on resume)
  const handleSimulateHeadphoneUnplug = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioEngine.pauseSpeaking();
      audioEngine.stopAmbientTone();
    }
    const rewindSecs = playbackSettings.rewindOnResumeSeconds ?? 3;
    setCurrentTime((prev) => Math.max(0, prev - rewindSecs));

    setActiveToast({
      id: `unplug-${Date.now()}`,
      title: language === 'en' ? 'Headphones Disconnected' : 'Kulaklık Çıkarıldı',
      message: language === 'en'
        ? `Playback paused. Audio rewound ${rewindSecs}s to maintain your listening context upon resume.`
        : `Oynatma duraklatıldı. Bağlamı yeniden yakalamanız için ses ${rewindSecs} saniye geriye sarıldı.`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: currentItem?.id || '',
      type: 'system',
    });
  };

  // Seek audio
  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    if (isPlaying && currentChapter) {
      const dur = duration > 0 ? duration : currentChapter.durationSeconds;
      const ratio = dur > 0 ? seconds / dur : 0;
      audioEngine.setSpeed(playbackSettings.playbackSpeed, currentChapter.script, ratio);
    }
  };

  // Skip +/- 15s
  const handleSkipSeconds = (offset: number) => {
    const max = duration > 0 ? duration : (currentChapter?.durationSeconds || 300);
    const target = Math.max(0, Math.min(max, currentTime + offset));
    handleSeek(target);
  };

  // Previous Chapter
  const handlePrevChapter = () => {
    if (!currentItem || !currentChapter) return;
    const idx = currentItem.chapters.findIndex((c) => c.id === currentChapter.id);
    if (idx > 0) {
      const prev = currentItem.chapters[idx - 1];
      setCurrentChapter(prev);
      setCurrentTime(0);
      setDuration(prev.durationSeconds);
      if (isPlaying) {
        audioEngine.speak(prev.script, playbackSettings.playbackSpeed);
      }
    } else {
      handleSeek(0);
    }
  };

  // Next Chapter
  const handleNextChapter = () => {
    if (!currentItem || !currentChapter) return;
    const idx = currentItem.chapters.findIndex((c) => c.id === currentChapter.id);
    if (idx < currentItem.chapters.length - 1) {
      const next = currentItem.chapters[idx + 1];
      setCurrentChapter(next);
      setCurrentTime(0);
      setDuration(next.durationSeconds);
      if (isPlaying) {
        audioEngine.speak(next.script, playbackSettings.playbackSpeed);
      }
    }
  };

  // Change Speed
  const handleChangeSpeed = (speed: number) => {
    setPlaybackSettings((prev) => ({ ...prev, playbackSpeed: speed }));
    if (currentChapter && isPlaying) {
      const dur = duration > 0 ? duration : currentChapter.durationSeconds;
      const ratio = dur > 0 ? currentTime / dur : 0;
      audioEngine.setSpeed(speed, currentChapter.script, ratio);
    }
  };

  // Sleep timer setter
  const handleSetSleepTimer = (minutes: number | null) => {
    setPlaybackSettings((prev) => ({ ...prev, sleepTimerMinutes: minutes }));
    if (minutes === null) {
      setSleepTimerRemaining(null);
    } else {
      setSleepTimerRemaining(minutes * 60);
    }
  };

  // Ambient sound changer
  const handleChangeAmbientSound = (sound: 'none' | 'rain' | 'library' | 'vinyl') => {
    setPlaybackSettings((prev) => ({ ...prev, ambientSound: sound }));
    if (isPlaying) {
      audioEngine.startAmbientTone(sound);
    }
  };

  // Start playing a specific item
  const handlePlayItem = (item: LibraryItem, startSecondsOrChapter?: number | Chapter) => {
    const saved = savedProgressMap[item.id];
    let targetChapter = (typeof startSecondsOrChapter === 'object' && startSecondsOrChapter !== null)
      ? startSecondsOrChapter
      : item.chapters[0];
    let targetSeconds = typeof startSecondsOrChapter === 'number' ? startSecondsOrChapter : 0;

    if (typeof startSecondsOrChapter !== 'number' && typeof startSecondsOrChapter !== 'object' && saved && saved.progressSeconds > 0) {
      const matchingCh = item.chapters.find((c) => c.id === saved.chapterId);
      if (matchingCh) {
        targetChapter = matchingCh;
        const rewindSecs = playbackSettings.rewindOnResumeSeconds ?? 3;
        targetSeconds = Math.max(0, saved.progressSeconds - rewindSecs);
        if (rewindSecs > 0 && saved.progressSeconds > 4) {
          setActiveToast({
            id: `rewind-resume-${Date.now()}`,
            title: language === 'en' ? 'Playback Resumed' : 'Kaldığınız Yerden Devam Ediliyor',
            message: t.rewindToast(rewindSecs),
            dateFormatted: t.justNow,
            read: false,
            targetItemId: item.id,
            type: 'system',
          });
        }
      }
    }

    setCurrentItem(item);
    setCurrentChapter(targetChapter);
    setCurrentTime(targetSeconds);
    setDuration(targetChapter.durationSeconds);
    setIsPlaying(true);

    audioEngine.speak(targetChapter.script, playbackSettings.playbackSpeed);
    if (playbackSettings.ambientSound !== 'none') {
      audioEngine.startAmbientTone(playbackSettings.ambientSound);
    }
  };

  // Select Chapter from Modal
  const handleSelectChapterFromModal = (chapter: Chapter, resumeSeconds = 0) => {
    if (!currentItem) return;
    setCurrentChapter(chapter);
    setCurrentTime(resumeSeconds);
    setDuration(chapter.durationSeconds);
    setIsPlaying(true);
    audioEngine.speak(chapter.script, playbackSettings.playbackSpeed);
  };

  // Resume from ResumeBanner
  const handleResumeFromBanner = (itemId: string, chapterId: string, seconds: number) => {
    const targetItem = library.find((i) => i.id === itemId);
    if (!targetItem) return;
    const targetChapter = targetItem.chapters.find((c) => c.id === chapterId) || targetItem.chapters[0];
    const rewindSecs = playbackSettings.rewindOnResumeSeconds ?? 3;
    const rewoundSeconds = Math.max(0, seconds - rewindSecs);

    setCurrentItem(targetItem);
    setCurrentChapter(targetChapter);
    setCurrentTime(rewoundSeconds);
    setDuration(targetChapter.durationSeconds);
    setIsPlaying(true);
    audioEngine.speak(targetChapter.script, playbackSettings.playbackSpeed);

    if (rewindSecs > 0 && seconds > 4) {
      setActiveToast({
        id: `banner-resume-${Date.now()}`,
        title: language === 'en' ? 'Playback Resumed' : 'Kaldığınız Yerden Devam Ediliyor',
        message: t.rewindToast(rewindSecs),
        dateFormatted: t.justNow,
        read: false,
        targetItemId: targetItem.id,
        type: 'system',
      });
    }
  };

  // Restart from beginning
  const handleRestartFromBanner = (itemId: string, chapterId: string) => {
    const targetItem = library.find((i) => i.id === itemId);
    if (!targetItem) return;
    const targetChapter = targetItem.chapters.find((c) => c.id === chapterId) || targetItem.chapters[0];
    setCurrentItem(targetItem);
    setCurrentChapter(targetChapter);
    setCurrentTime(0);
    setDuration(targetChapter.durationSeconds);
    setIsPlaying(true);
    audioEngine.speak(targetChapter.script, playbackSettings.playbackSpeed);
  };

  // ================= 9 SPECIFIC USER FEATURES HANDLERS =================

  // 1. Audio Bookmark & Quote Capture: capture last 30 seconds
  const handleBookmarkLast30 = () => {
    if (!currentItem || !currentChapter) return;
    const startSec = Math.max(0, Math.floor(currentTime - 30));
    const endSec = Math.floor(currentTime);
    const durSec = Math.max(1, endSec - startSec);

    // Extract approximate script slice
    const ratio = duration > 0 ? startSec / duration : 0;
    const charIndex = Math.floor(currentChapter.script.length * ratio);
    const snippet = currentChapter.script.slice(charIndex, charIndex + 220).trim() || currentChapter.summary;

    const newBookmark: AudioBookmark = {
      id: `bm-${Date.now()}`,
      itemId: currentItem.id,
      chapterId: currentChapter.id,
      itemTitle: currentItem.title,
      chapterTitle: currentChapter.title,
      startSeconds: startSec,
      endSeconds: endSec,
      durationSeconds: durSec,
      snippet: `"...${snippet}..."`,
      savedAs: 'both',
      userNote: language === 'en' ? 'Captured 30s moment' : 'Yakalanan 30 sn moment',
      createdAt: Date.now(),
    };

    setAudioBookmarks((prev) => [newBookmark, ...prev]);
    setIsBookmarkModalOpen(true);

    setActiveToast({
      id: `bm-toast-${Date.now()}`,
      title: language === 'en' ? 'Audio Bookmark Saved' : 'Sesli Yer İmi Yakalandı',
      message: language === 'en'
        ? `Last 30s (${formatTime(startSec)} - ${formatTime(endSec)}) saved to your library.`
        : `Son 30 saniyelik kısım (${formatTime(startSec)} - ${formatTime(endSec)}) kütüphanenize kaydedildi.`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: currentItem.id,
      type: 'system',
    });
  };

  const handleDeleteBookmark = (id: string) => {
    setAudioBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // 2. Comments Drop & View
  const handleAddComment = (text: string, isSpoiler: boolean) => {
    if (!currentItem || !currentChapter) return;
    const newComment: TimestampComment = {
      id: `c-${Date.now()}`,
      chapterId: currentChapter.id,
      itemId: currentItem.id,
      author: 'Ayşe Uygun',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      timestampSeconds: Math.floor(currentTime),
      text,
      isSpoiler,
      likes: 1,
      createdAt: Date.now(),
    };

    setComments((prev) => [...prev, newComment]);
    setActiveToast({
      id: `c-toast-${Date.now()}`,
      title: language === 'en' ? 'Comment Added' : 'Yorum Eklendi',
      message: language === 'en'
        ? `Comment pinned at ${formatTime(currentTime)}.`
        : `${formatTime(currentTime)} saniyesine sesli pin bırakıldı.`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: currentItem.id,
      type: 'system',
    });
  };

  // 3. Smart Offline Downloads & Memory Management
  const handleToggleDownload = (itemId: string, chapterId: string) => {
    const existing = downloads.find((d) => d.chapterId === chapterId);
    if (existing) {
      setDownloads((prev) => prev.filter((d) => d.chapterId !== chapterId));
      setActiveToast({
        id: `dl-del-${Date.now()}`,
        title: language === 'en' ? 'Download Removed' : 'İndirme Silindi',
        message: language === 'en' ? 'Chapter removed from offline storage.' : 'Bölüm çevrimdışı hafızadan kaldırıldı.',
        dateFormatted: t.justNow,
        read: false,
        targetItemId: itemId,
        type: 'system',
      });
      return;
    }

    // Check Wi-Fi restriction
    if (offlineSettings.autoDownloadOnWifiOnly && !offlineSettings.simulatedWifi) {
      setActiveToast({
        id: `dl-err-${Date.now()}`,
        title: language === 'en' ? 'Wi-Fi Required' : 'Wi-Fi Bağlantısı Gerekli',
        message: language === 'en'
          ? 'Download paused: Auto-download on Wi-Fi only is active.'
          : 'İndirme bekletiliyor: Sadece Wi-Fi bağlıyken indirme ayarı aktif.',
        dateFormatted: t.justNow,
        read: false,
        targetItemId: itemId,
        type: 'system',
      });
      return;
    }

    // Check Charging restriction
    if (offlineSettings.requireCharging && !offlineSettings.simulatedCharging) {
      setActiveToast({
        id: `dl-charge-err-${Date.now()}`,
        title: language === 'en' ? 'Charging Required' : 'Şarj Gerekli',
        message: language === 'en'
          ? 'Download queued: Device is not charging.'
          : 'İndirme kuyruğa alındı: Cihaz şarjda değil.',
        dateFormatted: t.justNow,
        read: false,
        targetItemId: itemId,
        type: 'system',
      });
      return;
    }

    const item = library.find((i) => i.id === itemId);
    const ch = item?.chapters.find((c) => c.id === chapterId);

    const newItem: OfflineDownloadItem = {
      itemId,
      chapterId,
      title: ch?.title || 'Chapter',
      itemTitle: item?.title || 'Audio',
      sizeMb: Math.round(((ch?.durationSeconds || 300) * 0.04) * 10) / 10,
      downloadedAt: Date.now(),
      isCompleted: true,
      autoDeleteOnFinish: offlineSettings.autoDeletePlayed,
    };

    setDownloads((prev) => [newItem, ...prev]);
    setActiveToast({
      id: `dl-ok-${Date.now()}`,
      title: language === 'en' ? 'Offline Ready' : 'Çevrimdışı Kullanıma Hazır',
      message: language === 'en'
        ? `Downloaded "${newItem.title}" (${newItem.sizeMb} MB).`
        : `"${newItem.title}" (${newItem.sizeMb} MB) cihazınıza indirildi.`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: itemId,
      type: 'new_episode',
    });
  };

  const handleDeleteDownload = (chapterId: string) => {
    setDownloads((prev) => prev.filter((d) => d.chapterId !== chapterId));
    setActiveToast({
      id: `dl-del-${Date.now()}`,
      title: language === 'en' ? 'Download Removed' : 'İndirme Silindi',
      message: language === 'en' ? 'Chapter removed from offline storage.' : 'Bölüm çevrimdışı hafızadan kaldırıldı.',
      dateFormatted: t.justNow,
      read: false,
      targetItemId: '',
      type: 'system',
    });
  };

  const handleCleanListenedDownloads = () => {
    setDownloads((prev) => prev.filter((d) => !d.isCompleted));
    setActiveToast({
      id: `clean-man-${Date.now()}`,
      title: language === 'en' ? 'Storage Cleaned' : 'Hafıza Temizlendi',
      message: language === 'en' ? 'Listened episodes deleted.' : 'Dinlenmiş bölümler hafızadan silindi.',
      dateFormatted: t.justNow,
      read: false,
      targetItemId: '',
      type: 'system',
    });
  };

  const handleUpdateOfflineSettings = (newSettings: Partial<OfflineSettings>) => {
    setOfflineSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // 4. Recap modal opener
  const handleOpenRecap = (item?: LibraryItem, chapter?: Chapter) => {
    const targetItem = item || currentItem;
    const targetChapter = chapter || currentChapter;
    if (targetItem && targetChapter) {
      setRecapModalContext({ item: targetItem, chapter: targetChapter });
      setIsRecapOpen(true);
    }
  };

  // 5. Quote Share Studio
  const handleOpenShareQuote = (customBookmark?: AudioBookmark) => {
    if (customBookmark) {
      setSelectedBookmarkForCard(customBookmark);
    } else if (currentItem && currentChapter) {
      const tempBookmark: AudioBookmark = {
        id: `bm-temp-${Date.now()}`,
        itemId: currentItem.id,
        chapterId: currentChapter.id,
        itemTitle: currentItem.title,
        chapterTitle: currentChapter.title,
        startSeconds: Math.max(0, Math.floor(currentTime - 15)),
        endSeconds: Math.floor(currentTime),
        durationSeconds: 15,
        snippet: currentChapter.summary || currentChapter.script.slice(0, 180),
        savedAs: 'both',
        createdAt: Date.now(),
      };
      setSelectedBookmarkForCard(tempBookmark);
    }
    setIsQuoteCardOpen(true);
  };

  // Notes actions
  const handleAddNote = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSeekFromNote = (seconds: number) => {
    handleSeek(seconds);
    setIsNotesOpen(false);
  };

  // Notifications
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handlePlayNotificationItem = (itemId: string, chapterId?: string) => {
    const target = library.find((i) => i.id === itemId);
    if (!target) return;
    let targetCh = target.chapters[0];
    if (chapterId) {
      const found = target.chapters.find((c) => c.id === chapterId);
      if (found) targetCh = found;
    }
    setCurrentItem(target);
    setCurrentChapter(targetCh);
    setCurrentTime(0);
    setDuration(targetCh.durationSeconds);
    setIsPlaying(true);
    audioEngine.speak(targetCh.script, playbackSettings.playbackSpeed);
  };

  const handleSimulateNewNotification = () => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: t.simulatedNotificationTitle,
      message: t.simulatedNotificationMessage,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: 'podcast-tekno-trend',
      targetChapterId: 'ch-pod-tek-1',
      type: 'new_episode',
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToast(newNotif);
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === newNotif.id ? null : curr));
    }, 6000);
  };

  const handleToggleLanguage = (newLang: AppLanguage) => {
    setLanguage(newLang);
    setNotifications(getLocalizedNotifications(newLang));
  };

  const handleToggleTheme = () => {
    if (theme === 'night') setTheme('oled');
    else if (theme === 'oled') setTheme('light');
    else setTheme('night');
  };

  // Available genres with counts
  const genreCounts = React.useMemo(() => {
    const map: Record<string, number> = {};
    const scopedItems = library.filter((item) => {
      if (activeTab === 'audiobooks' && item.type !== 'audiobook') return false;
      if (activeTab === 'podcasts' && item.type !== 'podcast') return false;
      return true;
    });
    scopedItems.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [library, activeTab]);

  // Filtered library
  const filteredLibrary = library.filter((item) => {
    if (activeTab === 'audiobooks' && item.type !== 'audiobook') return false;
    if (activeTab === 'podcasts' && item.type !== 'podcast') return false;
    if (selectedGenre && item.category !== selectedGenre) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.authorOrHost.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.narrator && item.narrator.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Group items by genre for shelves mode
  const shelvesGrouped = React.useMemo(() => {
    const groups: Record<string, LibraryItem[]> = {};
    filteredLibrary.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredLibrary]);

  const recentProgressList = (Object.values(savedProgressMap) as SavedProgress[]).sort(
    (a, b) => b.lastPlayedAt - a.lastPlayedAt
  );
  const mostRecentProgress = recentProgressList.length > 0 ? recentProgressList[0] : null;

  const isCurrentChapterDownloaded = Boolean(
    currentChapter && downloads.some((d) => d.chapterId === currentChapter.id)
  );

  // Auth & Profile handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setActiveToast({
      id: `auth-${Date.now()}`,
      title: language === 'en' ? 'Welcome!' : 'Hoş Geldiniz!',
      message: language === 'en' ? `Active account: ${user.name} (${user.id})` : `${user.name} olarak giriş yapıldı (Kişisel ID: ${user.id})`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: currentItem?.id || '',
      type: 'system'
    });
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsProfileModalOpen(false);
    setActiveToast({
      id: `logout-${Date.now()}`,
      title: language === 'en' ? 'Logged Out' : 'Çıkış Yapıldı',
      message: language === 'en' ? 'You have safely logged out.' : 'Hesabınızdan güvenli şekilde çıkış yapıldı.',
      dateFormatted: t.justNow,
      read: false,
      targetItemId: '',
      type: 'system'
    });
  };

  const handleToggleFavorite = (itemId: string) => {
    const updated = toggleUserFavorite(itemId);
    setCurrentUser(updated);
    const isFav = updated.favoriteItemIds?.includes(itemId);
    setActiveToast({
      id: `fav-${Date.now()}`,
      title: isFav 
        ? (language === 'en' ? 'Added to Favorites' : 'Favorilere Eklendi')
        : (language === 'en' ? 'Removed from Favorites' : 'Favorilerden Çıkarıldı'),
      message: isFav
        ? (language === 'en' ? 'Item is now saved to your profile favorites.' : 'Eser profilinizdeki favorilenenlere eklendi.')
        : (language === 'en' ? 'Item removed from favorites.' : 'Eser favorilerinizden kaldırıldı.'),
      dateFormatted: t.justNow,
      read: false,
      targetItemId: itemId,
      type: 'system'
    });
  };

  // Add Item Handler (Google & Antigravity or Manual)
  const handleAddItem = (item: LibraryItem, autoPlay = true) => {
    const updated = saveCustomLibraryItem(item);
    setCustomItems(updated);
    setActiveToast({
      id: `add-${Date.now()}`,
      title: language === 'en' ? 'Added to Library' : 'Kütüphaneye Eklendi',
      message: language === 'en'
        ? `"${item.title}" is now available in your personal library.`
        : `"${item.title}" kişisel kütüphanenize başarıyla eklendi.`,
      dateFormatted: t.justNow,
      read: false,
      targetItemId: item.id,
      type: 'system',
    });
    if (autoPlay && item.chapters && item.chapters.length > 0) {
      handlePlayItem(item, item.chapters[0]);
    }
  };

  // Delete Custom Item Handler
  const handleDeleteCustomItem = (itemId: string) => {
    const updated = deleteCustomLibraryItem(itemId);
    setCustomItems(updated);
    setActiveToast({
      id: `del-${Date.now()}`,
      title: language === 'en' ? 'Item Removed' : 'Eser Kaldırıldı',
      message: language === 'en' ? 'Item removed from your personal library.' : 'Eser kütüphanenizden kaldırıldı.',
      dateFormatted: t.justNow,
      read: false,
      targetItemId: '',
      type: 'system',
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pb-32">
      
      {/* Top Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onPlayNotificationItem={handlePlayNotificationItem}
        onSimulateNewNotification={handleSimulateNewNotification}
        libraryItems={library}
        bookmarksCount={audioBookmarks.length}
        downloadsCount={downloads.length}
        favoritesCount={currentUser?.favoriteItemIds?.length || 0}
        currentUser={currentUser}
        onOpenBookmarks={() => setIsBookmarkModalOpen(true)}
        onOpenDownloads={() => setIsSmartDownloadOpen(true)}
        onOpenFavorites={() => setIsProfileModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenAddItem={() => setIsAddItemOpen(true)}
      />

      {/* Dynamic Toast Notification */}
      {activeToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-neutral-900 border border-amber-500/60 rounded-2xl p-4 shadow-2xl shadow-amber-500/20 text-neutral-100 flex items-start gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="p-2 rounded-xl bg-amber-500 text-neutral-950 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-amber-300">
              {activeToast.title}
            </h5>
            <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
              {activeToast.message}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              {activeToast.targetItemId && (
                <button
                  onClick={() => {
                    handlePlayNotificationItem(activeToast.targetItemId, activeToast.targetChapterId);
                    setActiveToast(null);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400"
                >
                  {t.listenNow}
                </button>
              )}
              <button
                onClick={() => setActiveToast(null)}
                className="px-2 py-1 text-xs text-neutral-400 hover:text-white"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Kaldığı Yerden Devam Et Banner */}
        {showResumeBanner && mostRecentProgress && (
          <ResumeBanner
            savedProgress={mostRecentProgress}
            libraryItems={library}
            language={language}
            onResume={handleResumeFromBanner}
            onRestart={handleRestartFromBanner}
            onDismiss={() => setShowResumeBanner(false)}
            onOpenRecap={(item, chapter) => handleOpenRecap(item, chapter)}
          />
        )}

        {/* View Switch: Notes vs Library Content */}
        {activeTab === 'notes' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-100 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-amber-400" />
                  {t.notesTitle}
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  {t.notesPanelTitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBookmarkModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/30 transition-colors"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{t.audioBookmarks} ({audioBookmarks.length})</span>
                </button>

                <button
                  onClick={() => setIsNotesOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm"
                >
                  <span>{t.addNote}</span>
                </button>
              </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.length === 0 ? (
                <div className="col-span-full py-16 text-center text-neutral-400">
                  <Bookmark className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                  <p className="text-sm">{t.noNotesYet}</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <button
                          onClick={() => handleSeekFromNote(note.timestampSeconds)}
                          className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:underline"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{note.timestampFormatted}</span>
                        </button>
                        <span className="text-[10px] font-semibold text-neutral-400">
                          {note.category.toUpperCase()}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-300 line-clamp-1">
                        {note.itemTitle}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mb-2">
                        {note.chapterTitle}
                      </p>

                      <p className="text-xs text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap">
                        {note.text}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{new Date(note.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-neutral-400 hover:text-rose-400"
                      >
                        {t.deleteNote}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Library Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-100 flex items-center gap-2">
                  {activeTab === 'audiobooks' ? (
                    <>
                      <BookOpen className="w-6 h-6 text-amber-400" /> {t.tabAudiobooks}
                    </>
                  ) : activeTab === 'podcasts' ? (
                    <>
                      <Radio className="w-6 h-6 text-amber-400" /> {t.tabPodcasts}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-amber-400" /> {t.exploreListen}
                    </>
                  )}
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  {t.exploreSubtitle}
                </p>
              </div>

              {/* Quick Offline Downloads shortcut */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSmartDownloadOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.smartOffline}</span>
                </button>
              </div>
            </div>

            {/* Comprehensive Genre Filter Bar with Shelf / Grid switcher */}
            <GenreFilterBar
              genres={genreCounts}
              selectedGenre={selectedGenre}
              onSelectGenre={(genre) => setSelectedGenre(genre)}
              language={language}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              totalCount={filteredLibrary.length}
            />

            {/* Google & Antigravity Live Search Grounded Discovery */}
            {searchQuery.trim().length >= 2 && (
              <div className="mb-8">
                <GoogleAntigravitySearchDiscovery
                  searchQuery={searchQuery}
                  language={language}
                  activeTab={activeTab}
                  onAddAndPlay={(item) => handleAddItem(item, true)}
                  onOpenBiteSummary={(item) => {
                    setCurrentItem(item);
                    setCurrentChapter(item.chapters[0]);
                    setIsBiteSummaryOpen(true);
                  }}
                  existingLibrary={library}
                />
              </div>
            )}

            {/* Shelves View vs Grid View */}
            {viewMode === 'shelves' && !selectedGenre && !searchQuery.trim() ? (
              <div className="space-y-12">
                {Object.entries(shelvesGrouped).map(([genreName, items]) => (
                  <section key={genreName} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                            <span>{genreName}</span>
                            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                              {items.length} {language === 'en' ? 'Titles' : 'Eser'}
                            </span>
                          </h2>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedGenre(genreName)}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline group"
                      >
                        <span>{language === 'en' ? 'View all in this category' : 'Bu kategorideki tümü'}</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {items.map((item) => {
                        const saved = savedProgressMap[item.id];
                        const isCurrent = currentItem?.id === item.id;

                        return (
                          <div key={item.id} className="relative group">
                            <LibraryItemCard
                              item={item}
                              savedProgress={saved}
                              isCurrentlyPlaying={isCurrent && isPlaying}
                              language={language}
                              isFavorite={currentUser?.favoriteItemIds?.includes(item.id)}
                              onToggleFavorite={handleToggleFavorite}
                              onPlay={(selected) => handlePlayItem(selected)}
                              onSelectChapters={(selected) => setChapterModalItem(selected)}
                              onOpenNotes={(selected) => {
                                setCurrentItem(selected);
                                setIsNotesOpen(true);
                              }}
                              onDeleteItem={handleDeleteCustomItem}
                            />

                            {/* Quick Smart Actions Floating Bar */}
                            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenRecap(item, item.chapters[0]);
                                }}
                                className="p-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 shadow-lg backdrop-blur-md"
                                title={t.recapMode}
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentItem(item);
                                  setCurrentChapter(item.chapters[0]);
                                  setIsBiteSummaryOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border border-neutral-700 shadow-lg backdrop-blur-md"
                                title={t.biteSizedSummary}
                              >
                                <Zap className="w-3.5 h-3.5 fill-current text-yellow-400" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleDownload(item.id, item.chapters[0].id);
                                }}
                                className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-cyan-300 border border-neutral-700 shadow-lg backdrop-blur-md"
                                title={t.downloadEpisode}
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : filteredLibrary.length === 0 ? (
              <div className="py-20 text-center text-neutral-400 bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                <BookOpen className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                <p className="text-sm font-medium text-neutral-300">
                  {language === 'en' ? 'No items match the current filter' : 'Seçilen filtreye uygun eser bulunamadı'}
                </p>
                <button
                  onClick={() => {
                    setSelectedGenre(null);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors"
                >
                  {t.clearGenreFilter}
                </button>
              </div>
            ) : (
              /* Flat Grid View (when filtered by a specific genre or Grid mode chosen) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLibrary.map((item) => {
                  const saved = savedProgressMap[item.id];
                  const isCurrent = currentItem?.id === item.id;

                  return (
                    <div key={item.id} className="relative group">
                      <LibraryItemCard
                        item={item}
                        savedProgress={saved}
                        isCurrentlyPlaying={isCurrent && isPlaying}
                        language={language}
                        isFavorite={currentUser?.favoriteItemIds?.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onPlay={(selected) => handlePlayItem(selected)}
                        onSelectChapters={(selected) => setChapterModalItem(selected)}
                        onOpenNotes={(selected) => {
                          setCurrentItem(selected);
                          setIsNotesOpen(true);
                        }}
                        onDeleteItem={handleDeleteCustomItem}
                      />

                      {/* Quick Smart Actions Floating Bar */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenRecap(item, item.chapters[0]);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 shadow-lg backdrop-blur-md"
                          title={t.recapMode}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentItem(item);
                            setCurrentChapter(item.chapters[0]);
                            setIsBiteSummaryOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border border-neutral-700 shadow-lg backdrop-blur-md"
                          title={t.biteSizedSummary}
                        >
                          <Zap className="w-3.5 h-3.5 fill-current text-yellow-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleDownload(item.id, item.chapters[0].id);
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-cyan-300 border border-neutral-700 shadow-lg backdrop-blur-md"
                          title={t.downloadEpisode}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Persistent Audio Player at Bottom */}
      <AudioPlayer
        item={currentItem}
        chapter={currentChapter}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        settings={playbackSettings}
        language={language}
        comments={comments}
        isDownloaded={isCurrentChapterDownloaded}
        isFavorite={Boolean(currentItem && currentUser?.favoriteItemIds?.includes(currentItem.id))}
        onToggleFavorite={handleToggleFavorite}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onSkipSeconds={handleSkipSeconds}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        onChangeSpeed={handleChangeSpeed}
        onChangeVolume={(vol) => setPlaybackSettings((prev) => ({ ...prev, volume: vol }))}
        onToggleMute={() => setPlaybackSettings((prev) => ({ ...prev, isMuted: !prev.isMuted }))}
        onSetSleepTimer={handleSetSleepTimer}
        sleepTimerRemaining={sleepTimerRemaining}
        onChangeAmbientSound={handleChangeAmbientSound}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenAICompanion={() => setIsAIOpen(true)}
        onOpenChapterList={() => setChapterModalItem(currentItem)}
        onBookmarkLast30={handleBookmarkLast30}
        onOpenBookmarks={() => setIsBookmarkModalOpen(true)}
        onOpenComments={() => setIsCommentsOpen(true)}
        onOpenRecap={() => handleOpenRecap(currentItem || undefined, currentChapter || undefined)}
        onOpenBiteSummary={() => setIsBiteSummaryOpen(true)}
        onOpenSemanticSearch={() => setIsSemanticSearchOpen(true)}
        onOpenSmartDownload={() => setIsSmartDownloadOpen(true)}
        onOpenShareQuote={() => handleOpenShareQuote()}
        onSimulateHeadphoneUnplug={handleSimulateHeadphoneUnplug}
      />

      {/* Interactive Timestamped Notes Drawer */}
      <NotesPanel
        notes={notes}
        currentItem={currentItem}
        currentChapter={currentChapter}
        currentTime={currentTime}
        language={language}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onSeekToTimestamp={handleSeekFromNote}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />

      {/* Antigravity AI Analysis & Chat Drawer */}
      <AntigravityAISidebar
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        currentItem={currentItem}
        currentChapter={currentChapter}
        notes={notes}
        language={language}
      />

      {/* Chapter List Modal */}
      <ChapterListModal
        item={chapterModalItem}
        currentChapterId={currentChapter?.id}
        savedProgress={chapterModalItem ? savedProgressMap[chapterModalItem.id] : null}
        isOpen={Boolean(chapterModalItem)}
        language={language}
        onClose={() => setChapterModalItem(null)}
        onSelectChapter={handleSelectChapterFromModal}
      />

      {/* 1. Audio Bookmarks & Quotes Modal */}
      <AudioBookmarkModal
        isOpen={isBookmarkModalOpen}
        onClose={() => setIsBookmarkModalOpen(false)}
        bookmarks={audioBookmarks}
        language={language}
        onDeleteBookmark={handleDeleteBookmark}
        onSeekTo={(seconds) => {
          handleSeek(seconds);
          setIsBookmarkModalOpen(false);
        }}
        onOpenShareCard={(bm) => {
          setSelectedBookmarkForCard(bm);
          setIsBookmarkModalOpen(false);
          setIsQuoteCardOpen(true);
        }}
      />

      {/* 2. Smart Offline Storage & Memory Management Modal */}
      <SmartDownloadModal
        isOpen={isSmartDownloadOpen}
        onClose={() => setIsSmartDownloadOpen(false)}
        downloads={downloads}
        settings={offlineSettings}
        language={language}
        onUpdateSettings={handleUpdateOfflineSettings}
        onDeleteDownload={handleDeleteDownload}
        onCleanStorage={handleCleanListenedDownloads}
      />

      {/* 3. Recap Mode Modal ("Önceki Bölümlerde Neler Oldu?") */}
      <RecapModal
        isOpen={isRecapOpen}
        onClose={() => setIsRecapOpen(false)}
        item={recapModalContext?.item || currentItem}
        chapter={recapModalContext?.chapter || currentChapter}
        progressSeconds={currentTime}
        language={language}
        onResumeListening={() => {
          setIsRecapOpen(false);
          if (!isPlaying) {
            handlePlayPause();
          }
        }}
      />

      {/* 4. Bite-Sized (3 Dk Hap Özet) Modal */}
      <BiteSizedSummaryModal
        isOpen={isBiteSummaryOpen}
        onClose={() => setIsBiteSummaryOpen(false)}
        item={currentItem}
        chapter={currentChapter}
        language={language}
      />

      {/* 5. Semantic In-Chapter Search Modal */}
      <SemanticSearchModal
        isOpen={isSemanticSearchOpen}
        onClose={() => setIsSemanticSearchOpen(false)}
        item={currentItem}
        chapter={currentChapter}
        language={language}
        onSeekTo={(seconds) => {
          handleSeek(seconds);
          setIsSemanticSearchOpen(false);
        }}
      />

      {/* 6. Timestamped Comments Modal & Drop Pin */}
      <TimestampCommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={comments}
        item={currentItem}
        chapter={currentChapter}
        currentTime={currentTime}
        language={language}
        onAddComment={handleAddComment}
        onSeekTo={(seconds) => {
          handleSeek(seconds);
        }}
      />

      {/* 7. Quote Sharing Card Studio Modal */}
      <QuoteSharingCardModal
        isOpen={isQuoteCardOpen}
        onClose={() => setIsQuoteCardOpen(false)}
        bookmark={selectedBookmarkForCard}
        item={currentItem}
        language={language}
        onShowToast={(message) => {
          setActiveToast({
            id: `quote-toast-${Date.now()}`,
            title: language === 'en' ? 'Quote Studio' : 'Alıntı Stüdyosu',
            message,
            dateFormatted: t.justNow,
            read: false,
            targetItemId: currentItem?.id || '',
            type: 'system',
          });
        }}
      />

      {/* 8. User Profile & Favorites Modal */}
      {currentUser && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          lang={language}
          user={currentUser}
          favorites={currentUser.favoriteItemIds || []}
          libraryItems={library}
          downloadedChapters={downloads}
          audioBookmarks={audioBookmarks}
          notes={notes}
          onPlayItem={(item, chapter) => {
            setIsProfileModalOpen(false);
            handlePlayItem(item, chapter);
          }}
          onToggleFavorite={handleToggleFavorite}
          onDeleteDownload={handleDeleteDownload}
          onDeleteBookmark={handleDeleteBookmark}
          onLogout={handleLogout}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            setActiveToast({
              id: `profile-update-${Date.now()}`,
              title: language === 'en' ? 'Profile' : 'Profil',
              message: language === 'en' ? 'Profile details saved successfully' : 'Profil bilgileri güncellendi',
              dateFormatted: t.justNow,
              read: false,
              targetItemId: '',
              type: 'system',
            });
          }}
        />
      )}

      {/* 9. Sign In & Register Modal with Custom Personal ID */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={language}
        initialMode={authInitialMode}
        onSuccess={handleAuthSuccess}
      />

      {/* 10. Add Custom Audiobook & Podcast Modal (Google & Antigravity Powered) */}
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        language={language}
        onItemAdded={handleAddItem}
      />

    </div>
  );
}
