import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  Check,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../types';
import { generatePersonalId, registerUser, loginUser } from '../utils/authStorage';
import { TRANSLATIONS, AppLanguage } from '../utils/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: AppLanguage;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccess,
  initialMode = 'login',
}) => {
  const t = TRANSLATIONS[lang];
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Login identifier (can be email or personalId)
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccessMsg(null);
      if (!personalId) {
        setPersonalId(generatePersonalId());
      }
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleGenerateNewId = () => {
    const newId = generatePersonalId();
    setPersonalId(newId);
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'register') {
      if (!name.trim()) {
        setError(lang === 'tr' ? 'Lütfen adınızı girin.' : 'Please enter your name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError(lang === 'tr' ? 'Geçerli bir e-posta adresi girin.' : 'Please enter a valid email.');
        return;
      }
      if (password.length < 6) {
        setError(lang === 'tr' ? 'Şifre en az 6 karakter olmalıdır.' : 'Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError(lang === 'tr' ? 'Girdiğiniz şifreler uyuşmuyor.' : 'Passwords do not match.');
        return;
      }

      const res = registerUser({
        name,
        email,
        password,
        personalId,
        avatar: selectedAvatar,
      });

      if (!res.success) {
        setError(res.error || 'Kayıt başarısız.');
        return;
      }

      setSuccessMsg(
        lang === 'tr'
          ? `Tebrikler! ${res.user?.id} ID numaranızla hesabınız oluşturuldu.`
          : `Success! Account created with ID: ${res.user?.id}`
      );
      setTimeout(() => {
        if (res.user) {
          onSuccess(res.user);
          onClose();
        }
      }, 1000);
    } else {
      // Login mode
      if (!identifier.trim()) {
        setError(lang === 'tr' ? 'Lütfen e-posta veya Kişisel ID girin.' : 'Please enter email or Personal ID.');
        return;
      }
      if (!password) {
        setError(lang === 'tr' ? 'Lütfen şifrenizi girin.' : 'Please enter your password.');
        return;
      }

      const res = loginUser(identifier, password);
      if (!res.success) {
        setError(res.error || 'Giriş başarısız.');
        return;
      }

      setSuccessMsg(
        lang === 'tr'
          ? `Giriş başarılı! Hoş geldiniz, ${res.user?.name}.`
          : `Signed in successfully! Welcome, ${res.user?.name}.`
      );
      setTimeout(() => {
        if (res.user) {
          onSuccess(res.user);
          onClose();
        }
      }, 700);
    }
  };

  const handleQuickDemo = () => {
    const res = loginUser('ayseuygun.112164@gmail.com', 'Password123!');
    if (res.success && res.user) {
      setSuccessMsg(lang === 'tr' ? 'Demo kullanıcı ile giriş yapıldı!' : 'Signed in as Demo User!');
      setTimeout(() => {
        if (res.user) {
          onSuccess(res.user);
          onClose();
        }
      }, 600);
    }
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="auth-modal-card"
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/70 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Antigravity Audio Pass</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {mode === 'login' ? t.welcomeBack : t.createAccount}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {mode === 'login'
              ? (lang === 'tr' ? 'Kişisel ID veya e-postanızla güvenli giriş yapın.' : 'Sign in securely with your Personal ID or Email.')
              : (lang === 'tr' ? 'Kişiye özel benzersiz ID oluşturarak favori ve arşivinize erişin.' : 'Generate your unique personal ID to sync favorites and audio library.')}
          </p>
        </div>

        {/* Switch Mode Tabs */}
        <div className="flex p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-6">
          <button
            id="tab-btn-auth-login"
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.login}
          </button>
          <button
            id="tab-btn-auth-register"
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
              if (!personalId) setPersonalId(generatePersonalId());
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.register}
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' ? (
            <>
              {/* Kişiye Özel ID Generator Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border border-amber-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    {t.personalId}
                  </span>
                  <button
                    id="btn-regenerate-id"
                    type="button"
                    onClick={handleGenerateNewId}
                    className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
                    title={t.generateNewId}
                  >
                    <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
                    <span>{t.generateNewId}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="input-personal-id"
                    type="text"
                    value={personalId}
                    onChange={(e) => setPersonalId(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950/80 border border-neutral-700/80 rounded-lg px-3 py-2 text-sm font-mono tracking-wider font-semibold text-amber-300 focus:outline-none focus:border-amber-500"
                    placeholder="AG-0000-XX"
                    required
                  />
                  <div className="shrink-0 text-xs px-2.5 py-1.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Özel ID</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5">
                  {t.idGeneratedTooltip}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {t.fullName}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder={lang === 'tr' ? 'Örn: Ahmet Yılmaz' : 'e.g. John Doe'}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder="kullanici@ornek.com"
                    required
                  />
                </div>
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  {lang === 'tr' ? 'Profil Avatarı Seçin' : 'Choose Profile Avatar'}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      id={`avatar-choice-${idx}`}
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 transition-transform ${
                        selectedAvatar === av
                          ? 'border-amber-500 scale-110 shadow-lg shadow-amber-500/20'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                      {selectedAvatar === av && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {t.createPassword}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password Strength Gauge */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                      <span>{t.passwordStrength}</span>
                      <span
                        className={
                          strength <= 1
                            ? 'text-red-400 font-medium'
                            : strength <= 3
                            ? 'text-amber-400 font-medium'
                            : 'text-emerald-400 font-medium'
                        }
                      >
                        {strength <= 1 ? t.weak : strength <= 3 ? t.medium : t.strong}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden flex gap-1">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength === 0
                            ? 'w-0'
                            : strength === 1
                            ? 'w-1/4 bg-red-500'
                            : strength === 2
                            ? 'w-2/4 bg-amber-500'
                            : strength === 3
                            ? 'w-3/4 bg-amber-400'
                            : 'w-full bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-register"
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.createAccount}</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Identifier (Email or Personal ID) */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {lang === 'tr' ? 'E-posta veya Kişiye Özel ID' : 'Email or Personal ID'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-login-identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder={lang === 'tr' ? 'AG-8419-TR veya e-posta' : 'AG-8419-TR or email'}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-neutral-300">
                    {t.password}
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-login"
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.login}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant Guest Demo */}
              <div className="pt-2 border-t border-neutral-800">
                <button
                  id="btn-quick-demo-login"
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.quickGuestLogin} (Ayşe Uygun • AG-8419-TR)</span>
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center">
          {mode === 'login' ? (
            <p className="text-xs text-neutral-400">
              {lang === 'tr' ? 'Hesabınız yok mu?' : "Don't have an account?"}{' '}
              <button
                id="btn-switch-to-register"
                type="button"
                onClick={() => {
                  setMode('register');
                  setError(null);
                }}
                className="text-amber-400 hover:underline font-semibold cursor-pointer ml-1"
              >
                {t.register}
              </button>
            </p>
          ) : (
            <p className="text-xs text-neutral-400">
              {lang === 'tr' ? 'Zaten bir hesabınız var mı?' : 'Already have an account?'}{' '}
              <button
                id="btn-switch-to-login"
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-amber-400 hover:underline font-semibold cursor-pointer ml-1"
              >
                {t.login}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
