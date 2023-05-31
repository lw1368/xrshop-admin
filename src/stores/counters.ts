import { create } from "zustand";

interface CounterState {
  counter: number;
  count: (num: number) => void;
}

const useCounterStore = create<CounterState>()((set) => ({
  counter: 0,
  count: (num) => set((state) => ({ counter: state.counter + num })),
}));

export default useCounterStore;
