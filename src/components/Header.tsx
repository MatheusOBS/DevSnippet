
import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onSearch, onToggleTheme, theme }) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[22px]">code_blocks</span>
          </div>
          <span className="text-lg font-black tracking-tighter hidden sm:block">DEV<span className="text-primary">SNIPPET</span></span>
        </Link>

        {/* Busca Semântica (Melhoria 12) */}
        <div className="flex-1 max-w-xl group relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            ref={searchInputRef}
            className="w-full h-10 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 pl-11 pr-12 text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-white dark:focus:bg-white/10 transition-all outline-none"
            placeholder="Busca inteligente... (⌘K)"
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block text-[10px] font-bold text-slate-400 border border-slate-300 dark:border-white/10 px-1.5 py-0.5 rounded uppercase">⌘K</kbd>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle de Tema (Melhoria 9) */}
          <button 
            onClick={onToggleTheme}
            className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>

          <button
            onClick={() => navigate('/new')}
            className="h-10 px-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="hidden md:inline">Novo Snippet</span>
          </button>

          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
            <img
              alt="Avatar"
              className="rounded-full h-full w-full object-cover border-2 border-white dark:border-slate-900"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=ProDev"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
