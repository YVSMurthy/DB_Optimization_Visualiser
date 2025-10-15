import { create } from "zustand";

let simulationControlTheme = create((set) => ({
    query: "select",
    n_users: 10,
    setQuery: (newQuery) => set(() => ({ query: newQuery })),
    setUsers: (newCount) => set(() => ({n_users: newCount}))
}));

export { simulationControlTheme };