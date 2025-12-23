
export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isFavorite: boolean;
  explanation?: string;
  views: number;
  collectionId?: string;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export enum FilterCategory {
  ALL = 'Todos',
  PINNED = 'Fixados',
  FAVORITES = 'Favoritos',
  RECENT = 'Recentes',
  COLLECTIONS = 'Coleções'
}
