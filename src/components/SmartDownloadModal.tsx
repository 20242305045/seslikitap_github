import React from 'react';
import { OfflineDownloadItem, OfflineSettings, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { 
  Download, 
  Wifi, 
  WifiOff, 
  BatteryCharging, 
  Battery, 
  Trash2, 
  HardDrive, 
  CheckCircle2, 
  X, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface SmartDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloads: OfflineDownloadItem[];
  settings: OfflineSettings;
  language: AppLanguage;
  onUpdateSettings: (newSettings: Partial<OfflineSettings>) => void;
  onDeleteDownload: (chapterId: string) => void;
  onCleanStorage: () => void;
}

export const SmartDownloadModal: React.FC<SmartDownloadModalProps> = ({
  isOpen,
  onClose,
  downloads,
  settings,
  language,
  onUpdateSettings,
  onDeleteDownload,
  onCleanStorage,
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const totalUsedMb = downloads.reduce((acc, curr) => acc + curr.sizeMb, 0);
  const quotaPercent = Math.min(100, (totalUsedMb / settings.storageLimitMb) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-neutral-950 shadow-md">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                {t.smartOffline}
              </h2>
              <p className="text-xs text-neutral-400">
                {t.downloadManager}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Storage Meter Visualizer */}
          <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                {t.storageUsed}
              </span>
              <span className="font-mono text-cyan-300 font-bold">
                {totalUsedMb} MB / {settings.storageLimitMb} MB
              </span>
            </div>

            <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, quotaPercent)}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                {downloads.length} {language === 'en' ? 'episodes cached offline' : 'bölüm çevrimdışı önbellekte'}
              </span>
              <button
                onClick={onCleanStorage}
                disabled={downloads.length === 0}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors disabled:opacity-40"
              >
                {t.cleanStorage}
              </button>
            </div>
          </div>

          {/* Smart Automation Rules */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              {language === 'en' ? 'Automatic Rules & Memory Policy' : 'Otomasyon Kuralları & Hafıza İlkesi'}
            </h3>

            {/* Rule 1: Wi-Fi Only */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/50 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-200">{t.wifiOnly}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {language === 'en'
                      ? 'Prevents mobile data cellular charges for heavy audio'
                      : 'Hücresel veri kotanızı korumak için mobil ağda indirmeyi durdurur'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoDownloadOnWifiOnly}
                onChange={(e) => onUpdateSettings({ autoDownloadOnWifiOnly: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Rule 2: Charging Only */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/50 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-200">{t.requireCharging}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {language === 'en'
                      ? 'Initiates heavy background downloads solely when connected to power'
                      : 'Pil ömrünü korumak için indirmeleri yalnızca cihaz şarja takılıyken başlatır'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.requireCharging}
                onChange={(e) => onUpdateSettings({ requireCharging: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Rule 3: Auto-delete when listened */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/50 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-200">{t.autoDeleteListened}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {language === 'en'
                      ? 'Reclaims storage automatically the moment an episode finishes playing'
                      : 'Bölüm dinlenip tamamlandığı anda hafızayı otomatik boşaltır'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoDeletePlayed}
                onChange={(e) => onUpdateSettings({ autoDeletePlayed: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Test Simulation Controls (for verifying Wi-Fi & Charging triggers) */}
          <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
            <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Hardware State Simulation (Test Toggles)' : 'Donanım Durumu Simülasyonu (Test Butonları)'}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateSettings({ simulatedWifi: !settings.simulatedWifi })}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                  settings.simulatedWifi
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                }`}
              >
                {settings.simulatedWifi ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{settings.simulatedWifi ? 'Wi-Fi: ON' : 'Wi-Fi: OFF (Cellular)'}</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ simulatedCharging: !settings.simulatedCharging })}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                  settings.simulatedCharging
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                }`}
              >
                {settings.simulatedCharging ? <BatteryCharging className="w-3.5 h-3.5" /> : <Battery className="w-3.5 h-3.5" />}
                <span>{settings.simulatedCharging ? 'Şarjda (Charging)' : 'Pilde (Battery)'}</span>
              </button>
            </div>
          </div>

          {/* Downloaded items list */}
          <div>
            <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              {language === 'en' ? 'Offline Files in Storage' : 'Hafızadaki Çevrimdışı Dosyalar'}
            </h3>
            {downloads.length === 0 ? (
              <p className="text-xs text-neutral-500 py-3 text-center">
                {language === 'en' ? 'No downloaded episodes in local memory.' : 'Yerel hafızada indirilmiş bölüm yok.'}
              </p>
            ) : (
              <div className="space-y-2">
                {downloads.map((item) => (
                  <div
                    key={item.chapterId}
                    className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <h5 className="text-xs font-semibold text-neutral-200 truncate">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5 ml-5.5">
                        {item.itemTitle} • {item.sizeMb} MB
                      </p>
                    </div>

                    <button
                      onClick={() => onDeleteDownload(item.chapterId)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
                      title={t.removeFromDownloads}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
