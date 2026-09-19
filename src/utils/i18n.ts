import { AppLanguage, NoteCategory } from '../types';

export type { AppLanguage };

export interface Translations {
  // Brand & Header
  appTitle: string;
  aiBadge: string;
  appSubtitle: string;
  tabAll: string;
  tabAudiobooks: string;
  tabPodcasts: string;
  tabNotes: string;
  searchPlaceholder: string;
  notificationsTitle: string;
  noNotifications: string;
  testNotification: string;
  listenNow: string;
  markRead: string;
  newBadge: string;
  languageSelect: string;
  themeNight: string;
  themeOled: string;
  themeLight: string;
  modeTooltip: string;

  // Resume Banner
  resumeTitle: string;
  typePodcast: string;
  typeAudiobook: string;
  pausedAt: string;
  remainingTime: string;
  startOver: string;
  resumePlay: string;
  close: string;

  // Library Card & General
  listen: string;
  resume: string;
  nowPlaying: string;
  newEpisodeAvailable: string;
  newEpisodeBadge: string;
  episodesCount: string;
  viewEpisodes: string;
  narratedBy: string;
  yourProgress: string;
  noResultsTitle: string;
  noResultsDesc: string;
  podcast: string;
  audiobook: string;
  podcastEpisodes: string;
  bookChapters: string;
  chaptersCount: (count: number) => string;
  resumeCurrentPoint: string;
  resumeListen: string;
  restartFromBeginning: string;
  startListen: string;
  continue: string;
  notes: string;
  dismiss: string;

  // Player Controls
  speed: string;
  playbackSpeed: string;
  speedSuffix: string;
  sleepTimer: string;
  ambientSound: string;
  ambient: string;
  ambientNone: string;
  ambientSilent: string;
  ambientRain: string;
  ambientLibrary: string;
  ambientVinyl: string;
  timerOff: string;
  minutes: string;
  timerMinutes: (m: number) => string;
  timerRemaining: string;
  rewind15: string;
  forward15: string;
  prevChapter: string;
  nextChapter: string;
  chapterList: string;
  takeNote: string;
  aiCompanion: string;
  aiCompanionTitle: string;
  aiAnalysis: string;
  aiInsights: string;
  allChapters: string;
  minimize: string;
  play: string;
  pause: string;
  narrator: string;
  narrationText: string;
  liveTracking: string;
  scriptAndTranscript: string;
  mute: string;
  unmute: string;
  expandPlayer: string;
  minimizePlayer: string;
  volume: string;
  playingWithNarration: string;

  // App & Page Layout
  myNotebook: string;
  notebookDesc: string;
  addNewNote: string;
  noNotesDesc: string;
  listenFromTimestamp: string;
  delete: string;
  exploreListen: string;
  exploreSubtitle: string;
  quickFilter: string;
  filterAll: string;
  filterPhilosophy: string;
  filterScience: string;
  allGenres: string;
  filterByGenre: string;
  viewShelves: string;
  viewGrid: string;
  showingBooksInGenre: (genre: string, count: number) => string;
  clearGenreFilter: string;
  genrePhilosophy: string;
  genreLiterature: string;
  genrePsychology: string;
  genreSciFi: string;
  genreScience: string;
  genreHistory: string;
  fourBooksPerGenre: string;
  simulatedNotificationTitle: string;
  simulatedNotificationMessage: string;
  justNow: string;

  // Notes Panel
  notesTitle: string;
  notesPanelTitle: string;
  addNote: string;
  notePlaceholder: string;
  noteInputPlaceholder: string;
  timeLabel: string;
  saveNote: string;
  filterAllNotes: string;
  filterCurrentItem: string;
  filterAllItems: string;
  thisItemNotes: string;
  allNotes: string;
  categoryIdea: string;
  categoryQuote: string;
  categoryQuestion: string;
  categorySummary: string;
  catIdea: string;
  catQuote: string;
  catQuestion: string;
  catSummary: string;
  synthesizeNotes: string;
  synthesizeWithAi: string;
  synthesizingAI: string;
  synthesizing: string;
  aiSynthesisHeader: string;
  exportMarkdown: string;
  copyNote: string;
  copyText: string;
  copied: string;
  deleteNote: string;
  noNotesYet: string;
  noNotesSub: string;
  jumpToTimestamp: string;
  jumpToTime: string;
  noteCreated: string;
  generalNote: string;

  // AI Companion
  companionTitle: string;
  companionSubtitle: string;
  liveAnalysis: string;
  tabAnalysis: string;
  analysisTab: string;
  tabChat: string;
  chatTab: string;
  insightReport: string;
  analyzingDeeply: string;
  analyzingContent: string;
  analyzingSub: string;
  reanalyze: string;
  reAnalyze: string;
  analysisFailed: string;
  askAiWelcome: string;
  askAiSub: string;
  aiThinking: string;
  suggestedQuestions: string;
  sampleQ1: string;
  sampleQ2: string;
  sampleQ3: string;
  chatPlaceholder: string;
  askQuestionPlaceholder: string;
  send: string;
  thinking: string;
  you: string;

  // Chapter List Modal
  chaptersModalTitle: string;
  chapterNumber: string;
  playThisChapter: string;
  resumeThisChapter: string;
  newLabel: string;

  // New Features (Audio Bookmark, Karaoke, Smart Offline, Rewind, Recap, Search, Bite-Sized, SoundCloud Comments, Quote Cards)
  bookmarkLast30: string;
  bookmarkLast30Success: string;
  audioBookmarks: string;
  myAudioBookmarks: string;
  saveAsAudio: string;
  saveAsTranscript: string;
  playSnippet: string;
  stopSnippet: string;
  snippetSaved: string;
  noAudioBookmarks: string;
  noAudioBookmarksDesc: string;

  syncTranscript: string;
  karaokeMode: string;
  clickWordToJump: string;
  autoScroll: string;

  smartOffline: string;
  offlineDownloads: string;
  downloadManager: string;
  wifiOnly: string;
  requireCharging: string;
  autoDeleteListened: string;
  storageUsed: string;
  cleanStorage: string;
  storageCleaned: string;
  downloadEpisode: string;
  downloaded: string;
  downloading: string;
  removeFromDownloads: string;
  simulatedWifiActive: string;
  simulatedChargingActive: string;

  rewindOnResume: string;
  rewindSeconds: (s: number) => string;
  rewindToast: (s: number) => string;
  headphoneUnplugged: string;
  simulateHeadphoneUnplug: string;

  recapMode: string;
  previouslyOn: string;
  recapTitle: string;
  recapDesc: string;
  generateRecap: string;
  generatingRecap: string;
  playRecapAudio: string;
  stopRecapAudio: string;
  recapBulletPoints: string;
  resumeAfterRecap: string;

  semanticSearch: string;
  searchInChapter: string;
  searchSemanticPlaceholder: string;
  noSearchResults: string;
  jumpToMatch: string;

  biteSizedSummary: string;
  biteSizedDesc: string;
  generateBiteSummary: string;
  generatingBiteSummary: string;
  playBiteSummaryAudio: string;
  stopBiteSummaryAudio: string;
  readingMinutes: string;

  timestampedComments: string;
  addComment: string;
  commentPlaceholder: string;
  spoilerFree: string;
  containsSpoiler: string;
  hideSpoilers: string;
  showSpoilers: string;
  noCommentsYet: string;
  postComment: string;
  commentAdded: string;

  shareQuote: string;
  quoteSharingCard: string;
  cardFormatStory: string;
  cardFormatPost: string;
  cardThemeGradient: string;
  cardThemeDark: string;
  cardThemeParchment: string;
  copyQuoteText: string;
  downloadCardImage: string;
  quoteCopied: string;
  cardSaved: string;

  // Authentication & Profile & Favorites
  login: string;
  register: string;
  signInOrRegister: string;
  logout: string;
  profile: string;
  myProfile: string;
  personalId: string;
  generateNewId: string;
  idGeneratedTooltip: string;
  fullName: string;
  email: string;
  password: string;
  createPassword: string;
  confirmPassword: string;
  passwordStrength: string;
  weak: string;
  medium: string;
  strong: string;
  rememberMe: string;
  quickGuestLogin: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  createAccount: string;
  welcomeBack: string;
  copyId: string;
  idCopied: string;
  tabFavorites: string;
  tabDownloads: string;
  tabAudioBookmarks: string;
  tabMyNotes: string;
  tabHistory: string;
  tabSecurity: string;
  tabEditProfile: string;
  tabPasswordSecurity: string;
  editProfile: string;
  saveChanges: string;
  profileUpdatedSuccess: string;
  bioLabel: string;
  bioPlaceholder: string;
  chooseAvatar: string;
  customAvatarUrl: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  generateStrongPassword: string;
  passwordChangedSuccess: string;
  passwordMismatchError: string;
  currentPasswordWrongError: string;
  passwordTooShortError: string;
  passwordEmptyError: string;
  favoritesEmpty: string;
  exploreLibrary: string;
  removeFromFavorites: string;
  addToFavorites: string;
  addedToFavorites: string;
  removedFromFavorites: string;
  totalHours: string;
  listeningStreak: string;
  completedBooks: string;
  days: string;
  hours: string;
  videoMode: string;
  videoModeDesc: string;
  englishVoiceActive: string;
  turkishVoiceActive: string;

  // Toast
  toastLangChanged: string;
  toastNoteSaved: string;
  toastSpeedChanged: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  tr: {
    appTitle: 'Antigravity',
    aiBadge: 'AI Sesli Kütüphane',
    appSubtitle: 'Sesli Kitaplar & Podcast Deneyimi',
    tabAll: 'Tümü',
    tabAudiobooks: 'Sesli Kitaplar',
    tabPodcasts: "Podcast'ler",
    tabNotes: 'Not Defterim',
    searchPlaceholder: 'Kitap, podcast, yazar ara...',
    notificationsTitle: 'Yeni Bölüm Bildirimleri',
    noNotifications: 'Henüz yeni bir bildiriminiz yok.',
    testNotification: '+ Yeni Bölüm Bildirimi Test Et',
    listenNow: 'Hemen Dinle',
    markRead: 'Okundu',
    newBadge: 'yeni',
    languageSelect: 'Dil Değiştir',
    themeNight: 'Gece Modu',
    themeOled: 'OLED Gece',
    themeLight: 'Gündüz',
    modeTooltip: 'Görünüm Modu',

    resumeTitle: 'Kaldığınız Yerden Devam Edin',
    typePodcast: 'Podcast',
    typeAudiobook: 'Sesli Kitap',
    pausedAt: 'Kaldığınız an:',
    remainingTime: 'Kalan süre:',
    startOver: 'Baştan Başlat',
    resumePlay: 'Kaldığı Yerden Dinle',
    close: 'Kapat',

    listen: 'Dinle',
    resume: 'Devam Et',
    nowPlaying: 'Şu An Çalıyor',
    newEpisodeAvailable: 'YENİ BÖLÜM',
    newEpisodeBadge: 'Yeni',
    episodesCount: 'Bölüm',
    viewEpisodes: 'Bölümleri İncele',
    narratedBy: 'Seslendiren:',
    yourProgress: 'Kaldığınız Yer:',
    noResultsTitle: 'İçerik bulunamadı',
    noResultsDesc: 'Aramanızla eşleşen sesli kitap veya podcast bulunamadı.',
    podcast: 'Podcast',
    audiobook: 'Sesli Kitap',
    podcastEpisodes: 'Podcast Bölümleri',
    bookChapters: 'Kitap Bölümleri',
    chaptersCount: (count: number) => `${count} Bölüm`,
    resumeCurrentPoint: 'Kaldığınız Yer',
    resumeListen: 'Kaldığı Yerden Dinle',
    restartFromBeginning: 'Baştan Dinle',
    startListen: 'Dinlemeye Başla',
    continue: 'Devam Et',
    notes: 'Notlar',
    dismiss: 'Kapat',

    speed: 'Hız',
    playbackSpeed: 'Dinleme Hızı',
    speedSuffix: 'Hız',
    sleepTimer: 'Uyku Zamanlayıcısı',
    ambientSound: 'Ortam Sesi',
    ambient: 'Ambiyans',
    ambientNone: 'Kapalı',
    ambientSilent: 'Sessiz',
    ambientRain: 'Ilık Yağmur Sesi',
    ambientLibrary: 'Kütüphane Akustiği',
    ambientVinyl: 'Plak Cızırtısı',
    timerOff: 'Kapat',
    minutes: 'Dakika',
    timerMinutes: (m: number) => `${m} Dakika`,
    timerRemaining: 'Kalan',
    rewind15: '15 sn geri sar',
    forward15: '15 sn ileri sar',
    prevChapter: 'Önceki Bölüm',
    nextChapter: 'Sonraki Bölüm',
    chapterList: 'Bölüm Listesi',
    takeNote: 'Not Al',
    aiCompanion: 'Antigravity AI',
    aiCompanionTitle: 'Antigravity AI Bölüm Analizi',
    aiAnalysis: 'AI Analiz',
    aiInsights: 'AI İçgörü',
    allChapters: 'Tüm Bölümler',
    minimize: 'Küçült',
    play: 'Oynat',
    pause: 'Duraklat',
    narrator: 'Seslendiren',
    narrationText: 'Seslendirme Metni',
    liveTracking: 'Antigravity Canlı Takip',
    scriptAndTranscript: 'Bölüm Metni & Transkript',
    mute: 'Sesi Kapat',
    unmute: 'Sesi Aç',
    expandPlayer: 'Genişlet',
    minimizePlayer: 'Küçült',
    volume: 'Ses Seviyesi',
    playingWithNarration: 'Seslendirme aktif',

    // App & Page Layout
    myNotebook: 'Not Defterim',
    notebookDesc: 'Sesli kitaplar ve podcastler dinlerken aldığınız tüm zaman damgalı notlar ve Antigravity sentezleri.',
    addNewNote: 'Yeni Not Ekle',
    noNotesDesc: 'Sesli kitap dinlerken sağ alttaki "Not Al" butonuna basarak dilediğiniz saniyede not bırakabilirsiniz.',
    listenFromTimestamp: 'Bu saniyeden dinle',
    delete: 'Sil',
    exploreListen: 'Keşfet & Dinle',
    exploreSubtitle: 'Antigravity destekli akıllı bölüm analizi, zaman damgalı not alma ve ayarlanabilir dinleme hızı.',
    quickFilter: 'Hızlı Filtre:',
    filterAll: 'Tümü',
    filterPhilosophy: 'Felsefe',
    filterScience: 'Bilim & Nöro',
    allGenres: 'Tüm Türler',
    filterByGenre: 'Türe Göre Filtrele',
    viewShelves: 'Tür Rafları (Dörder Kitap)',
    viewGrid: 'Izgara Görünümü',
    showingBooksInGenre: (genre: string, count: number) => `"${genre}" türünde ${count} eser listeleniyor`,
    clearGenreFilter: 'Filtreyi Temizle',
    genrePhilosophy: 'Felsefe & Düşünce',
    genreLiterature: 'Klasik Edebiyat',
    genrePsychology: 'Psikoloji & Kişisel Gelişim',
    genreSciFi: 'Bilim Kurgu & Gelecek',
    genreScience: 'Bilim & Popüler Bilim',
    genreHistory: 'Tarih & Biyografi',
    fourBooksPerGenre: 'Her Türden 4 Kitap',
    simulatedNotificationTitle: '🚨 Yeni Bölüm Yayınlandı!',
    simulatedNotificationMessage: '🎙️ "Teknoloji & Geleceğin Dünyası" podcast serisinin Bölüm 33: "Yapay Zeka ve Nöral Arayüzler" şimdi dinlemeye hazır!',
    justNow: 'Az önce',

    notesTitle: 'Zaman Damgalı Not Defteri',
    notesPanelTitle: 'Zaman Damgalı Notlar',
    addNote: 'Not Ekle',
    notePlaceholder: 'Bu zaman damgasına dair düşüncenizi, sorunuzu veya alıntıyı yazın...',
    noteInputPlaceholder: 'Bu zamana dair notunuzu veya alıntıyı buraya yazın...',
    timeLabel: 'Saniye',
    saveNote: 'Notu Kaydet',
    filterAllNotes: 'Tüm Kategoriler',
    filterCurrentItem: 'Sadece Bu Eser',
    filterAllItems: 'Tüm Kütüphane',
    thisItemNotes: 'Bu Eserin Notları',
    allNotes: 'Tüm Notlar',
    categoryIdea: 'Önemli Fikir',
    categoryQuote: 'Alıntı',
    categoryQuestion: 'Soru & Araştır',
    categorySummary: 'Özet',
    catIdea: 'Fikir',
    catQuote: 'Alıntı',
    catQuestion: 'Soru',
    catSummary: 'Özet',
    synthesizeNotes: 'Antigravity ile Notları Sentezle',
    synthesizeWithAi: 'AI ile Sentezle',
    synthesizingAI: 'Notlar Yapay Zeka ile sentezleniyor...',
    synthesizing: 'Sentezleniyor...',
    aiSynthesisHeader: 'Antigravity AI Not Sentezi',
    exportMarkdown: 'Markdown Olarak İndir',
    copyNote: 'Kopyala',
    copyText: 'Metni kopyala',
    copied: 'Kopyalandı',
    deleteNote: 'Sil',
    noNotesYet: "Henüz bu içerik için not eklemediniz. Dinlerken 'Not Ekle' butonuna basarak saniyesine özel not alabilirsiniz.",
    noNotesSub: 'Dinlerken dilediğiniz anda not alabilir, sonra tek tıkla o saniyeye zıplayabilirsiniz.',
    jumpToTimestamp: 'Saniyeye Atla',
    jumpToTime: 'Bu saniyeye atla',
    noteCreated: 'Kayıt zamanı',
    generalNote: 'Genel Not',

    companionTitle: 'Antigravity AI Refakatçisi',
    companionSubtitle: 'Derin Analiz & İnteraktif Felsefe Asistanı',
    liveAnalysis: 'Canlı Analiz',
    tabAnalysis: 'Bölüm Analizi',
    analysisTab: 'Bölüm Analizi',
    tabChat: 'İnteraktif Soru-Cevap',
    chatTab: 'Soru & Cevap',
    insightReport: 'Antigravity İçgörü Raporu',
    analyzingDeeply: 'Antigravity eseri derinlemesine inceliyor...',
    analyzingContent: 'Bölüm içeriği analiz ediliyor...',
    analyzingSub: 'Kavramlar, zihin haritası ve çıkarımlar sentezleniyor',
    reanalyze: 'Yeniden Analiz Et',
    reAnalyze: 'Yeniden Analiz Et',
    analysisFailed: 'Analiz henüz yüklenmedi veya bir hata oluştu.',
    askAiWelcome: 'Antigravity Asistanına Hoş Geldiniz',
    askAiSub: 'Dinlediğiniz eser, kavramlar ve felsefi argümanlar hakkında her şeyi sorabilirsiniz.',
    aiThinking: 'Antigravity düşünüyor...',
    suggestedQuestions: 'Örnek Sorular:',
    sampleQ1: 'Bu bölümün günlük hayatıma katacağı en pratik ders nedir?',
    sampleQ2: 'Yazar bu kavramla neyi sorgulatmak istiyor?',
    sampleQ3: 'Bu bölümdeki ana düşünceye zıt bir bakış açısı var mı?',
    chatPlaceholder: 'Bölüm veya eser hakkında soru sorun...',
    askQuestionPlaceholder: 'Bu bölüm hakkında bir soru sorun...',
    send: 'Gönder',
    thinking: 'Antigravity düşünüyor...',
    you: 'Sen',

    chaptersModalTitle: 'Bölümler ve Parçalar',
    chapterNumber: 'Bölüm',
    playThisChapter: 'Dinle',
    resumeThisChapter: 'Kaldığı Yerden',
    newLabel: 'YENİ',

    // New Features TR
    bookmarkLast30: 'Son 30 Sn İşaretle',
    bookmarkLast30Success: 'Son 30 saniyelik sesli yer imi yakalandı!',
    audioBookmarks: 'Sesli Yer İmleri',
    myAudioBookmarks: 'Sesli Yer İmlerim & Alıntılar',
    saveAsAudio: 'Ses Olarak Kaydet',
    saveAsTranscript: 'Metin Transkripti Olarak Kaydet',
    playSnippet: 'Alıntıyı Dinle',
    stopSnippet: 'Durdur',
    snippetSaved: 'Yer imi kütüphanenize eklendi',
    noAudioBookmarks: 'Henüz sesli yer imi yok',
    noAudioBookmarksDesc: 'Dinlerken "Son 30 Sn İşaretle" butonuna basarak önemli kısımları kaydedebilirsiniz.',

    syncTranscript: 'Senkronize Transkript',
    karaokeMode: 'Karaoke / Takip Modu',
    clickWordToJump: 'Herhangi bir cümleye tıklayarak o saniyeye atlayabilirsiniz',
    autoScroll: 'Otomatik Kaydır',

    smartOffline: 'Akıllı Çevrimdışı İndirme',
    offlineDownloads: 'İndirmeler & Hafıza',
    downloadManager: 'Hafıza Yönetimi',
    wifiOnly: 'Sadece Wi-Fi bağlıyken otomatik indir',
    requireCharging: 'Sadece şarjdayken indir',
    autoDeleteListened: 'Dinlendikten sonra otomatik sil',
    storageUsed: 'Kullanılan Alan',
    cleanStorage: 'Hafızayı Temizle',
    storageCleaned: 'Dinlenen bölümler temizlendi, hafıza boşaltıldı!',
    downloadEpisode: 'Çevrimdışı İndir',
    downloaded: 'İndirildi (Çevrimdışı)',
    downloading: 'İndiriliyor...',
    removeFromDownloads: 'İndirmeyi Kaldır',
    simulatedWifiActive: 'Wi-Fi Bağlantısı Aktif',
    simulatedChargingActive: 'Cihaz Şarjda',

    rewindOnResume: 'Yeniden Başlatmada Geri Sarma',
    rewindSeconds: (s: number) => `${s} saniye`,
    rewindToast: (s: number) => `Bağlamı yakalamanız için ses ${s} saniye geri sarıldı.`,
    headphoneUnplugged: 'Kulaklık çıkarıldı: Oynatma duraklatıldı ve 3 saniye geri sarıldı',
    simulateHeadphoneUnplug: 'Kulaklık Çıkarma Simülasyonu',

    recapMode: 'Önceki Bölümlerde Neler Oldu? (Recap)',
    previouslyOn: 'Önceki Bölümlerde...',
    recapTitle: '30-45 Sn Yapay Zekâ Özeti',
    recapDesc: 'Ara verdiğiniz içeriğin kaldığınız yere kadarki olaylarını hafızanızda tazeleyin.',
    generateRecap: 'AI Recap Oluştur',
    generatingRecap: 'Antigravity hafıza özeti hazırlanıyor...',
    playRecapAudio: 'Recap Sesli Dinle (30 Sn)',
    stopRecapAudio: 'Recap Sesini Durdur',
    recapBulletPoints: 'Önemli Hatırlatmalar',
    resumeAfterRecap: 'Kaldığım Yerden Dinlemeye Başla',

    semanticSearch: 'Bölüm İçi Semantik Arama',
    searchInChapter: 'Bölüm İçinde Ara',
    searchSemanticPlaceholder: 'Fikir, kavram veya sözcük ara (Örn: Stoacı dinginlik, buz küpü)...',
    noSearchResults: 'Eşleşen an bulunamadı. Farklı bir kavram deneyin.',
    jumpToMatch: 'Bu Saniyeye Atla',

    biteSizedSummary: 'Hap Özet (Bite-Sized)',
    biteSizedDesc: 'Uzun bölümler ve kitaplar için 3-5 dakikalık konsantre önizleme.',
    generateBiteSummary: '3 Dk Hap Özet Oluştur',
    generatingBiteSummary: 'Hap özet sentezleniyor...',
    playBiteSummaryAudio: 'Hap Özeti Sesli Dinle (3 Dk)',
    stopBiteSummaryAudio: 'Özet Sesini Durdur',
    readingMinutes: '3 Dk Dinleme',

    timestampedComments: 'Zaman Damgalı Yorumlar',
    addComment: 'Yorum Ekle',
    commentPlaceholder: 'Şu anki saniyeye düşüncenizi yazın...',
    spoilerFree: 'Spoiler İçermez',
    containsSpoiler: 'Spoiler İçerir',
    hideSpoilers: 'Spoilerları Gizle',
    showSpoilers: 'Tüm Yorumları Göster',
    noCommentsYet: 'Bu saniyede henüz yorum yok. İlk yorumu sen bırak!',
    postComment: 'Paylaş',
    commentAdded: 'Zaman damgalı yorumunuz eklendi!',

    shareQuote: 'Alıntı Paylaşım Kartı',
    quoteSharingCard: 'Alıntı Paylaşım Stüdyosu',
    cardFormatStory: 'Hikaye (9:16)',
    cardFormatPost: 'Kare Gönderi (1:1)',
    cardThemeGradient: 'Kozmik Gradyan',
    cardThemeDark: 'Siyah Zarafet',
    cardThemeParchment: 'Sıcak Parşömen',
    copyQuoteText: 'Alıntıyı Kopyala',
    downloadCardImage: 'Görsel Kartı İndir',
    quoteCopied: 'Alıntı panoya kopyalandı!',
    cardSaved: 'Alıntı kartı hazırlandı!',

    // Authentication & Profile & Favorites
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    signInOrRegister: 'Giriş Yap / Kaydol',
    logout: 'Oturumu Kapat',
    profile: 'Profilim',
    myProfile: 'Kullanıcı Profili',
    personalId: 'Kişiye Özel ID',
    generateNewId: 'Yeni ID Oluştur',
    idGeneratedTooltip: 'Bu ID size özel olarak üretilmiştir. Giriş yaparken e-posta veya bu ID ile giriş yapabilirsiniz.',
    fullName: 'Ad Soyad',
    email: 'E-posta Adresi',
    password: 'Şifre',
    createPassword: 'Şifre Oluştur',
    confirmPassword: 'Şifreyi Tekrarla',
    passwordStrength: 'Şifre Güvenliği',
    weak: 'Zayıf',
    medium: 'Orta',
    strong: 'Güçlü',
    rememberMe: 'Beni hatırla',
    quickGuestLogin: 'Hızlı Misafir Girişi',
    alreadyHaveAccount: 'Zaten hesabınız var mı? Giriş yapın',
    dontHaveAccount: 'Hesabınız yok mu? Hemen kaydolun',
    createAccount: 'Kişisel ID ile Kayıt Ol',
    welcomeBack: 'Tekrar Hoş Geldiniz',
    copyId: 'ID Kopyala',
    idCopied: 'Kişisel ID panoya kopyalandı!',
    tabFavorites: 'Favorilenenler',
    tabDownloads: 'İndirilenler',
    tabAudioBookmarks: 'Sesli Yer İmleri',
    tabMyNotes: 'Notlarım & Alıntılar',
    tabHistory: 'Dinleme Geçmişi',
    tabSecurity: 'Güvenlik & Ayarlar',
    tabEditProfile: 'Profili Düzenle',
    tabPasswordSecurity: 'Şifre & Güvenlik',
    editProfile: 'Profili Düzenle',
    saveChanges: 'Değişiklikleri Kaydet',
    profileUpdatedSuccess: 'Profil bilgileriniz başarıyla güncellendi.',
    bioLabel: 'Hakkımda & Biyografi',
    bioPlaceholder: 'Kendiniz, okuma hedefleriniz veya ilgi alanlarınız hakkında kısa bir not...',
    chooseAvatar: 'Profil Resmi / Avatar Seç',
    customAvatarUrl: 'Özel Avatar Görsel URL',
    changePassword: 'Şifre Değiştir',
    currentPassword: 'Mevcut Şifre',
    newPassword: 'Yeni Şifre',
    confirmNewPassword: 'Yeni Şifre Tekrar',
    generateStrongPassword: 'Güçlü Şifre Oluştur',
    passwordChangedSuccess: 'Şifreniz başarıyla değiştirildi ve güncellendi.',
    passwordMismatchError: 'Girdiğiniz yeni şifreler birbiriyle eşleşmiyor.',
    currentPasswordWrongError: 'Mevcut şifreniz hatalı. Lütfen kontrol edin.',
    passwordTooShortError: 'Yeni şifreniz en az 6 karakter olmalıdır.',
    passwordEmptyError: 'Lütfen tüm şifre alanlarını doldurun.',
    favoritesEmpty: 'Henüz favori listenize bir sesli kitap veya podcast eklemediniz.',
    exploreLibrary: 'Kütüphaneyi Keşfet',
    removeFromFavorites: 'Favorilerden Çıkar',
    addToFavorites: 'Favorilere Ekle',
    addedToFavorites: 'Favorilere eklendi',
    removedFromFavorites: 'Favorilerden çıkarıldı',
    totalHours: 'Toplam Dinleme',
    listeningStreak: 'Dinleme Serisi',
    completedBooks: 'Tamamlanan',
    days: 'gün',
    hours: 'saat',
    videoMode: 'Video / Sinematik Görselleştirici',
    videoModeDesc: 'İngilizce & Türkçe altyazılı dinamik ses dalgaları ve sinematik video sahnesi',
    englishVoiceActive: 'İngilizce Seslendirme Aktif',
    turkishVoiceActive: 'Türkçe Seslendirme Aktif',

    toastLangChanged: 'Uygulama dili Türkçe olarak ayarlandı',
    toastNoteSaved: 'Zaman damgalı notunuz kaydedildi',
    toastSpeedChanged: 'Dinleme hızı güncellendi',
  },
  en: {
    appTitle: 'Antigravity',
    aiBadge: 'AI Audio Library',
    appSubtitle: 'Audiobooks & Podcasts Experience',
    tabAll: 'All',
    tabAudiobooks: 'Audiobooks',
    tabPodcasts: 'Podcasts',
    tabNotes: 'My Notebook',
    searchPlaceholder: 'Search books, podcasts, authors...',
    notificationsTitle: 'New Episode Notifications',
    noNotifications: 'You have no notifications yet.',
    testNotification: '+ Simulate New Episode Notification',
    listenNow: 'Listen Now',
    markRead: 'Mark Read',
    newBadge: 'new',
    languageSelect: 'Language',
    themeNight: 'Night Mode',
    themeOled: 'OLED Night',
    themeLight: 'Day Mode',
    modeTooltip: 'Appearance Mode',

    resumeTitle: 'Continue Where You Left Off',
    typePodcast: 'Podcast',
    typeAudiobook: 'Audiobook',
    pausedAt: 'Paused at:',
    remainingTime: 'Remaining:',
    startOver: 'Restart',
    resumePlay: 'Resume Playing',
    close: 'Close',

    listen: 'Listen',
    resume: 'Resume',
    nowPlaying: 'Now Playing',
    newEpisodeAvailable: 'NEW EPISODE',
    newEpisodeBadge: 'New',
    episodesCount: 'Episodes',
    viewEpisodes: 'View Episodes',
    narratedBy: 'Narrated by:',
    yourProgress: 'Progress:',
    noResultsTitle: 'No items found',
    noResultsDesc: 'No audiobooks or podcasts match your query.',
    podcast: 'Podcast',
    audiobook: 'Audiobook',
    podcastEpisodes: 'Podcast Episodes',
    bookChapters: 'Book Chapters',
    chaptersCount: (count: number) => `${count} Chapter${count === 1 ? '' : 's'}`,
    resumeCurrentPoint: 'Saved Spot',
    resumeListen: 'Resume Playing',
    restartFromBeginning: 'Restart from Beginning',
    startListen: 'Start Listening',
    continue: 'Continue',
    notes: 'Notes',
    dismiss: 'Dismiss',

    speed: 'Speed',
    playbackSpeed: 'Playback Speed',
    speedSuffix: 'Speed',
    sleepTimer: 'Sleep Timer',
    ambientSound: 'Ambient Sound',
    ambient: 'Ambient',
    ambientNone: 'Off',
    ambientSilent: 'Silent',
    ambientRain: 'Gentle Rain',
    ambientLibrary: 'Cozy Library',
    ambientVinyl: 'Vinyl Warmth',
    timerOff: 'Turn Off',
    minutes: 'Minutes',
    timerMinutes: (m: number) => `${m} Minutes`,
    timerRemaining: 'Left',
    rewind15: 'Rewind 15s',
    forward15: 'Forward 15s',
    prevChapter: 'Previous Chapter',
    nextChapter: 'Next Chapter',
    chapterList: 'Chapter List',
    takeNote: 'Add Note',
    aiCompanion: 'Antigravity AI',
    aiCompanionTitle: 'Antigravity AI Chapter Analysis',
    aiAnalysis: 'AI Analysis',
    aiInsights: 'AI Insights',
    allChapters: 'All Chapters',
    minimize: 'Minimize',
    play: 'Play',
    pause: 'Pause',
    narrator: 'Narrator',
    narrationText: 'Narration Text',
    liveTracking: 'Antigravity Live Tracking',
    scriptAndTranscript: 'Chapter Script & Transcript',
    mute: 'Mute',
    unmute: 'Unmute',
    expandPlayer: 'Expand Player',
    minimizePlayer: 'Minimize Player',
    volume: 'Volume Level',
    playingWithNarration: 'Voice narration active',

    // App & Page Layout
    myNotebook: 'My Notebook',
    notebookDesc: 'All your timestamped notes, quotes, and Antigravity syntheses gathered while listening to audiobooks and podcasts.',
    addNewNote: 'Add New Note',
    noNotesDesc: 'Click "Add Note" while listening to capture thoughts at any exact second.',
    listenFromTimestamp: 'Listen from timestamp',
    delete: 'Delete',
    exploreListen: 'Explore & Listen',
    exploreSubtitle: 'Antigravity-powered deep chapter analysis, timestamped note taking, and variable playback speed.',
    quickFilter: 'Quick Filter:',
    filterAll: 'All',
    filterPhilosophy: 'Philosophy',
    filterScience: 'Science & Neuro',
    allGenres: 'All Genres',
    filterByGenre: 'Filter by Genre',
    viewShelves: 'Genre Shelves (4 Books Each)',
    viewGrid: 'Grid View',
    showingBooksInGenre: (genre: string, count: number) => `Showing ${count} titles in "${genre}"`,
    clearGenreFilter: 'Clear Filter',
    genrePhilosophy: 'Philosophy & Thought',
    genreLiterature: 'Classic Literature',
    genrePsychology: 'Psychology & Self Improvement',
    genreSciFi: 'Sci-Fi & Future',
    genreScience: 'Science & Popular Science',
    genreHistory: 'History & Biography',
    fourBooksPerGenre: '4 Books Per Genre',
    simulatedNotificationTitle: '🚨 New Episode Released!',
    simulatedNotificationMessage: '🎙️ "Technology & Future Horizons" Episode 33: "Neural Interfaces & Synthetic Cognition" is now ready to listen!',
    justNow: 'Just now',

    notesTitle: 'Timestamped Notebook',
    notesPanelTitle: 'Timestamped Notes',
    addNote: 'Add Note',
    notePlaceholder: 'Write your thought, question, or key quote for this timestamp...',
    noteInputPlaceholder: 'Write your thought, question, or quote at this timestamp...',
    timeLabel: 'Timestamp',
    saveNote: 'Save Note',
    filterAllNotes: 'All Categories',
    filterCurrentItem: 'Current Item Only',
    filterAllItems: 'All Library Items',
    thisItemNotes: "This Item's Notes",
    allNotes: 'All Notes',
    categoryIdea: 'Key Idea',
    categoryQuote: 'Quote',
    categoryQuestion: 'Inquiry & Explore',
    categorySummary: 'Summary',
    catIdea: 'Idea',
    catQuote: 'Quote',
    catQuestion: 'Question',
    catSummary: 'Summary',
    synthesizeNotes: 'Synthesize Notes with Antigravity',
    synthesizeWithAi: 'Synthesize with AI',
    synthesizingAI: 'Synthesizing your notes with Antigravity AI...',
    synthesizing: 'Synthesizing...',
    aiSynthesisHeader: 'Antigravity AI Notes Synthesis',
    exportMarkdown: 'Export as Markdown',
    copyNote: 'Copy',
    copyText: 'Copy note',
    copied: 'Copied',
    deleteNote: 'Delete',
    noNotesYet: "You have not added any notes yet for this audio. Click 'Add Note' while listening to save timestamped insights.",
    noNotesSub: 'Take notes at any second while listening, then jump back with a single click.',
    jumpToTimestamp: 'Jump to time',
    jumpToTime: 'Jump to this timestamp',
    noteCreated: 'Saved at',
    generalNote: 'General Note',

    companionTitle: 'Antigravity AI Companion',
    companionSubtitle: 'Deep Insights & Interactive Philosophy Assistant',
    liveAnalysis: 'Live Analysis',
    tabAnalysis: 'Chapter Analysis',
    analysisTab: 'Chapter Analysis',
    tabChat: 'Interactive Q&A',
    chatTab: 'Q&A Chat',
    insightReport: 'Antigravity Insight Report',
    analyzingDeeply: 'Antigravity is deeply analyzing the content...',
    analyzingContent: 'Analyzing chapter content...',
    analyzingSub: 'Extracting core thesis, mind map, and takeaways',
    reanalyze: 'Re-analyze',
    reAnalyze: 'Re-analyze',
    analysisFailed: 'Analysis could not be loaded or an error occurred.',
    askAiWelcome: 'Welcome to Antigravity AI',
    askAiSub: 'Ask anything about this chapter, overarching concepts, or philosophical dilemmas.',
    aiThinking: 'Antigravity is thinking...',
    suggestedQuestions: 'Suggested Questions:',
    sampleQ1: 'What is the most actionable takeaway from this chapter for daily life?',
    sampleQ2: 'What underlying question is the author prompting us to explore?',
    sampleQ3: 'Is there a counter-argument or different perspective to this thesis?',
    chatPlaceholder: 'Ask a question about this chapter or author...',
    askQuestionPlaceholder: 'Ask a question about this chapter...',
    send: 'Send',
    thinking: 'Antigravity is thinking...',
    you: 'You',

    chaptersModalTitle: 'Chapters & Episodes',
    chapterNumber: 'Chapter',
    playThisChapter: 'Play',
    resumeThisChapter: 'Resume',
    newLabel: 'NEW',

    // New Features EN
    bookmarkLast30: 'Bookmark Last 30s',
    bookmarkLast30Success: 'Captured last 30 seconds audio bookmark!',
    audioBookmarks: 'Audio Bookmarks',
    myAudioBookmarks: 'My Audio Bookmarks & Quotes',
    saveAsAudio: 'Save as Audio Bookmark',
    saveAsTranscript: 'Save as Text Transcript',
    playSnippet: 'Play Quote Snippet',
    stopSnippet: 'Stop',
    snippetSaved: 'Bookmark saved to your library',
    noAudioBookmarks: 'No audio bookmarks yet',
    noAudioBookmarksDesc: 'Click "Bookmark Last 30s" while listening to save memorable moments.',

    syncTranscript: 'Synchronized Transcript',
    karaokeMode: 'Karaoke / Tracking Mode',
    clickWordToJump: 'Click any sentence to jump the audio directly to that second',
    autoScroll: 'Auto Scroll',

    smartOffline: 'Smart Offline Downloads',
    offlineDownloads: 'Downloads & Storage',
    downloadManager: 'Storage Management',
    wifiOnly: 'Auto-download only when Wi-Fi connected',
    requireCharging: 'Only download while device is charging',
    autoDeleteListened: 'Auto-delete episode once completed',
    storageUsed: 'Storage Used',
    cleanStorage: 'Clean Storage',
    storageCleaned: 'Finished episodes removed, storage freed!',
    downloadEpisode: 'Download for Offline',
    downloaded: 'Downloaded (Offline)',
    downloading: 'Downloading...',
    removeFromDownloads: 'Remove Download',
    simulatedWifiActive: 'Wi-Fi Connection Active',
    simulatedChargingActive: 'Device Charging',

    rewindOnResume: 'Rewind on Resume',
    rewindSeconds: (s: number) => `${s} seconds`,
    rewindToast: (s: number) => `Rewound ${s}s to refresh your listening context.`,
    headphoneUnplugged: 'Headphones disconnected: Playback paused & rewound 3s',
    simulateHeadphoneUnplug: 'Simulate Headphone Unplug',

    recapMode: 'Previously On... (Recap Mode)',
    previouslyOn: 'Previously On...',
    recapTitle: '30-45s AI Audio Recap',
    recapDesc: 'Refresh your memory on everything that happened up to this point.',
    generateRecap: 'Generate AI Recap',
    generatingRecap: 'Synthesizing recap narrative...',
    playRecapAudio: 'Play 30s Audio Recap',
    stopRecapAudio: 'Stop Recap Audio',
    recapBulletPoints: 'Key Milestones',
    resumeAfterRecap: 'Resume Listening Now',

    semanticSearch: 'In-Chapter Semantic Search',
    searchInChapter: 'Search in Chapter',
    searchSemanticPlaceholder: 'Search themes, concepts, or thoughts (e.g. Stoic control, ice cube)...',
    noSearchResults: 'No matching moments found. Try a different concept.',
    jumpToMatch: 'Jump to this Second',

    biteSizedSummary: 'Bite-Sized Summary',
    biteSizedDesc: '3-minute essence preview for long episodes and audiobooks.',
    generateBiteSummary: 'Generate 3-Min Summary',
    generatingBiteSummary: 'Synthesizing bite-sized summary...',
    playBiteSummaryAudio: 'Listen to 3-Min Summary',
    stopBiteSummaryAudio: 'Stop Summary Audio',
    readingMinutes: '3 Min Listening',

    timestampedComments: 'Timestamped Comments',
    addComment: 'Add Comment',
    commentPlaceholder: 'Leave a note or reaction at this exact second...',
    spoilerFree: 'Spoiler-Free',
    containsSpoiler: 'Contains Spoiler',
    hideSpoilers: 'Hide Spoilers',
    showSpoilers: 'Show All Comments',
    noCommentsYet: 'No comments at this timestamp. Be the first!',
    postComment: 'Post Comment',
    commentAdded: 'Your timestamped comment has been added!',

    shareQuote: 'Quote Sharing Card',
    quoteSharingCard: 'Quote Share Studio',
    cardFormatStory: 'Story (9:16)',
    cardFormatPost: 'Square Post (1:1)',
    cardThemeGradient: 'Cosmic Gradient',
    cardThemeDark: 'Dark Velvet',
    cardThemeParchment: 'Warm Parchment',
    copyQuoteText: 'Copy Quote Text',
    downloadCardImage: 'Download Visual Card',
    quoteCopied: 'Quote copied to clipboard!',
    cardSaved: 'Quote card ready!',

    // Authentication & Profile & Favorites
    login: 'Sign In',
    register: 'Sign Up',
    signInOrRegister: 'Sign In / Register',
    logout: 'Sign Out',
    profile: 'My Profile',
    myProfile: 'User Profile',
    personalId: 'Personal User ID',
    generateNewId: 'Generate New ID',
    idGeneratedTooltip: 'This unique ID is exclusively generated for you. You can sign in using either your email or this ID.',
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',
    passwordStrength: 'Password Security',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    rememberMe: 'Remember me',
    quickGuestLogin: 'Instant Guest Login',
    alreadyHaveAccount: 'Already have an account? Sign in',
    dontHaveAccount: 'Don\'t have an account? Sign up',
    createAccount: 'Sign Up with Personal ID',
    welcomeBack: 'Welcome Back',
    copyId: 'Copy ID',
    idCopied: 'Personal ID copied to clipboard!',
    tabFavorites: 'Favorites',
    tabDownloads: 'Downloads',
    tabAudioBookmarks: 'Audio Bookmarks',
    tabMyNotes: 'Notes & Quotes',
    tabHistory: 'Listening History',
    tabSecurity: 'Security & Settings',
    tabEditProfile: 'Edit Profile',
    tabPasswordSecurity: 'Password & Security',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    profileUpdatedSuccess: 'Profile details updated successfully.',
    bioLabel: 'Bio & Reading Goals',
    bioPlaceholder: 'A brief note about yourself, your favorite genres or listening goals...',
    chooseAvatar: 'Choose Avatar / Photo',
    customAvatarUrl: 'Custom Avatar URL',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    generateStrongPassword: 'Generate Strong Password',
    passwordChangedSuccess: 'Your password has been changed and updated successfully.',
    passwordMismatchError: 'The new passwords do not match.',
    currentPasswordWrongError: 'Your current password is incorrect.',
    passwordTooShortError: 'Your new password must be at least 6 characters.',
    passwordEmptyError: 'Please fill in all password fields.',
    favoritesEmpty: 'You haven\'t added any audiobooks or podcasts to your favorites yet.',
    exploreLibrary: 'Explore Catalog',
    removeFromFavorites: 'Remove from Favorites',
    addToFavorites: 'Add to Favorites',
    addedToFavorites: 'Added to favorites',
    removedFromFavorites: 'Removed from favorites',
    totalHours: 'Total Listening',
    listeningStreak: 'Listening Streak',
    completedBooks: 'Completed Titles',
    days: 'days',
    hours: 'hours',
    videoMode: 'Video / Visualizer Stage',
    videoModeDesc: 'Dynamic soundwave visualizer with synchronized English & Turkish subtitles',
    englishVoiceActive: 'English Voiceover Active',
    turkishVoiceActive: 'Turkish Voiceover Active',

    toastLangChanged: 'Application language switched to English',
    toastNoteSaved: 'Timestamped note saved',
    toastSpeedChanged: 'Listening speed updated',
  },
};

export function getCategoryLabel(category: NoteCategory, lang: AppLanguage): string {
  const t = TRANSLATIONS[lang];
  switch (category) {
    case 'idea':
      return t.categoryIdea;
    case 'quote':
      return t.categoryQuote;
    case 'question':
      return t.categoryQuestion;
    case 'summary':
      return t.categorySummary;
    default:
      return category;
  }
}
