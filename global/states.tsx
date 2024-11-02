import { create } from "zustand";

interface GlobalProps {
  source: string;
  selectables: string[];
  theme: string;
  word: string;
  setTheme: (new_theme: string) => void;
  setWord: (new_word: string) => void;
  setSelectables: (newSelectables: string[]) => void;
  setSource: (selected: string) => void;
  simpleSetSelectables: (newSelectables: string[]) => void;
}

export const useGlobalStates = create<GlobalProps>((set) => ({
  selectables: ["oxford", "amher", "meriam"],
  source: "oxford",
  theme: "light",
  word: "",
  setWord: (new_word) => set(() => ({ word: new_word })),
  setTheme: (new_theme) => set(() => ({ theme: new_theme })),
  setSource: (newSource) => set(() => ({ source: newSource })),
  setSelectables: (newSelectables) =>
    set((state) => {
      if (newSelectables.filter((val, idx) => idx < 5).includes(state.source)) {
        return { selectables: newSelectables };
      } else {
        state.source = newSelectables[0];
        return { selectables: newSelectables, source: state.source };
      }
    }),
  simpleSetSelectables: (newSelectables) =>
    set(() => ({ selectables: newSelectables })),
}));
