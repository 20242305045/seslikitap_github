export type ItemType = 'audiobook' | 'podcast';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  durationSeconds: number;
  formattedDuration: string;
  summary: string;
  script: string;
  releaseDate?: string;
  isNew?: boolean;
}

export interface LibraryItem {
  id: string;
  type: ItemType;
  title: string;
  authorOrHost: string;
  narrator?: string;
  category: string;
  coverImage: string;
  gradient: string;
  rating: number;
  totalDurationFormatted: string;
  totalDurationSeconds: number;
  description: string;
  isNewEpisodeAvailable?: boolean;
  latestEpisodeTitle?: string;
  chapters: Chapter[];
  isCustom?: boolean;
  sourceUrl?: string;
}

export type NoteCategory = 'idea' | 'quote' | 'question' | 'summary';

export interface Note {
  id: string;
  itemId: string;
  chapterId: string;
  itemTitle: string;
  chapterTitle: string;
  timestampSeconds: number;
  timestampFormatted: string;
  text: string;
  category: NoteCategory;
  createdAt: number;
}

export interface SavedProgress {
  itemId: string;
  chapterId: string;
  progressSeconds: number;
  durationSeconds: number;
  percentage: number;
  lastPlayedAt: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  dateFormatted: string;
  read: boolean;
  targetItemId: string;
  targetChapterId?: string;
  type: 'new_episode' | 'ai_insight' | 'system';
}

export type ThemeMode = 'night' | 'light' | 'oled';
export type AppLanguage = 'tr' | 'en';

export interface PlaybackSettings {
  playbackSpeed: number; // 0.5 to 2.5
  volume: number; // 0 to 1
  isMuted: boolean;
  sleepTimerMinutes: number | null;
  ambientSound: 'none' | 'rain' | 'library' | 'vinyl';
  rewindOnResumeSeconds: number; // 0 (off), 3, 5, 10
}

export interface AudioBookmark {
  id: string;
  itemId: string;
  chapterId: string;
  itemTitle: string;
  chapterTitle: string;
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
  snippet: string;
  savedAs: 'audio' | 'transcript' | 'both';
  userNote?: string;
  createdAt: number;
}

export interface TimestampComment {
  id: string;
  itemId: string;
  chapterId: string;
  timestampSeconds: number;
  author: string;
  avatar: string;
  text: string;
  isSpoiler: boolean;
  likes: number;
  createdAt: number;
}

export interface OfflineDownloadItem {
  itemId: string;
  chapterId: string;
  title: string;
  itemTitle: string;
  sizeMb: number;
  downloadedAt: number;
  isCompleted: boolean;
  autoDeleteOnFinish: boolean;
}

export interface OfflineSettings {
  autoDownloadOnWifiOnly: boolean;
  requireCharging: boolean;
  autoDeletePlayed: boolean;
  storageLimitMb: number;
  simulatedWifi: boolean;
  simulatedCharging: boolean;
}

export interface UserProfile {
  id: string; // Kişiye özel benzersiz ID, örn: AG-7842-TR
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  membershipTier: 'Premium Member' | 'Free Explorer';
  joinedDate: string;
  streakDays: number;
  totalHoursListened: number;
  completedItemsCount: number;
  favoriteItemIds?: string[];
  downloadedItemIds?: string[];
}

export interface UserAccount extends UserProfile {
  password: string;
}

export type DownloadedChapter = OfflineDownloadItem;
