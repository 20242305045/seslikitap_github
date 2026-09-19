import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RotateCw, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  X 
} from 'lucide-react';
import { LibraryItem, Chapter, Note, AppLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface AntigravityAISidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: LibraryItem | null;
  currentChapter: Chapter | null;
  notes: Note[];
  language?: AppLanguage;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'antigravity';
  text: string;
  time: string;
}

export const AntigravityAISidebar: React.FC<AntigravityAISidebarProps> = ({
  isOpen,
  onClose,
  currentItem,
  currentChapter,
  notes,
  language = 'tr',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'analysis' | 'chat'>('analysis');
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const t = TRANSLATIONS[language];

  // Auto trigger analysis on initial open or language switch
  useEffect(() => {
    if (isOpen && currentItem) {
      handleRunAnalysis();
    }
  }, [isOpen, currentItem?.id, currentChapter?.id, language]);

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    if (!currentItem) return;
    setIsAnalyzing(true);
    setAnalysisText(null);

    try {
      const response = await fetch('/api/antigravity/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentItem.title,
          authorOrHost: currentItem.authorOrHost,
          type: currentItem.type,
          chapterTitle: currentChapter?.title,
          chapterSummary: currentChapter?.summary,
          textSnippet: currentChapter?.script,
          userNotes: notes.filter(n => n.itemId === currentItem.id).map(n => n.text),
          language,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysisText(data.analysis);
      } else {
        setAnalysisText(language === 'en' ? 'Analysis failed to generate. Please try again.' : 'Analiz oluşturulurken bir aksaklık yaşandı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setAnalysisText(language === 'en' ? 'Could not connect to the Antigravity AI service.' : 'Antigravity yapay zeka servisiyle bağlantı kurulamadı.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/antigravity/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend.trim(),
          context: {
            title: currentItem?.title,
            authorOrHost: currentItem?.authorOrHost,
            chapterTitle: currentChapter?.title,
          },
          language,
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'antigravity',
        text: data.reply || (language === 'en' ? 'No answer received.' : 'Cevap alınamadı.'),
        time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'antigravity',
        text: language === 'en' ? 'Connection error. Please resend your question.' : 'Bağlantı hatası oluştu. Lütfen sorunuzu tekrar iletin.',
        time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const sampleQuestions = language === 'en' ? [
    'What is the core philosophy of this chapter?',
    'What key takeaway does the author highlight here?',
    'What are 3 practical lessons I can apply from this today?',
  ] : [
    'Bu bölümün ana felsefesi nedir?',
    'Yazar burada hangi kritik mesaja dikkat çekiyor?',
    'Bu bölümden hayatıma uygulayabileceğim 3 pratik ders nedir?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        id="antigravity-ai-sidebar-drawer"
        className="w-full max-w-lg bg-neutral-900 border-l border-neutral-800 h-full flex flex-col justify-between shadow-2xl text-neutral-100"
      >
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-neutral-100">
                  {t.aiCompanionTitle}
                </h2>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {t.liveAnalysis}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                {currentItem ? `${currentItem.title} • ${currentChapter?.title}` : (language === 'en' ? 'Content Analysis' : 'İçerik Analizi')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Analysis vs Interactive Chat */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/40 p-1 gap-1 text-xs">
          <button
            onClick={() => setActiveSubTab('analysis')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              activeSubTab === 'analysis'
                ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.analysisTab}
          </button>
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              activeSubTab === 'chat'
                ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.chatTab}
          </button>
        </div>

        {/* Tab 1: Deep Analysis Content */}
        {activeSubTab === 'analysis' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" /> {t.insightReport}
              </span>
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
              >
                <RotateCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {t.reAnalyze}
              </button>
            </div>

            {isAnalyzing ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative">
                  <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
                  <Sparkles className="w-4 h-4 text-amber-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-xs text-neutral-300 font-medium">
                  {t.analyzingContent}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {t.analyzingSub}
                </p>
              </div>
            ) : analysisText ? (
              <div className="prose prose-invert prose-xs max-w-none text-neutral-300 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line bg-neutral-800/30 p-4 rounded-2xl border border-neutral-800">
                {analysisText}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-400 text-xs">
                {t.analysisFailed}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Interactive Q&A Chat */}
        {activeSubTab === 'chat' && (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between space-y-3">
            
            {/* Messages timeline */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.length === 0 && (
                <div className="py-6 text-center text-neutral-400">
                  <Bot className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-neutral-200">
                    {t.askAiWelcome}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1 max-w-xs mx-auto">
                    {t.askAiSub}
                  </p>

                  {/* Suggestion prompts */}
                  <div className="mt-4 flex flex-col gap-1.5 text-left">
                    {sampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors flex items-center gap-1.5"
                      >
                        <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'antigravity' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}

                  <div 
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-none'
                        : 'bg-neutral-800 text-neutral-200 border border-neutral-700/60 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[9px] mt-1 block text-right opacity-60 font-mono`}>
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-neutral-300" />
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-2.5 items-center text-xs text-neutral-400">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center animate-spin">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                  <span>{t.aiThinking}</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2 border-t border-neutral-800">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.askQuestionPlaceholder}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isChatLoading}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
