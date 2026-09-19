import React, { useState } from 'react';
import { 
  Headphones, 
  Moon, 
  Sun, 
  Bell, 
  Sparkles, 
  Search, 
  Bookmark, 
  Radio, 
  BookOpen, 
  Check, 
  Play,
  X,
  Languages,
  BookmarkCheck,
  Download,
  Heart,
  User,
  KeyRound,
  Plus,
  Globe
} from 'lucide-react';
import { ThemeMode, AppNotification, LibraryItem, AppLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  language: AppLanguage;
  onToggleLanguage: (lang: AppLanguage) => void;
  activeTab: 'all' | 'audiobooks' | 'podcasts' | 'notes';
  onSelectTab: (tab: 'all' | 'audiobooks' | 'podcasts' | 'notes') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onPlayNotificationItem: (itemId: string, chapterId?: string) => void;
  onSimulateNewNotification: () => void;
  libraryItems: LibraryItem[];
  bookmarksCount?: number;
  downloadsCount?: number;
  favoritesCount?: number;
  onOpenBookmarks?: () => void;
  onOpenDownloads?: () => void;
  onOpenFavorites?: () => void;
  onOpenAddItem?: () => void;
  currentUser?: UserProfile | null;
  onOpenProfile?: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkNotificationRead,
  onPlayNotificationItem,
  onSimulateNewNotification,
  libraryItems,
  bookmarksCount = 0,
  downloadsCount = 0,
  favoritesCount = 0,
  onOpenBookmarks,
  onOpenDownloads,
  onOpenFavorites,
  onOpenAddItem,
  currentUser,
  onOpenProfile,
  onOpenAuth,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const t = TRANSLATIONS[language];
  const isEn = language === 'en';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 border-neutral-800/80 bg-neutral-900/90 dark:border-neutral-800/80 dark:bg-neutral-950/90 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('all')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 shadow-md shadow-amber-500/20">
              <Headphones className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-neutral-100 to-indigo-200 bg-clip-text text-transparent">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> {t.aiBadge}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-neutral-800/60 border border-neutral-700/50">
            <button
              onClick={() => onSelectTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
              }`}
            >
              {t.tabAll}
            </button>
            <button
              onClick={() => onSelectTab('audiobooks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'audiobooks'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> {t.tabAudiobooks}
            </button>
            <button
              onClick={() => onSelectTab('podcasts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'podcasts'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
              }`}
            >
              <Radio className="w-3.5 h-3.5" /> {t.tabPodcasts}
            </button>
            <button
              onClick={() => onSelectTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'notes'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> {t.tabNotes}
            </button>
          </nav>

          {/* Search Bar with Google & Antigravity indicator */}
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isEn ? 'Search Google & Antigravity library...' : 'Google & Antigravity ile ara veya keşfet...'}
              className="w-full pl-9 pr-24 py-1.5 rounded-xl text-xs bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-0.5">
                <Globe className="w-2.5 h-2.5" />
                <span>Google</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Add Book / Podcast Button */}
            {onOpenAddItem && (
              <button
                id="header-add-item-button"
                onClick={onOpenAddItem}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-sm transition-all"
                title={isEn ? 'Add Book or Podcast' : 'Yeni Kitap veya Podcast Ekle'}
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden md:inline">{isEn ? 'Add' : 'Eser Ekle'}</span>
              </button>
            )}

            {/* Language Switcher (TR | EN) */}
            <div 
              id="header-language-toggle"
              className="flex items-center p-0.5 rounded-xl bg-neutral-800/90 border border-neutral-700/80 text-xs font-bold"
              title={t.languageSelect}
            >
              <button
                id="btn-lang-tr"
                onClick={() => onToggleLanguage('tr')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'tr'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Türkçe"
              >
                TR
              </button>
              <button
                id="btn-lang-en"
                onClick={() => onToggleLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Audio Bookmarks Button */}
            {onOpenBookmarks && (
              <button
                id="header-bookmarks-button"
                onClick={onOpenBookmarks}
                className="relative p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700/60 transition-colors"
                title={t.audioBookmarks}
              >
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                {bookmarksCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[17px] h-[17px] text-[9px] font-bold text-neutral-950 bg-amber-400 rounded-full ring-2 ring-neutral-900">
                    {bookmarksCount}
                  </span>
                )}
              </button>
            )}

            {/* Smart Offline Downloads Button */}
            {onOpenDownloads && (
              <button
                id="header-downloads-button"
                onClick={onOpenDownloads}
                className="relative p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700/60 transition-colors"
                title={t.smartOffline}
              >
                <Download className="w-4 h-4 text-cyan-400" />
                {downloadsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[17px] h-[17px] text-[9px] font-bold text-neutral-950 bg-cyan-400 rounded-full ring-2 ring-neutral-900">
                    {downloadsCount}
                  </span>
                )}
              </button>
            )}

            {/* Favorites Button */}
            {onOpenFavorites && (
              <button
                id="header-favorites-button"
                onClick={onOpenFavorites}
                className="relative p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700/60 transition-colors"
                title={t.tabFavorites}
              >
                <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-neutral-400'}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[17px] h-[17px] text-[9px] font-bold text-neutral-950 bg-rose-500 rounded-full ring-2 ring-neutral-900">
                    {favoritesCount}
                  </span>
                )}
              </button>
            )}

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                id="header-notification-button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700/60 transition-colors"
                title={t.notificationsTitle}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-neutral-950 bg-amber-400 rounded-full ring-2 ring-neutral-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popup Dropdown */}
              {showNotifications && (
                <div 
                  id="notifications-popover" 
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl shadow-black/80 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950/60">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-neutral-100">{t.notificationsTitle}</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {unreadCount} {t.newBadge}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-neutral-400">
                        {t.noNotifications}
                      </div>
                    ) : (
                      notifications.map((notif) => {
                        return (
                          <div 
                            key={notif.id}
                            className={`p-3.5 transition-colors ${
                              notif.read ? 'bg-neutral-900/40 opacity-75' : 'bg-neutral-800/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                                  {!notif.read && (
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                  )}
                                  {notif.title}
                                </h4>
                                <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-neutral-400 mt-1 block">
                                  {notif.dateFormatted}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={() => {
                                  onMarkNotificationRead(notif.id);
                                  onPlayNotificationItem(notif.targetItemId, notif.targetChapterId);
                                  setShowNotifications(false);
                                }}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm"
                              >
                                <Play className="w-3 h-3 fill-current" /> {t.listenNow}
                              </button>
                              {!notif.read && (
                                <button
                                  onClick={() => onMarkNotificationRead(notif.id)}
                                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                                >
                                  <Check className="w-3 h-3" /> {t.markRead}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Notification Bottom Actions */}
                  <div className="p-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={onSimulateNewNotification}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> {t.testNotification}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Gece Modu (Dark / Light / OLED Night Mode Switcher) */}
            <button
              id="header-theme-toggle"
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 text-neutral-200 transition-colors"
              title={`${t.modeTooltip}: ${theme === 'night' ? t.themeNight : theme === 'oled' ? t.themeOled : t.themeLight}`}
            >
              {theme === 'night' ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline text-[11px]">{t.themeNight}</span>
                </>
              ) : theme === 'oled' ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-neutral-600 ring-1 ring-neutral-400"></div>
                  <span className="hidden sm:inline text-[11px]">{t.themeOled}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">{t.themeLight}</span>
                </>
              )}
            </button>

            {/* User Profile / Login Button */}
            {currentUser ? (
              <button
                id="header-user-profile-button"
                onClick={onOpenProfile}
                className="flex items-center gap-2 p-1 pl-2 sm:pr-3 rounded-xl bg-neutral-800/90 hover:bg-neutral-700/90 border border-neutral-700/80 text-neutral-100 transition-all cursor-pointer group"
                title={`${t.profile}: ${currentUser.name} (${currentUser.id})`}
              >
                <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-amber-500/50 shrink-0">
                  <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white leading-tight group-hover:text-amber-300 transition-colors truncate max-w-[90px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-mono text-amber-400 font-semibold leading-none">
                    {currentUser.id}
                  </span>
                </div>
              </button>
            ) : (
              <button
                id="header-login-button"
                onClick={() => onOpenAuth?.('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.login}</span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex sm:hidden flex-col gap-2 py-2 border-t border-neutral-800/60">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/80" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isEn ? 'Google & Antigravity search...' : 'Google & Antigravity ara...'}
                className="w-full pl-8 pr-16 py-1.5 rounded-xl text-xs bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold px-1 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Google
              </span>
            </div>

            {onOpenAddItem && (
              <button
                onClick={onOpenAddItem}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold text-xs bg-amber-500 text-neutral-950 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isEn ? 'Add' : 'Ekle'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between overflow-x-auto gap-2">
            <button
              onClick={() => onSelectTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
                activeTab === 'all' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-300'
              }`}
            >
              {t.tabAll}
            </button>
            <button
              onClick={() => onSelectTab('audiobooks')}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
                activeTab === 'audiobooks' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-300'
              }`}
            >
              {t.tabAudiobooks}
            </button>
            <button
              onClick={() => onSelectTab('podcasts')}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
                activeTab === 'podcasts' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-300'
              }`}
            >
              {t.tabPodcasts}
            </button>
            <button
              onClick={() => onSelectTab('notes')}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
                activeTab === 'notes' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-300'
              }`}
            >
              {t.tabNotes}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
