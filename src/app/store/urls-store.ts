import { create } from "zustand";

type UrlsStore = {
  longurl: string;
  setUrl: (url: string) => void;
};

/* `useUrlsStore` is a custom hook created using the `create` function from the `zustand`
library. It creates a store for managing a single URL value and provides a `setUrl`
function to update the URL value. */
export const useUrlsStore = create<UrlsStore>((set) => ({
  longurl: "",
  setUrl: (url) => set({ longurl: url }),
}));
