
import React, { useState, useMemo } from 'react';
import SnippetCard from '../components/SnippetCard';
import { Snippet, FilterCategory, Collection } from '../types/index';

interface DashboardProps {
  snippets: Snippet[];
  searchQuery: string;
  collections: Collection[];
}

const Dashboard: React.FC<DashboardProps> = ({ snippets, searchQuery, collections }) => {
  const [activeFilter, setActiveFilter] = useState<string>(FilterCategory.ALL);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Heatmap Simulado (Melhoria 6)
  const heatmapData = useMemo(() => {
    return Array.from({ length: 52 }, () => Math.floor(Math.random() * 5));
  }, []);

  // Stats (Melhoria 5)
  const stats = useMemo(() => {
    return {
      total: snippets.length,
      views: snippets.reduce((acc, s) => acc + (s.views || 0), 0),
      languages: new Set(snippets.map(s => s.language)).size,
      topLang: snippets.reduce((acc: any, s) => {
        acc[s.language] = (acc[s.language] || 0) + 1;
        return acc;
      }, {})
    };
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    return snippets.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchesFilter = activeFilter === FilterCategory.ALL;
      if (activeFilter === FilterCategory.PINNED) matchesFilter = s.isPinned;
      if (activeFilter === FilterCategory.FAVORITES) matchesFilter = s.isFavorite;
      
      return matchesSearch && matchesFilter;
    }).sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
  }, [snippets, searchQuery, activeFilter]);

  return (
    <div className="px-6 py-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Esquerda: Coleções e Filtros (Melhoria 17) */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          <div>
            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Explorar</h4>
            <div className="flex flex-col gap-1">
              {Object.values(FilterCategory).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">{filter === 'Todos' ? 'dashboard' : filter === 'Fixados' ? 'push_pin' : 'favorite'}</span>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Coleções</h4>
              <button className="material-symbols-outlined text-[18px] text-slate-400 hover:text-primary transition-colors">add</button>
            </div>
            <div className="flex flex-col gap-1">
              {collections.map(col => (
                <button key={col.id} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  <span className="size-2 rounded-full" style={{ background: col.color }}></span>
                  {col.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Header Dashboard: Stats & Heatmap (Melhoria 5, 6) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-[2.5rem] glass dark:bg-white/5 flex flex-col justify-between min-h-[160px]">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">Bem-vindo de volta, <span className="text-primary">Dev</span>.</h2>
                <p className="text-sm text-slate-500 mt-1">Você está no topo da sua produtividade esta semana.</p>
              </div>
              <div className="flex items-end gap-1 mt-4">
                {heatmapData.map((val, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 min-w-[4px] h-8 rounded-full transition-all hover:scale-125 ${val === 0 ? 'bg-slate-200 dark:bg-white/5' : val < 2 ? 'bg-primary/30' : 'bg-primary'}`}
                    title={`${val} contribuições`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-[2.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col justify-between shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Linguagem Top</span>
              <div className="flex items-baseline gap-2">
                <h4 className="text-4xl font-black tracking-tighter">TS</h4>
                <span className="text-xs font-bold opacity-60">85% do tempo</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 dark:bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-white dark:bg-primary w-4/5"></div>
              </div>
            </div>
          </section>

          {/* Filtros de Visualização (Melhoria 10) */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
            <h3 className="text-lg font-black tracking-tight">{filteredSnippets.length} Snippets Encontrados</h3>
            <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'text-slate-400'}`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'text-slate-400'}`}
              >
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
            </div>
          </div>

          {/* Grid de Snippets (Melhoria 19 - Skeleton Simulation via opacity) */}
          <div className={`${viewMode === 'grid' ? 'columns-1 md:columns-2 gap-6' : 'flex flex-col gap-4'}`}>
            {filteredSnippets.length > 0 ? (
              filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} viewMode={viewMode} />
              ))
            ) : (
              <div className="col-span-full py-32 flex flex-col items-center justify-center text-slate-400 bg-white/5 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/5">
                <span className="material-symbols-outlined text-7xl mb-4 text-slate-200 animate-pulse-slow">cloud_off</span>
                <p className="text-lg font-black uppercase tracking-widest">Nada por aqui</p>
                <p className="text-sm font-medium">Tente buscar por tags como #react ou #hooks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
