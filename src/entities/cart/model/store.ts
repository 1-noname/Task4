import type { Product } from '@/entities/product/model/types';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartsByUserId: Record<string, CartItem[]>;
  activeUserId: string;
  setActiveUserId: (id: string | number | null) => void;
  items: () => CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartsByUserId: {},
      activeUserId: "guest",

      setActiveUserId: (id) => {
        set({ activeUserId: id ? String(id) : "guest" });
      },

      items: () => {
        const { cartsByUserId, activeUserId } = get();
        return cartsByUserId[activeUserId] || [];
      },

      addToCart: (product) => {
        const { cartsByUserId, activeUserId } = get();
        const currentCart = cartsByUserId[activeUserId] || [];
        const existingItem = currentCart.find((item) => item.id === product.id);

        let newCart;
        if (existingItem) {
          newCart = currentCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          newCart = [...currentCart, { ...product, quantity: 1 }];
        }

        set({
          cartsByUserId: {
            ...cartsByUserId,
            [activeUserId]: newCart,
          },
        });
      },

      removeFromCart: (id) => {
        const { cartsByUserId, activeUserId } = get();
        const currentCart = cartsByUserId[activeUserId] || [];

        set({
          cartsByUserId: {
            ...cartsByUserId,
            [activeUserId]: currentCart.filter((item) => item.id !== id),
          },
        });
      },

      increaseQuantity: (id) => {
        const { cartsByUserId, activeUserId } = get();
        const currentCart = cartsByUserId[activeUserId] || [];

        set({
          cartsByUserId: {
            ...cartsByUserId,
            [activeUserId]: currentCart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          },
        });
      },

      decreaseQuantity: (id) => {
        const { cartsByUserId, activeUserId } = get();
        const currentCart = cartsByUserId[activeUserId] || [];
        const item = currentCart.find((i) => i.id === id);

        if (item && item.quantity > 1) {
          const newCart = currentCart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          );
          set({
            cartsByUserId: { ...cartsByUserId, [activeUserId]: newCart }
          });
        } else {
          get().removeFromCart(id);
        }
      },

      clearCart: () => {
        const { cartsByUserId, activeUserId } = get();
        set({
          cartsByUserId: { ...cartsByUserId, [activeUserId]: [] }
        });
      },

      getTotalPrice: () => {
        const items = get().items();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartsByUserId: state.cartsByUserId, activeUserId: state.activeUserId }),
    }
  )
);
