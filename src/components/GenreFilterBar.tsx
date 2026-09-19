import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Brain, 
  Rocket, 
  Atom, 
  Landmark, 
  Layers, 
  LayoutGrid, 
  Check, 
  X,
  Filter
} from 'lucide-react';
import { AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

export interface GenreItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

interface GenreFilterBarProps {
  genres: { name: string; count: number }[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  language: AppLanguage;
  viewMode: 'shelves' | 'grid';
  onChangeViewMode: (mode: 'shelves' | 'grid') => void;
  totalCount: number;
}

export const GenreFilterBar: React.FC<GenreFilterBarProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
  language,
  viewMode,
  onChangeViewMode,
  totalCount,
}) => {
  const t = TRANSLATIONS[language];

  const getGenreIcon = (genreName: string) => {
    const lower = genreName.toLowerCase();
    if (lower.includes('felsefe') || lower.includes('philosophy')) return Compass;
    if (lower.includes('edebiyat') || lower.includes('literature')) return BookOpen;
    if (lower.includes('psikoloji') || lower.includes('psychology') || lower.includes('gelişim')) return Brain;
    if (lower.includes('kurgu') || lower.includes('sci-fi')) return Rocket;
    if (lower.includes('bilim') || lower.includes('science')) return Atom;
    if (lower.includes('tarih') || lower.includes('history') || lower.includes('biyografi')) return Landmark;
    return BookOpen;
  };

  return (
    <div className="mb-8 space-y-3">
      {/* Sleek Row: Genre Pills with View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Genre Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar flex-1">
          {/* All Genres pill */}
          <button
            onClick={() => onSelectGenre(null)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
              selectedGenre === null
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700'
            }`}
          >
            <span>{t.allGenres}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedGenre === null
                  ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* Individual Genre Pills */}
          {genres.map((g) => {
            const isSelected = selectedGenre === g.name;
            const Icon = getGenreIcon(g.name);

            return (
              <button
                key={g.name}
                onClick={() => onSelectGenre(isSelected ? null : g.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/15'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-neutral-950' : 'text-amber-400'}`} />
                <span>{g.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                      : 'bg-amber-500/15 text-amber-300 font-bold'
                  }`}
                >
                  {g.count}
                </span>
              </button>
            );
          })}

          {/* Active Filter Clear Tag */}
          {selectedGenre && (
            <button
              onClick={() => onSelectGenre(null)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 shrink-0 transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.clearGenreFilter}</span>
            </button>
          )}
        </div>

        {/* View mode toggle: Tür Rafları vs Izgara */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => onChangeViewMode('shelves')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'shelves'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title={t.viewShelves}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.viewShelves}</span>
          </button>

          <button
            onClick={() => onChangeViewMode('grid')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title={t.viewGrid}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.viewGrid}</span>
          </button>
        </div>
      </div>

      {/* Selected Genre Banner Indicator (if filtered) */}
      {selectedGenre && (
        <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/25 px-4 py-2 rounded-xl text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.showingBooksInGenre(selectedGenre, genres.find(g => g.name === selectedGenre)?.count || 4)}</span>
          </div>
          <button
            onClick={() => onSelectGenre(null)}
            className="text-[11px] underline text-amber-400 hover:text-amber-300"
          >
            {t.allGenres}
          </button>
        </div>
      )}
    </div>
  );
};
