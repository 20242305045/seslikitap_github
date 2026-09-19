import { LibraryItem } from '../types';

const STORAGE_KEY = 'antigravity_custom_library_items';

export function getCustomLibraryItems(): LibraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load custom library items:', error);
    return [];
  }
}

export function saveCustomLibraryItem(item: LibraryItem): LibraryItem[] {
  try {
    const existing = getCustomLibraryItems();
    // Check if item already exists by id, replace or prepend
    const filtered = existing.filter(i => i.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save custom library item:', error);
    return [];
  }
}

export function deleteCustomLibraryItem(itemId: string): LibraryItem[] {
  try {
    const existing = getCustomLibraryItems();
    const updated = existing.filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete custom library item:', error);
    return [];
  }
}
