
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem, WishlistItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AppStateContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Custom hook to check if window is available
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const { toast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (!isClient) return [];
    try {
      const item = window.localStorage.getItem('cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (!isClient) return [];
    try {
      const item = window.localStorage.getItem('wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isClient]);

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart."
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.productId === productId);
      if (existingItem) {
        return prevWishlist.filter(item => item.productId !== productId);
      }
      return [...prevWishlist, { productId, addedAt: new Date() }];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const value = { cart, wishlist, addToCart, removeFromCart, toggleWishlist, isInWishlist };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
