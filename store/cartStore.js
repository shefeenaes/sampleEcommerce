import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },
  updateQuantity: (id, qty) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      ),
    });
  },
  totalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
}));
