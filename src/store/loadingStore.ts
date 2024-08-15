import create from 'zustand';

interface LoadingState {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  show: false,
  setShow: (show) => set({ show }),
}));
