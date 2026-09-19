import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Heart,
  Download,
  Bookmark,
  FileText,
  Clock,
  Shield,
  Copy,
  Check,
  Play,
  Trash2,
  ExternalLink,
  Flame,
  Headphones,
  Award,
  LogOut,
  Sparkles,
  HardDrive,
  Lock,
  Key,
  Eye,
  EyeOff,
  Edit3,
  Save,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sliders,
  KeyRound
} from 'lucide-react';
import { UserProfile, LibraryItem, Chapter, DownloadedChapter, AudioBookmark, Note } from '../types';
import { TRANSLATIONS, AppLanguage } from '../utils/i18n';
import { changeUserPassword, resetUserPassword, updateUserAccount, generateSecurePassword } from '../utils/authStorage';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: AppLanguage;
  user: UserProfile;
  favorites: string[]; // List of item IDs
  libraryItems: LibraryItem[];
  downloadedChapters: DownloadedChapter[];
  audioBookmarks: AudioBookmark[];
  notes: Note[];
  onPlayItem: (item: LibraryItem, chapter?: Chapter) => void;
  onToggleFavorite: (itemId: string) => void;
  onDeleteDownload: (chapterId: string) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

const PRESET_AVATARS = [
  { id: 'av-1', label: 'Klasik', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { id: 'av-2', label: 'Gezgin', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
  { id: 'av-3', label: 'Kitapsever', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { id: 'av-4', label: 'Podcast Yayıncısı', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'av-5', label: 'Bilim İnsanı', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
  { id: 'av-6', label: 'Felsefeci', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  user,
  favorites,
  libraryItems,
  downloadedChapters,
  audioBookmarks,
  notes,
  onPlayItem,
  onToggleFavorite,
  onDeleteDownload,
  onDeleteBookmark,
  onLogout,
  onUpdateUser,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'favorites' | 'downloads' | 'bookmarks' | 'notes' | 'edit_profile' | 'security'>('favorites');
  const [copiedId, setCopiedId] = useState(false);

  // Edit Profile Form State
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [bioInput, setBioInput] = useState(user.bio || '');
  const [avatarInput, setAvatarInput] = useState(user.avatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Management State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  // Synchronize when user changes
  useEffect(() => {
    setNameInput(user.name);
    setEmailInput(user.email);
    setBioInput(user.bio || '');
    setAvatarInput(user.avatar);
  }, [user]);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Password Strength Calculation
  const calculateStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 5
  };

  const passwordStrengthScore = calculateStrength(newPassword);

  const getStrengthLabel = () => {
    if (passwordStrengthScore <= 2) return { label: t.weak, color: 'text-rose-400', bg: 'bg-rose-500', width: 'w-1/3' };
    if (passwordStrengthScore <= 3) return { label: t.medium, color: 'text-amber-400', bg: 'bg-amber-500', width: 'w-2/3' };
    return { label: t.strong, color: 'text-emerald-400', bg: 'bg-emerald-500', width: 'w-full' };
  };

  // Generate strong password
  const handleGenerateStrongPassword = () => {
    const generated = generateSecurePassword(14);
    setNewPassword(generated);
    setConfirmPassword(generated);
    setShowNewPassword(true);
    setShowConfirmPassword(true);
    setPasswordError(null);
    setPasswordSuccess(
      lang === 'tr'
        ? 'Rastgele 14 karakterli güçlü şifre oluşturuldu ve alanlara yazıldı.'
        : 'A 14-character secure random password has been generated and populated.'
    );
  };

  // Handle Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);

    if (!nameInput.trim()) {
      setProfileError(lang === 'tr' ? 'Lütfen geçerli bir isim girin.' : 'Please enter a valid name.');
      return;
    }

    if (!emailInput.trim() || !emailInput.includes('@')) {
      setProfileError(lang === 'tr' ? 'Lütfen geçerli bir e-posta adresi girin.' : 'Please enter a valid email.');
      return;
    }

    setIsSavingProfile(true);
    setTimeout(() => {
      const result = updateUserAccount(user.id, {
        name: nameInput.trim(),
        email: emailInput.trim(),
        bio: bioInput.trim(),
        avatar: avatarInput,
      });

      setIsSavingProfile(false);
      if (result.success && result.user) {
        setProfileSuccess(t.profileUpdatedSuccess);
        if (onUpdateUser) {
          onUpdateUser(result.user);
        }
      } else {
        setProfileError(result.error || (lang === 'tr' ? 'Profil güncellenirken hata oluştu.' : 'Failed to update profile.'));
      }
    }, 400);
  };

  // Handle Password Change & Direct Reset
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!isResetMode && !currentPassword.trim()) {
      setPasswordError(t.passwordEmptyError);
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError(t.passwordTooShortError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(t.passwordMismatchError);
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      const result = isResetMode
        ? resetUserPassword(user.id, newPassword)
        : changeUserPassword(user.id, currentPassword, newPassword);

      setIsChangingPassword(false);

      if (result.success) {
        setPasswordSuccess(
          lang === 'tr'
            ? 'Şifreniz başarıyla güncellendi ve kaydedildi!'
            : t.passwordChangedSuccess
        );
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsResetMode(false);
      } else {
        setPasswordError(result.error || t.currentPasswordWrongError);
      }
    }, 300);
  };

  // Filtered favorite items
  const favoriteItems = libraryItems.filter((item) => favorites.includes(item.id));

  // Calculate total downloaded size
  const totalDownloadedMb = downloadedChapters.reduce((acc, curr) => acc + (curr.sizeMb || 4.2), 0);

  return (
    <div
      id="profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="profile-modal-card"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-profile-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Profile Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-amber-950/60 via-neutral-900 to-neutral-950 border-b border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl shrink-0 bg-neutral-800">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-neutral-950 text-[10px] font-bold text-center py-0.5">
                PRO
              </div>
            </div>

            {/* Info & ID */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white truncate">{user.name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{user.membershipTier}</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400 truncate mb-2">{user.email}</p>

              {/* Bio if exists */}
              {user.bio && (
                <p className="text-xs text-neutral-300 italic line-clamp-2 mb-3 bg-neutral-950/40 px-3 py-1.5 rounded-lg border border-neutral-800/80">
                  "{user.bio}"
                </p>
              )}

              {/* Kişiye Özel ID Badge & Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-xs">
                  <span className="text-neutral-400">{t.personalId}:</span>
                  <span className="font-mono font-bold text-amber-300 tracking-wider">
                    {user.id}
                  </span>
                  <button
                    id="btn-copy-user-id"
                    onClick={handleCopyId}
                    className="p-1 rounded-md text-neutral-400 hover:text-amber-300 hover:bg-neutral-800 transition-colors ml-1 cursor-pointer flex items-center gap-1 text-[11px]"
                    title={t.copyId}
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{lang === 'tr' ? 'Kopyalandı' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyId}</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  id="btn-quick-edit-profile"
                  onClick={() => setActiveTab('edit_profile')}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-amber-400" />
                  <span>{t.editProfile}</span>
                </button>

                <button
                  id="btn-quick-change-password"
                  onClick={() => setActiveTab('security')}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{t.changePassword}</span>
                </button>
              </div>
            </div>

            {/* Quick Logout Button */}
            <button
              id="btn-profile-logout"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="mt-2 sm:mt-0 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800/80 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-700 hover:border-red-500/40 transition-colors flex items-center gap-1.5 cursor-pointer self-end sm:self-center"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logout}</span>
            </button>
          </div>

          {/* User Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-800/80">
            <div className="p-2.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.totalHours}</span>
              </div>
              <span className="text-lg font-bold text-white">{user.totalHoursListened} {t.hours}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{t.listeningStreak}</span>
              </div>
              <span className="text-lg font-bold text-white">{user.streakDays} {t.days}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>{t.tabFavorites}</span>
              </div>
              <span className="text-lg font-bold text-white">{favorites.length}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.tabDownloads}</span>
              </div>
              <span className="text-lg font-bold text-white">{downloadedChapters.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-neutral-800 overflow-x-auto bg-neutral-950/40">
          <button
            id="tab-profile-favorites"
            onClick={() => setActiveTab('favorites')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>{t.tabFavorites} ({favorites.length})</span>
          </button>

          <button
            id="tab-profile-downloads"
            onClick={() => setActiveTab('downloads')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'downloads'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{t.tabDownloads} ({downloadedChapters.length})</span>
          </button>

          <button
            id="tab-profile-bookmarks"
            onClick={() => setActiveTab('bookmarks')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'bookmarks'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>{t.tabAudioBookmarks} ({audioBookmarks.length})</span>
          </button>

          <button
            id="tab-profile-notes"
            onClick={() => setActiveTab('notes')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'notes'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>{t.tabMyNotes} ({notes.length})</span>
          </button>

          <button
            id="tab-profile-edit"
            onClick={() => setActiveTab('edit_profile')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'edit_profile'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>{t.tabEditProfile}</span>
          </button>

          <button
            id="tab-profile-security"
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-violet-400" />
            <span>{t.tabPasswordSecurity}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: FAVORITES */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteItems.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
                    <Heart className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{t.favoritesEmpty}</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto mb-5">
                    {lang === 'tr'
                      ? 'Beğendiğiniz kitapların ve podcastlerin üzerindeki kalp simgesine tıklayarak favorilerinize kaydedebilirsiniz.'
                      : 'Click the heart icon on any audiobook or podcast to save it directly to your profile favorites.'}
                  </p>
                  <button
                    id="btn-explore-catalog-from-favorites"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.exploreLibrary}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all group"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                        <p className="text-xs text-neutral-400 truncate">{item.authorOrHost}</p>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">
                          {item.totalDurationFormatted}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          id={`btn-play-favorite-${item.id}`}
                          onClick={() => {
                            onPlayItem(item);
                            onClose();
                          }}
                          className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
                          title="Dinle"
                        >
                          <Play className="w-4 h-4 fill-neutral-950" />
                        </button>
                        <button
                          id={`btn-remove-favorite-${item.id}`}
                          onClick={() => onToggleFavorite(item.id)}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-rose-400 hover:text-red-300 transition-colors cursor-pointer"
                          title={t.removeFromFavorites}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div>
              {/* Storage Gauge */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {lang === 'tr' ? 'Çevrimdışı Depolama Alanı' : 'Offline Device Storage'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {totalDownloadedMb.toFixed(1)} MB {lang === 'tr' ? 'kullanılıyor / 5.0 GB limit' : 'used / 5.0 GB limit'}
                    </span>
                  </div>
                </div>
                <div className="w-28 sm:w-36 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, (totalDownloadedMb / 5120) * 100 + 5)}%` }}
                  />
                </div>
              </div>

              {downloadedChapters.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                    <Download className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {lang === 'tr' ? 'İndirilen Bölüm Bulunmuyor' : 'No Downloaded Episodes'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto mb-5">
                    {lang === 'tr'
                      ? 'İnternet bağlantınız olmadan da dinlemek için bölümleri cihazınıza indirebilirsiniz.'
                      : 'Download book chapters and podcast episodes to listen on airplanes and without Wi-Fi.'}
                  </p>
                  <button
                    id="btn-explore-catalog-from-downloads"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.exploreLibrary}
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {downloadedChapters.map((dl) => {
                    const parentItem = libraryItems.find((i) => i.id === dl.itemId);
                    const chapter = parentItem?.chapters.find((c) => c.id === dl.chapterId);

                    return (
                      <div
                        key={dl.chapterId}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {parentItem?.coverImage && (
                            <img
                              src={parentItem.coverImage}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-emerald-400 font-semibold uppercase flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              {lang === 'tr' ? 'Çevrimdışı Hazır' : 'Offline Ready'} • {dl.sizeMb} MB
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">{dl.title}</h4>
                            <p className="text-xs text-neutral-400 truncate">{dl.itemTitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {parentItem && chapter && (
                            <button
                              id={`btn-play-download-${dl.chapterId}`}
                              onClick={() => {
                                onPlayItem(parentItem, chapter);
                                onClose();
                              }}
                              className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
                              title="Oynat"
                            >
                              <Play className="w-4 h-4 fill-neutral-950" />
                            </button>
                          )}
                          <button
                            id={`btn-delete-download-${dl.chapterId}`}
                            onClick={() => onDeleteDownload(dl.chapterId)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-300 transition-colors cursor-pointer"
                            title={t.removeFromDownloads}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AUDIO BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div>
              {audioBookmarks.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Bookmark className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">{t.noAudioBookmarks}</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    {t.noAudioBookmarksDesc}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {audioBookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold">
                            {Math.floor(bm.startSeconds / 60)}:{String(Math.floor(bm.startSeconds % 60)).padStart(2, '0')} -{' '}
                            {Math.floor(bm.endSeconds / 60)}:{String(Math.floor(bm.endSeconds % 60)).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-semibold text-white">{bm.chapterTitle}</span>
                        </div>
                        <p className="text-xs text-neutral-300 italic line-clamp-2">
                          "{bm.snippet}"
                        </p>
                      </div>
                      <button
                        onClick={() => onDeleteBookmark(bm.id)}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-300 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MY NOTES */}
          {activeTab === 'notes' && (
            <div>
              {notes.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <FileText className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">
                    {lang === 'tr' ? 'Henüz not almadınız' : 'No notes created yet'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    {lang === 'tr'
                      ? 'Dinlerken önemli gördüğünüz yerlerde zaman damgalı notlar ve alıntılar kaydedebilirsiniz.'
                      : 'Add timestamped ideas and memorable quotes while listening to any chapter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-amber-400">{note.itemTitle}</span>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {note.timestampFormatted}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-200">{note.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EDIT PROFILE */}
          {activeTab === 'edit_profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 max-w-xl">
              {/* Success / Error Messages */}
              {profileSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{profileSuccess}</span>
                </div>
              )}
              {profileError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{profileError}</span>
                </div>
              )}

              {/* Avatar Selector Section */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <label className="text-xs font-bold text-white block">
                  {t.chooseAvatar}
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-500 shadow-md shrink-0 bg-neutral-800">
                    <img src={avatarInput} alt={nameInput} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-neutral-400 block mb-2">
                      {lang === 'tr' ? 'Hazır avatarlardan seçin veya aşağıya kendi görsel bağlantınızı girin:' : 'Choose a preset avatar or provide your custom image link below:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_AVATARS.map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setAvatarInput(av.url)}
                          className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            avatarInput === av.url ? 'border-amber-400 ring-2 ring-amber-500/30 scale-105' : 'border-neutral-700 opacity-70 hover:opacity-100'
                          }`}
                          title={av.label}
                        >
                          <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom Avatar URL */}
                <div className="pt-2">
                  <span className="text-[11px] text-neutral-400 block mb-1">{t.customAvatarUrl}</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customAvatarUrl.trim()) {
                          setAvatarInput(customAvatarUrl.trim());
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
                    >
                      {lang === 'tr' ? 'Uygula' : 'Apply'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">{t.fullName}</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">{t.email}</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">{t.bioLabel}</label>
                  <textarea
                    rows={3}
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    placeholder={t.bioPlaceholder}
                    maxLength={300}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                  <div className="text-right text-[10px] text-neutral-500 mt-1">
                    {bioInput.length}/300
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? (lang === 'tr' ? 'Kaydediliyor...' : 'Saving...') : t.saveChanges}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: SECURITY & PASSWORD MANAGEMENT */}
          {activeTab === 'security' && (
            <div className="space-y-5 max-w-xl">
              {/* PASSWORD CHANGE & CREATION FORM */}
              <form onSubmit={handleChangePassword} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>{t.changePassword}</span>
                  </h4>
                  <span className="text-[11px] text-amber-400/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {lang === 'tr' ? 'Korumalı Hesap' : 'Secured Account'}
                  </span>
                </div>

                {passwordSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {/* Mode Selector / Direct Reset Option */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-neutral-200 font-medium">
                      {isResetMode
                        ? (lang === 'tr' ? 'Doğrudan Şifre Sıfırlama Modu' : 'Direct Password Reset Mode')
                        : (lang === 'tr' ? 'Mevcut Şifre Doğrulamalı Mod' : 'Current Password Verification Mode')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(!isResetMode);
                      setPasswordError(null);
                      setPasswordSuccess(null);
                    }}
                    className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer text-left sm:text-right"
                  >
                    {isResetMode
                      ? (lang === 'tr' ? 'Mevcut Şifremi Girmek İstiyorum' : 'I want to enter current password')
                      : (lang === 'tr' ? 'Şifremi Hatırlamıyorum / Eski Şifresiz Sıfırla' : 'Forgot password / Reset without old password')}
                  </button>
                </div>

                {/* Current Password Field (Only when NOT in resetMode) */}
                {!isResetMode ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        {t.currentPassword}
                      </label>
                      <button
                        type="button"
                        onClick={() => setCurrentPassword('Password123!')}
                        className="text-[10px] text-neutral-400 hover:text-amber-400 cursor-pointer underline transition-colors"
                      >
                        {lang === 'tr' ? 'Varsayılan Şifreyi Doldur (Password123!)' : 'Fill default (Password123!)'}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1.5">
                      {lang === 'tr'
                        ? 'İpucu: Mevcut şifre alanına varsayılan "Password123!" veya Kişisel ID numaranızı da yazabilirsiniz.'
                        : 'Tip: You can also use default "Password123!" or your Personal ID.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">
                        {lang === 'tr' ? 'Giriş Yapılmış Güvenli Oturum' : 'Authenticated Secure Session'}
                      </span>
                      <span className="text-[11px] text-amber-200/90 leading-relaxed block">
                        {lang === 'tr'
                          ? 'Hesabınıza zaten giriş yapmış olduğunuz için eski şifrenizi hatırlamanıza gerek yoktur. Aşağıdan yeni şifrenizi belirleyip doğrudan kaydedebilirsiniz.'
                          : 'Since you are already logged in, you do not need your old password. Simply set and confirm your new password below.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* New Password Field & Generator */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      {t.newPassword}
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateStrongPassword}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{t.generateStrongPassword}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={lang === 'tr' ? 'En az 6 karakter...' : 'At least 6 characters...'}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength Meter */}
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">{t.passwordStrength}:</span>
                        <span className={`font-semibold ${getStrengthLabel().color}`}>{getStrengthLabel().label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className={`h-full ${getStrengthLabel().bg} ${getStrengthLabel().width} transition-all duration-300 rounded-full`} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    {t.confirmNewPassword}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && (
                    <div className="mt-1 text-[11px]">
                      {newPassword === confirmPassword ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-medium">
                          <Check className="w-3 h-3" /> {lang === 'tr' ? 'Şifreler eşleşiyor' : 'Passwords match'}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> {t.passwordMismatchError}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Change Password Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      isChangingPassword ||
                      (!isResetMode && !currentPassword.trim()) ||
                      !newPassword ||
                      newPassword.length < 6 ||
                      newPassword !== confirmPassword
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Key className="w-4 h-4" />
                    <span>
                      {isChangingPassword
                        ? (lang === 'tr' ? 'Güncelleniyor...' : 'Updating...')
                        : isResetMode
                        ? (lang === 'tr' ? 'Yeni Şifreyi Kaydet ve Uygula' : 'Reset & Save Password')
                        : (lang === 'tr' ? 'Şifreyi Güncelle ve Kaydet' : 'Update & Save Password')}
                    </span>
                  </button>
                </div>
              </form>

              {/* Personal Account ID */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'tr' ? 'Kişisel Hesap Kimliği' : 'Personal Account Identity'}</span>
                </h4>
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-700/80">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">{t.personalId}</span>
                    <span className="text-sm font-mono font-bold text-amber-300 tracking-wider">
                      {user.id}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyId}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? (lang === 'tr' ? 'Kopyalandı' : 'Copied') : t.copyId}</span>
                  </button>
                </div>
                <p className="text-xs text-neutral-400">
                  {lang === 'tr'
                    ? 'Bu ID numarası cihazlar arası senkronizasyon ve müşteri desteğinde kimliğinizi doğrulamak için kullanılır.'
                    : 'Use this personal ID for device syncing and immediate identity verification.'}
                </p>
              </div>

              {/* Language & Voice info */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
                <h4 className="text-sm font-bold text-white mb-2">
                  {lang === 'tr' ? 'Çift Dil & Seslendirme Desteği' : 'Bilingual & Narration Support'}
                </h4>
                <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
                  {lang === 'tr'
                    ? 'Tüm sesli kitaplar, podcastler ve görselleştirici sahneler hem Türkçe hem İngilizce tam metin ve ses desteğiyle donatılmıştır.'
                    : 'All audiobooks, podcasts, and video visualizers are equipped with native English and Turkish narration and transcripts.'}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? t.englishVoiceActive : t.turkishVoiceActive}</span>
                </div>
              </div>

              {/* Logout Action */}
              <div className="pt-2">
                <button
                  id="btn-profile-signout"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 hover:text-red-100 border border-red-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
