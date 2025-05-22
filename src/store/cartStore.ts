import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountAmount: number;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCouponCode: (code: string | null) => void;
  setDiscountAmount: (amount: number) => void;
  
  // Computed
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getFinalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.recipeId === newItem.recipeId && item.type === newItem.type
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ items: [...items, { ...newItem, id: `${newItem.recipeId}-${newItem.type}-${Date.now()}` }] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      updateQuantity: (id, quantity) => {
        const items = get().items;
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },
      
      clearCart: () => {
        set({ items: [], couponCode: null, discountAmount: 0 });
      },
      
      setCouponCode: (code) => {
        set({ couponCode: code });
      },
      
      setDiscountAmount: (amount) => {
        set({ discountAmount: amount });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalAmount: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getFinalAmount: () => {
        const totalAmount = get().getTotalAmount();
        const discountAmount = get().discountAmount;
        return Math.max(totalAmount - discountAmount, 0);
      }
    }),
    {
      name: 'suvai-chaalai-cart'
    }
  )
);