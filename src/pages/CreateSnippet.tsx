
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snippet } from '../types/index';
import { GoogleGenAI } from "@google/genai";
import { ToastContext } from '../App';

interface CreateSnippetProps {
  onAdd: (snippet: Snippet) => void;
}

const CreateSnippet: React.FC<CreateSnippetProps> = ({ onAdd }) => {
  const { show } = useContext(ToastContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Melhoria 1: Gerador de Snippets com IA
  const handleAiGenerate = async () => {
    if (!aiPrompt) {
      show("Digite um comando para a IA", "error");
      return;
    }
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Gere um snippet profissional para: "${aiPrompt}". 
        Retorne rigorosamente no formato JSON com as chaves: title, language, code, tags (array de strings), description.`,
      });
      
      const resText = response.text || "";
      const jsonStart = resText.indexOf('{');
      const jsonEnd = resText.lastIndexOf('}') + 1;
      const data = JSON.parse(resText.substring(jsonStart, jsonEnd));

      setTitle(data.title);
      setLanguage(data.language.toUpperCase());
      setCode(data.code);
      setTags(data.tags);
      setDescription(data.description);
      show("Snippet gerado com IA!");
    } catch (error) {
      show("Falha na geração", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Melhoria 16: Detecção Automática de Linguagem
  const handleCodeChange = (val: string) => {
    setCode(val);
    if (!language && val.length > 20) {
      if (val.includes('def ') || val.includes('import os')) setLanguage('PYTHON');
      if (val.includes('interface ') || val.includes(': string')) setLanguage('TYPESCRIPT');
      if (val.includes('<div') || val.includes('className')) setLanguage('REACT');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title,
      description,
      code,
      language: language.toUpperCase() || 'JAVASCRIPT',
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      views: 0
    };

    onAdd(newSnippet);
    navigate('/');
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto animate-up">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate('/')} className="size-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Laboratório de Snippets</h1>
          <p className="text-slate-500 text-sm font-medium">Crie, edite e aprimore com inteligência artificial.</p>
        </div>
      </div>

      {/* IA Playground (Melhoria 1) */}
      <div className="mb-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 shadow-inner">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
             <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Magic Compose</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-slate-900 border-none px-5 text-sm shadow-sm focus:ring-4 focus:ring-primary/20 transition-all outline-none"
            placeholder="Ex: 'Um hook para gerenciar localStorage em React com expiração'..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button
            onClick={handleAiGenerate}
            disabled={isGenerating}
            className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? <span className="animate-spin material-symbols-outlined">sync</span> : <span className="material-symbols-outlined">bolt</span>}
            {isGenerating ? 'Processando...' : 'Gerar Agora'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Título do Projeto</label>
            <input
              required
              className="w-full h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 px-5 font-bold focus:ring-4 focus:ring-primary/20 transition-all outline-none"
              placeholder="Ex: API Wrapper de Autenticação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Linguagem / SDK</label>
            <input
              className="w-full h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 px-5 font-bold focus:ring-4 focus:ring-primary/20 transition-all outline-none"
              placeholder="Ex: TypeScript, React, SQL..."
              value={language}
              onChange={(e) => setLanguage(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Contexto / Descrição</label>
          <textarea
            className="w-full h-24 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 px-5 py-4 font-medium focus:ring-4 focus:ring-primary/20 transition-all outline-none resize-none"
            placeholder="Para que serve este código? Suporta Markdown..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Área do Editor</label>
          <div className="relative rounded-[2rem] bg-slate-950 p-6 border-4 border-slate-900 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>
            <textarea
              required
              className="w-full min-h-[400px] bg-transparent text-slate-300 font-mono text-[13px] leading-relaxed border-none focus:ring-0 resize-none no-scrollbar outline-none"
              placeholder="// Seu código começa aqui..."
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
           <button
            type="button"
            onClick={() => navigate('/')}
            className="px-10 py-4 rounded-2xl border border-slate-200 dark:border-white/5 font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            Descartar
          </button>
          <button
            type="submit"
            className="px-12 py-4 rounded-2xl bg-primary text-white font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>
            Finalizar Snippet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSnippet;
