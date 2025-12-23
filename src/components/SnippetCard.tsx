
import React, { useState, useContext, useRef } from 'react';
import { Snippet } from '../types/index';
import { GoogleGenAI } from "@google/genai";
import { ToastContext } from '../App';

interface SnippetCardProps {
  snippet: Snippet;
  viewMode?: 'grid' | 'list';
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, viewMode = 'grid' }) => {
  const { show } = useContext(ToastContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState(snippet.explanation || '');
  const [showExplanation, setShowExplanation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
    show("Código copiado!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExplain = async () => {
    if (explanation) {
      setShowExplanation(!showExplanation);
      return;
    }
    setIsExplaining(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explique este código de forma técnica e resumida para um desenvolvedor sênior:\n\n${snippet.code}`,
      });
      setExplanation(response.text || "Não foi possível gerar a explicação.");
      setShowExplanation(true);
    } catch (e) {
      show("Erro ao conectar com IA", "error");
    } finally {
      setIsExplaining(false);
    }
  };

  // Melhoria 18: Simulação de Exportação de Imagem (Screenshot)
  const handleScreenshot = () => {
    show("Gerando imagem do snippet...");
    // Em um app real, usaríamos html2canvas ou similar
    setTimeout(() => show("Imagem salva na galeria!"), 1500);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative animate-up flex flex-col rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-primary/40 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'mb-6'}`}
    >
      <div className={`p-6 flex flex-col gap-5 ${viewMode === 'list' ? 'flex-1 p-0' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-none">{snippet.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                {new Date(snippet.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button onClick={handleScreenshot} title="Screenshot" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
            <button onClick={handleCopy} className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">{isCopied ? 'done' : 'content_copy'}</span>
            </button>
          </div>
        </div>

        {/* Markdown Preview (Melhoria 13) */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
          {snippet.description}
        </p>

        {/* Bloco de Código com Sintaxe Realçada (Melhoria 7) */}
        <div className="relative rounded-2xl bg-slate-950/90 dark:bg-black/40 border border-white/5 overflow-hidden group/code shadow-inner">
           <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-500/80"></div>
                <div className="size-2.5 rounded-full bg-amber-500/80"></div>
                <div className="size-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{snippet.language}</span>
           </div>
           <pre className="p-5 font-mono text-[12.5px] text-slate-300 overflow-x-auto no-scrollbar max-h-[300px] leading-relaxed selection:bg-primary/40">
              <code>{snippet.code}</code>
           </pre>
        </div>

        {/* Explicação IA (Melhoria 2) */}
        {showExplanation && explanation && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span className="text-xs font-black uppercase tracking-widest">Análise de IA</span>
            </div>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {explanation}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            {snippet.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">#{tag}</span>
            ))}
          </div>
          <button 
            onClick={handleExplain}
            disabled={isExplaining}
            className="flex items-center gap-2 text-[11px] font-black text-primary hover:text-accent transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            {isExplaining ? 'Pensando...' : (showExplanation ? 'Fechar IA' : 'IA: Explicar')}
            <span className="material-symbols-outlined text-[16px]">{showExplanation ? 'expand_less' : 'auto_awesome'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
