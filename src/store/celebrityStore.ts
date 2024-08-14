import create from 'zustand';
import { fetchPopularCelebrities } from '../services/celebrityService';

interface CelebrityProps {
  id: string;
  name: string;
  imageUrl: string;
  age: number;
}

interface CelebrityStore {
  celebrities: CelebrityProps[];
  fetchCelebrities: () => Promise<void>;
  getCelebrityById: (id: string) => CelebrityProps | undefined;
}

export const useCelebrityStore = create<CelebrityStore>((set, get) => ({
  celebrities: [],
  fetchCelebrities: async () => {
    try {
      const celebrities = await fetchPopularCelebrities();
      set({ celebrities });
    } catch (error) {
      console.error('Erro ao buscar celebridade', error);
    }
  },
  getCelebrityById: (id: string) => {
    return get().celebrities.find((celebrity) => celebrity.id === id);
  },
}));
