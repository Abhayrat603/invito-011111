
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem, WishlistItem, Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { dealProduct, dealProduct2, dealProduct3 } from '@/lib/mock-data';

const allDealProducts = [dealProduct, dealProduct2, dealProduct3];

interface AppStateContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  addToCart: (productId: string, quantity?: number, isDeal?: boolean) => void;
  removeFromCart: (productId: string) => void;
  increaseCartQuantity: (productId: string) => void;
  decreaseCartQuantity: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addOrder: (order: Order) => void;
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

  const [orders, setOrders] = useState<Order[]>(() => {
    if (!isClient) return [];
    try {
        const item = window.localStorage.getItem('orders');
        // Need to parse dates correctly from JSON
        const ordersData = item ? JSON.parse(item) : [];
        return ordersData.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
        }));
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

  useEffect(() => {
    if (isClient) {
        window.localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isClient]);

  const addToCart = (productId: string, quantity: number = 1, isDeal: boolean = false) => {
    
    if (isDeal) {
      const alreadyPurchased = orders.some(order => order.items.some(item => item.productId === productId));
      if (alreadyPurchased) {
        toast({
            variant: "destructive",
            title: "Already Purchased",
            description: "You can only buy a deal item once.",
        });
        return;
      }
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (isDeal && existingItem) {
        toast({
            variant: "destructive",
            title: "Already in Cart",
            description: "Deal items can only be added to the cart once.",
        });
        return prevCart;
      }

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

  const increaseCartQuantity = (productId: string) => {
    const isDeal = allDealProducts.some(p => p.id === productId);
    if(isDeal) {
        toast({
            variant: "destructive",
            title: "Purchase Limit",
            description: "You can only buy one of this deal item.",
        });
        return;
    }
    setCart(prevCart => {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    });
  };

  const decreaseCartQuantity = (productId: string) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.productId === productId);
        if (existingItem && existingItem.quantity > 1) {
            return prevCart.map(item =>
                item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
        } else {
            // Remove the item if quantity is 1 or less
            return prevCart.filter(item => item.productId !== productId);
        }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart."
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
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

  const value = { cart, wishlist, orders, addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart, toggleWishlist, isInWishlist, addOrder };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
