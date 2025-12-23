
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateSnippet from './pages/CreateSnippet';
import { Snippet, Collection } from './types/index';
import { INITIAL_SNIPPETS } from './constants/index';

// Contexto simples de Notificação (Melhoria 8)
export const ToastContext = React.createContext({
  show: (msg: string, type?: 'success' | 'error') => {}
});

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>(INITIAL_SNIPPETS);
  const [collections, setCollections] = useState<Collection[]>([
    { id: '1', name: 'Trabalho', icon: 'work', color: '#3b82f6' },
    { id: '2', name: 'Estudos', icon: 'school', color: '#10b981' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [toast, setToast] = useState<{ msg: string; show: boolean; type: string }>({ msg: '', show: false, type: 'success' });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, show: true, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const addSnippet = (newSnippet: Snippet) => {
    setSnippets(prev => [newSnippet, ...prev]);
    showToast("Snippet salvo com sucesso!");
  };

  return (
    <ToastContext.Provider value={{ show: showToast }}>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header onSearch={setSearchQuery} onToggleTheme={toggleTheme} theme={theme} />
          
          <main className="flex-1 w-full max-w-[1600px] mx-auto pb-20">
            <Routes>
              <Route path="/" element={<Dashboard snippets={snippets} searchQuery={searchQuery} collections={collections} />} />
              <Route path="/new" element={<CreateSnippet onAdd={addSnippet} />} />
            </Routes>
          </main>

          {/* Toast Notification (Melhoria 8) */}
          <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 glass border ${toast.type === 'error' ? 'text-red-400 border-red-500/20' : 'text-primary border-primary/20'}`}>
              <span className="material-symbols-outlined">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
              <span className="text-sm font-bold">{toast.msg}</span>
            </div>
          </div>
        </div>
      </HashRouter>
    </ToastContext.Provider>
  );
}

export default App;
