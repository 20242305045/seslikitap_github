import { UserProfile, UserAccount } from '../types';

const STORAGE_KEY_CURRENT_USER = 'antigravity_current_user';
const STORAGE_KEY_USERS = 'antigravity_users_database';

export function generatePersonalId(prefix = 'AG'): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const suffix = chars.charAt(Math.floor(Math.random() * chars.length)) + chars.charAt(Math.floor(Math.random() * chars.length));
  return `${prefix}-${num}-${suffix}`;
}

export function generateSecurePassword(length = 12): string {
  const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowers = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*';
  const allChars = uppers + lowers + numbers + symbols;

  let pwd = '';
  // Ensure at least one of each category
  pwd += uppers.charAt(Math.floor(Math.random() * uppers.length));
  pwd += lowers.charAt(Math.floor(Math.random() * lowers.length));
  pwd += numbers.charAt(Math.floor(Math.random() * numbers.length));
  pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));

  for (let i = 4; i < length; i++) {
    pwd += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the characters
  return pwd.split('').sort(() => 0.5 - Math.random()).join('');
}

const DEFAULT_DEMO_ACCOUNT: UserAccount = {
  id: 'AG-8419-TR',
  name: 'Ayşe Uygun',
  email: 'ayseuygun.112164@gmail.com',
  password: 'Password123!',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  membershipTier: 'Premium Member',
  joinedDate: 'Eylül 2026',
  streakDays: 8,
  totalHoursListened: 14.5,
  completedItemsCount: 4,
  favoriteItemIds: ['book-simyaci', 'podcast-zihin-norobilim', 'book-atomik-aliskanliklar', 'en-book-1'],
  downloadedItemIds: ['book-simyaci'],
};

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      // Seed default demo user
      const initial = [DEFAULT_DEMO_ACCOUNT];
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [DEFAULT_DEMO_ACCOUNT];
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (!raw) {
      // Auto sign in as default demo user for seamless instant experience
      const user = DEFAULT_DEMO_ACCOUNT;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      return user;
    }
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveCurrentUser(user: UserProfile | null): void {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
  } else {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
  }
}

export function registerUser(params: {
  name: string;
  email: string;
  password: string;
  personalId?: string;
  avatar?: string;
}): { success: boolean; user?: UserProfile; error?: string } {
  const users = getStoredUsers();

  const cleanEmail = params.email.trim().toLowerCase();
  const existingEmail = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (existingEmail) {
    return { success: false, error: 'Bu e-posta adresi ile zaten bir hesap kayıtlı.' };
  }

  const idToUse = (params.personalId?.trim() || generatePersonalId()).toUpperCase();
  const existingId = users.find((u) => u.id.toUpperCase() === idToUse);
  if (existingId) {
    return { success: false, error: 'Bu Kişisel ID zaten kullanımda. Lütfen yeni bir ID oluşturun.' };
  }

  const defaultAvatar = params.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${idToUse}`;

  const newUser: UserAccount = {
    id: idToUse,
    name: params.name.trim(),
    email: cleanEmail,
    password: params.password,
    avatar: defaultAvatar,
    membershipTier: 'Premium Member',
    joinedDate: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
    streakDays: 1,
    totalHoursListened: 0.5,
    completedItemsCount: 0,
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  saveCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUser(identifier: string, pass: string): { success: boolean; user?: UserProfile; error?: string } {
  const users = getStoredUsers();
  const cleanId = identifier.trim().toLowerCase();

  const found = users.find(
    (u) => u.email.toLowerCase() === cleanId || u.id.toLowerCase() === cleanId
  );

  if (!found) {
    return { success: false, error: 'Kullanıcı bulunamadı. Lütfen e-posta veya Kişisel ID bilginizi kontrol edin.' };
  }

  if (found.password !== pass) {
    return { success: false, error: 'Hatalı şifre. Lütfen tekrar deneyin.' };
  }

  const { password, ...profile } = found;
  saveCurrentUser(profile);
  return { success: true, user: profile };
}

export function logoutUser(): void {
  saveCurrentUser(null);
}

export function getUserAccount(userId: string): UserAccount | null {
  const users = getStoredUsers();
  return users.find((u) => u.id === userId) || null;
}

export function resetUserPassword(
  userId: string,
  newPass: string
): { success: boolean; error?: string } {
  const users = getStoredUsers();
  const cleanId = userId.trim().toLowerCase();
  let index = users.findIndex(
    (u) => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  );

  if (index === -1) {
    const current = getCurrentUser();
    if (current && (current.id.toLowerCase() === cleanId || current.email.toLowerCase() === cleanId)) {
      const newAcc: UserAccount = {
        ...current,
        password: newPass,
      };
      users.push(newAcc);
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      return { success: true };
    }
    return { success: false, error: 'Kullanıcı hesabı bulunamadı.' };
  }

  if (!newPass || newPass.trim().length < 6) {
    return { success: false, error: 'Yeni şifreniz en az 6 karakter olmalıdır.' };
  }

  users[index].password = newPass;
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  return { success: true };
}

export function changeUserPassword(
  userId: string,
  currentPass: string,
  newPass: string
): { success: boolean; error?: string } {
  const users = getStoredUsers();
  const cleanId = userId.trim().toLowerCase();
  let index = users.findIndex(
    (u) => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  );

  if (index === -1) {
    const current = getCurrentUser();
    if (current && (current.id.toLowerCase() === cleanId || current.email.toLowerCase() === cleanId)) {
      const newAcc: UserAccount = {
        ...current,
        password: newPass,
      };
      users.push(newAcc);
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      return { success: true };
    }
    return { success: false, error: 'Kullanıcı hesabı bulunamadı.' };
  }

  const account = users[index];
  const trimmedInput = currentPass.trim();
  const actualPass = account.password?.trim() || '';

  // Accept stored password, default master 'Password123!', or account personal ID
  const isMatch =
    trimmedInput === actualPass ||
    trimmedInput === 'Password123!' ||
    trimmedInput.toUpperCase() === account.id.toUpperCase() ||
    !actualPass;

  if (!isMatch) {
    return {
      success: false,
      error: 'Mevcut şifreniz hatalı. "Şifremi Sıfırla" seçeneğini kullanarak eski şifre olmadan da doğrudan yeni şifre belirleyebilirsiniz.',
    };
  }

  if (!newPass || newPass.trim().length < 6) {
    return { success: false, error: 'Yeni şifreniz en az 6 karakter olmalıdır.' };
  }

  users[index].password = newPass;
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  return { success: true };
}

export function updateUserAccount(
  userId: string,
  updates: { name?: string; email?: string; avatar?: string; bio?: string; newPassword?: string }
): { success: boolean; user?: UserProfile; error?: string } {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return { success: false, error: 'Kullanıcı hesabı bulunamadı.' };
  }

  if (updates.email) {
    const cleanEmail = updates.email.trim().toLowerCase();
    const emailTaken = users.some((u) => u.id !== userId && u.email.toLowerCase() === cleanEmail);
    if (emailTaken) {
      return { success: false, error: 'Bu e-posta adresi başka bir hesap tarafından kullanılıyor.' };
    }
    users[index].email = cleanEmail;
  }

  if (updates.name && updates.name.trim()) {
    users[index].name = updates.name.trim();
  }

  if (updates.avatar) {
    users[index].avatar = updates.avatar;
  }

  if (updates.bio !== undefined) {
    users[index].bio = updates.bio;
  }

  if (updates.newPassword && updates.newPassword.trim().length >= 6) {
    users[index].password = updates.newPassword.trim();
  }

  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

  const { password, ...updatedProfile } = users[index];
  saveCurrentUser(updatedProfile);
  return { success: true, user: updatedProfile };
}

export function updateUserProfile(updated: UserProfile): void {
  saveCurrentUser(updated);
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === updated.id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updated,
    };
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }
}

export function toggleUserFavorite(itemId: string): UserProfile {
  let user = getCurrentUser();
  if (!user) {
    user = DEFAULT_DEMO_ACCOUNT;
  }
  const currentFavs = user.favoriteItemIds || [];
  const exists = currentFavs.includes(itemId);
  const nextFavs = exists ? currentFavs.filter((id) => id !== itemId) : [...currentFavs, itemId];

  const updatedUser: UserProfile = {
    ...user,
    favoriteItemIds: nextFavs,
  };
  updateUserProfile(updatedUser);
  return updatedUser;
}

export function toggleUserDownload(itemId: string): UserProfile {
  let user = getCurrentUser();
  if (!user) {
    user = DEFAULT_DEMO_ACCOUNT;
  }
  const currentDownloads = user.downloadedItemIds || [];
  const exists = currentDownloads.includes(itemId);
  const nextDownloads = exists ? currentDownloads.filter((id) => id !== itemId) : [...currentDownloads, itemId];

  const updatedUser: UserProfile = {
    ...user,
    downloadedItemIds: nextDownloads,
  };
  updateUserProfile(updatedUser);
  return updatedUser;
}
