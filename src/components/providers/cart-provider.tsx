"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './auth-provider';
import type { CartItem } from '@/lib/types';
import { updateCartAction } from '@/lib/actions';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useSWR from 'swr';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId:string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
}

const fetchCart = async (uid: string) => {
  const cartRef = doc(db, "carts", uid);
  const cartSnap = await getDoc(cartRef);
  if (cartSnap.exists()) {
    return cartSnap.data().items as CartItem[];
  }
  return [];
};


export function CartProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [localItems, setLocalItems] = useState<CartItem[]>([]);
  
  const { data: remoteItems, isLoading: isCartLoading, mutate } = useSWR(
    user ? `cart/${user.uid}` : null,
    () => fetchCart(user!.uid)
  );
  
  const loading = authLoading || isCartLoading;

  useEffect(() => {
    if (remoteItems) {
      setLocalItems(remoteItems);
    } else if(!user) {
      // Clear cart on logout
      setLocalItems([]);
    }
  }, [remoteItems, user]);

  const debouncedUpdate = useCallback(debounce(async (items: CartItem[]) => {
    if (user) {
      await updateCartAction(items);
    }
  }, 1000), [user]);

  const updateCart = (newItems: CartItem[]) => {
    setLocalItems(newItems);
    debouncedUpdate(newItems);
  };

  const addToCart = (productId: string, quantity: number) => {
    const newItems = [...localItems];
    const existingItemIndex = newItems.findIndex(item => item.productId === productId);
    if (existingItemIndex > -1) {
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems.push({ productId, quantity });
    }
    updateCart(newItems);
  };

  const removeFromCart = (productId: string) => {
    const newItems = localItems.filter(item => item.productId !== productId);
    updateCart(newItems);
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = [...localItems];
    const itemIndex = newItems.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      newItems[itemIndex].quantity = quantity;
      updateCart(newItems);
    }
  };

  const clearCart = () => {
    updateCart([]);
  };

  const totalItems = localItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = { items: localItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, loading };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
