"use client";

import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existing = items.find(
      (i) => i.id === product.id && i.size === product.size
    );

    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id && i.size === product.size
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...product }] });
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
