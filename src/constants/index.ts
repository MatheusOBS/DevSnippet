
import { Snippet } from './types';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'useDebounce Custom Hook',
    description: 'Hook essencial para otimizar buscas em tempo real e evitar excesso de requisições à API.',
    code: `export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    language: 'TYPESCRIPT',
    tags: ['react', 'hooks', 'performance'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: true,
    isFavorite: true,
    views: 142
  },
  {
    id: '2',
    title: 'Modern Grid Centering',
    description: 'A maneira mais elegante e curta de centralizar qualquer elemento em 2024.',
    code: `.container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}`,
    language: 'CSS',
    tags: ['layout', 'css', 'grid'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    isFavorite: false,
    views: 89
  }
];
