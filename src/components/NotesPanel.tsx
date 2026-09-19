import React, { useState } from 'react';
import { 
  Bookmark, 
  Plus, 
  Trash2, 
  Play, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Tag, 
  X,
  FileText,
  Filter
} from 'lucide-react';
import { Note, NoteCategory, LibraryItem, Chapter, AppLanguage } from '../types';
import { formatTime } from '../utils/audioEngine';
import { TRANSLATIONS } from '../utils/i18n';

interface NotesPanelProps {
  notes: Note[];
  currentItem: LibraryItem | null;
  currentChapter: Chapter | null;
  currentTime: number;
  language?: AppLanguage;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onDeleteNote: (id: string) => void;
  onSeekToTimestamp: (seconds: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  currentItem,
  currentChapter,
  currentTime,
  language = 'tr',
  onAddNote,
  onDeleteNote,
  onSeekToTimestamp,
  isOpen,
  onClose,
}) => {
  const [noteText, setNoteText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>('idea');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisResult, setSynthesisResult] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<NoteCategory | 'all'>('all');
  const [viewScope, setViewScope] = useState<'current' | 'all'>('current');

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  // Filter notes based on current item or all items
  const relevantNotes = notes.filter((n) => {
    if (viewScope === 'current' && currentItem) {
      return n.itemId === currentItem.id;
    }
    return true;
  }).filter((n) => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    onAddNote({
      itemId: currentItem ? currentItem.id : 'general',
      chapterId: currentChapter ? currentChapter.id : 'ch-1',
      itemTitle: currentItem ? currentItem.title : (language === 'en' ? 'General Note' : 'Genel Not'),
      chapterTitle: currentChapter ? currentChapter.title : (language === 'en' ? 'General' : 'Genel'),
      timestampSeconds: Math.floor(currentTime),
      timestampFormatted: formatTime(currentTime),
      text: noteText.trim(),
      category: selectedCategory,
    });

    setNoteText('');
  };

  // Antigravity AI synthesis of notes
  const handleSynthesizeNotes = async () => {
    if (relevantNotes.length === 0) return;
    setIsSynthesizing(true);
    setSynthesisResult(null);

    try {
      const response = await fetch('/api/antigravity/synthesize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: relevantNotes,
          title: currentItem?.title || (language === 'en' ? 'Audio Notes' : 'Sesli Kitap Notları'),
          authorOrHost: currentItem?.authorOrHost || (language === 'en' ? 'Author' : 'Yazar'),
          language,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSynthesisResult(data.synthesis);
      } else {
        setSynthesisResult(language === 'en' ? 'A problem occurred while analyzing notes.' : 'Notlar analiz edilirken bir sorun oluştu.');
      }
    } catch (err) {
      setSynthesisResult(language === 'en' ? 'Could not connect to server.' : 'Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAllNotes = () => {
    const content = relevantNotes.map((n) => {
      return `### [${n.timestampFormatted}] ${n.itemTitle} - ${n.chapterTitle}\nCategory: ${n.category.toUpperCase()}\nNote: ${n.text}\n`;
    }).join('\n---\n\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentItem?.title || 'notes'}-audio-notes.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryBadge = (cat: NoteCategory) => {
    switch (cat) {
      case 'idea':
        return { label: t.catIdea, style: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'quote':
        return { label: t.catQuote, style: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' };
      case 'question':
        return { label: t.catQuestion, style: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
      case 'summary':
        return { label: t.catSummary, style: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        id="notes-panel-drawer"
        className="w-full max-w-lg bg-neutral-900 border-l border-neutral-800 h-full flex flex-col justify-between shadow-2xl text-neutral-100"
      >
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-100">
                {t.notesPanelTitle}
              </h2>
              <p className="text-[11px] text-neutral-400">
                {currentItem ? currentItem.title : t.allNotes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {relevantNotes.length > 0 && (
              <button
                onClick={exportAllNotes}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                title={t.exportMarkdown}
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Note Input Box */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/80">
          <form onSubmit={handleSaveNote}>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <Clock className="w-3 h-3" /> {t.timeLabel}: {formatTime(currentTime)}
              </span>
              <span className="text-[11px] text-neutral-400">
                {currentChapter ? currentChapter.title : (language === 'en' ? 'Chapter' : 'Bölüm')}
              </span>
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t.noteInputPlaceholder}
              rows={3}
              className="w-full p-3 rounded-xl text-xs bg-neutral-800/80 border border-neutral-700 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 resize-none"
            />

            {/* Category pills & Save button */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5">
              <div className="flex items-center gap-1">
                {(['idea', 'quote', 'question', 'summary'] as NoteCategory[]).map((cat) => {
                  const badge = getCategoryBadge(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border transition-colors ${
                        selectedCategory === cat
                          ? `${badge.style} font-bold ring-1 ring-amber-400`
                          : 'bg-neutral-800/60 text-neutral-400 border-neutral-700 hover:text-white'
                      }`}
                    >
                      {badge.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={!noteText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> {t.saveNote}
              </button>
            </div>
          </form>
        </div>

        {/* View Scope & Filter Bar */}
        <div className="px-4 py-2 bg-neutral-950/40 border-b border-neutral-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewScope('current')}
              className={`text-[11px] font-medium pb-0.5 ${
                viewScope === 'current'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.thisItemNotes} ({notes.filter(n => n.itemId === currentItem?.id).length})
            </button>
            <button
              onClick={() => setViewScope('all')}
              className={`text-[11px] font-medium pb-0.5 ${
                viewScope === 'all'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.allNotes} ({notes.length})
            </button>
          </div>

          {/* Antigravity AI Synthesizer trigger */}
          {relevantNotes.length > 0 && (
            <button
              onClick={handleSynthesizeNotes}
              disabled={isSynthesizing}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-950/60 hover:bg-indigo-900/60 px-2 py-1 rounded-lg border border-indigo-500/30 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              {isSynthesizing ? t.synthesizing : t.synthesizeWithAi}
            </button>
          )}
        </div>

        {/* AI Synthesis Result Banner (if generated) */}
        {synthesisResult && (
          <div className="p-4 bg-neutral-950 border-b border-indigo-900/50 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> {t.aiSynthesisHeader}
              </span>
              <button
                onClick={() => setSynthesisResult(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="text-xs text-neutral-300 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-line bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
              {synthesisResult}
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {relevantNotes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <FileText className="w-10 h-10 text-neutral-700 mb-2" />
              <p className="text-xs font-medium text-neutral-300">{t.noNotesYet}</p>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-xs">
                {t.noNotesSub}
              </p>
            </div>
          ) : (
            relevantNotes.map((note) => {
              const badge = getCategoryBadge(note.category);
              return (
                <div 
                  key={note.id}
                  className="p-3.5 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    
                    {/* Clickable timestamp that jumps audio */}
                    <button
                      onClick={() => onSeekToTimestamp(note.timestampSeconds)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/30 transition-all"
                      title={t.jumpToTime}
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>{note.timestampFormatted}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${badge.style}`}>
                        {badge.label}
                      </span>
                      
                      <button
                        onClick={() => copyToClipboard(note.text, note.id)}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors"
                        title={t.copyText}
                      >
                        {copiedId === note.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="p-1 text-neutral-400 hover:text-rose-400 rounded hover:bg-neutral-700 transition-colors"
                        title={t.deleteNote}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {note.text}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-700/40 pt-1.5">
                    <span>{note.chapterTitle}</span>
                    <span>{new Date(note.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
