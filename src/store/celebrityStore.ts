import create from 'zustand';
import { fetchPopularCelebrities } from '../services/celebrityService';
import { usePaginationStore } from './paginationStore';

export interface CelebrityProps {
  id: string;
  name: string;
  imageUrl: string;
  age: number;
  profile_path?: string;
  place_of_birth: string;
  birthday: string;
  biography: string;
}

export interface CelebrityStore {
  celebrities: CelebrityProps[];
  fetchCelebrities: () => Promise<void>;
  getCelebrityById: (id: string) => CelebrityProps | undefined;
}

export const useCelebrityStore = create<CelebrityStore>((set, get) => ({
  celebrities: [],
  fetchCelebrities: async () => {
    try {
      const { celebrityPage } = usePaginationStore.getState();
      const celebrities = await fetchPopularCelebrities(celebrityPage);
      set({ celebrities });
    } catch (error) {
      console.error('Erro ao buscar celebridade', error);
    }
  },
  getCelebrityById: (id: string) => {
    return get().celebrities.find((celebrity) => celebrity.id === id);
  },
}));
