
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { CartItem, WishlistItem, Order, Product, DealProduct, EditRequest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
    products as initialProducts, 
    dealProduct as initialDealProduct, 
    dealProduct2 as initialDealProduct2, 
    dealProduct3 as initialDealProduct3,
    editRequests as initialEditRequests,
    orders as initialOrders
} from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const allInitialDeals = [initialDealProduct, initialDealProduct2, initialDealProduct3];

interface AppStateContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  products: Product[];
  deals: DealProduct[];
  editRequests: EditRequest[];
  
  addToCart: (productId: string, quantity?: number, isDeal?: boolean) => void;
  removeFromCart: (productId: string) => void;
  increaseCartQuantity: (productId: string) => void;
  decreaseCartQuantity: (productId: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  addOrder: (order: Order) => void;

  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & { imageUrl: string }) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  addDeal: (deal: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images'> & { imageUrl: string }) => void;
  updateDeal: (dealId: string, dealData: Partial<DealProduct>) => void;
  deleteDeal: (dealId: string) => void;
  updateDealStockOnOrder: (cartProducts: any[]) => void;

  updateEditRequestStatus: (requestId: string, status: 'Pending' | 'Approved' | 'Rejected') => void;
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

  const [products, setProducts] = useState<Product[]>(() => {
    if (!isClient) return initialProducts;
    try {
      const item = window.localStorage.getItem('products');
      return item ? JSON.parse(item) : initialProducts;
    } catch (error) {
      console.error(error);
      return initialProducts;
    }
  });

  const [deals, setDeals] = useState<DealProduct[]>(() => {
    if (!isClient) return allInitialDeals;
    try {
      const item = window.localStorage.getItem('deals');
      const dealsData = item ? JSON.parse(item) : allInitialDeals;
      return dealsData.map((deal: any) => ({
            ...deal,
            createdAt: new Date(deal.createdAt),
            offerEndsAt: new Date(deal.offerEndsAt),
        }));
    } catch (error) {
      console.error(error);
      return allInitialDeals;
    }
  });

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
    if (!isClient) return initialOrders;
    try {
        const item = window.localStorage.getItem('orders');
        const ordersData = item ? JSON.parse(item) : initialOrders;
        return ordersData.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
        }));
    } catch (error) {
        console.error(error);
        return initialOrders;
    }
  });

  const [editRequests, setEditRequests] = useState<EditRequest[]>(() => {
    if (!isClient) return initialEditRequests;
    try {
        const item = window.localStorage.getItem('editRequests');
        const requestsData = item ? JSON.parse(item) : initialEditRequests;
        return requestsData.map((req: any) => ({
            ...req,
            requestedAt: new Date(req.requestedAt),
            updatedAt: new Date(req.updatedAt),
        }));
    } catch (error) {
        console.error(error);
        return initialEditRequests;
    }
  });


  useEffect(() => { if (isClient) { window.localStorage.setItem('products', JSON.stringify(products)); }}, [products, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('deals', JSON.stringify(deals)); }}, [deals, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('cart', JSON.stringify(cart)); }}, [cart, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('wishlist', JSON.stringify(wishlist)); }}, [wishlist, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('orders', JSON.stringify(orders)); }}, [orders, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('editRequests', JSON.stringify(editRequests)); }}, [editRequests, isClient]);

  const addToCart = useCallback((productId: string, quantity: number = 1, isDeal: boolean = false) => {
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

    const allItems = [...products, ...deals];
    const product = allItems.find(p => p.id === productId);

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
    
    toast({
        title: "Added to Cart",
        description: `${quantity} x ${product?.name || 'item'} has been added to your cart.`
    });
  }, [orders, products, deals, toast]);


  const increaseCartQuantity = useCallback((productId: string) => {
    const isDeal = deals.some(p => p.id === productId);
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
  }, [deals, toast]);

  const decreaseCartQuantity = useCallback((productId: string) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.productId === productId);
        if (existingItem && existingItem.quantity > 1) {
            return prevCart.map(item =>
                item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
        } else {
            return prevCart.filter(item => item.productId !== productId);
        }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart."
    });
  }, [toast]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    let inWishlist = false;
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.productId === productId);
      if (existingItem) {
        inWishlist = true;
        return prevWishlist.filter(item => item.productId !== productId);
      } else {
        inWishlist = false;
        return [...prevWishlist, { productId, addedAt: new Date() }];
      }
    });
    const product = products.find(p => p.id === productId);
    toast({
        title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
        description: `${product?.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`
    });
  }, [products, toast]);


  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & { imageUrl: string }) => {
    const newId = `prod${Date.now()}`;
    const imageId = `product-image-${newId}`;
    
    PlaceHolderImages.push({
        id: imageId,
        description: productData.name,
        imageUrl: productData.imageUrl,
        imageHint: 'custom product'
    });
    
    const newProduct: Product = {
      ...productData,
      id: newId,
      slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      images: [imageId, 'product-placeholder-2'],
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((productId: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
        if (p.id === productId) {
            const updatedProduct = { ...p, ...productData };
            if (productData.name) {
                updatedProduct.slug = productData.name.toLowerCase().replace(/\s+/g, '-');
            }
            return updatedProduct;
        }
        return p;
    }));
  }, []);
  
  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const addDeal = useCallback((dealData: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images'> & { imageUrl: string }) => {
    const newId = `deal${Date.now()}`;
    const imageId = `product-deal-${newId}`;

    PlaceHolderImages.push({
        id: imageId,
        description: dealData.name,
        imageUrl: dealData.imageUrl,
        imageHint: 'custom deal'
    });
    
    const newDeal: DealProduct = {
      ...dealData,
      id: newId,
      slug: dealData.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      images: [imageId],
      sold: 0,
      rating: Math.random() * 2 + 3, // 3 to 5 stars
    };
    setDeals(prev => [...prev, newDeal]);
  }, []);

  const updateDeal = useCallback((dealId: string, dealData: Partial<DealProduct>) => {
    setDeals(prev => prev.map(d => {
        if (d.id === dealId) {
            const updatedDeal = { ...d, ...dealData };
            if (dealData.name) {
                updatedDeal.slug = dealData.name.toLowerCase().replace(/\s+/g, '-');
            }
            return updatedDeal;
        }
        return d;
    }));
  }, []);

  const deleteDeal = useCallback((dealId: string) => {
    setDeals(prev => prev.filter(d => d.id !== dealId));
  }, []);

  const updateDealStockOnOrder = useCallback((cartProducts: any[]) => {
     setDeals(prevDeals => {
        const newDeals = [...prevDeals];
        cartProducts.forEach(p => {
            if (p && 'discountPrice' in p) { // It's a deal product
                const dealIndex = newDeals.findIndex(dp => dp.id === p.id);
                if (dealIndex !== -1) {
                    newDeals[dealIndex].sold += p.quantity;
                }
            }
        });
        return newDeals;
     });
  }, []);

  const updateEditRequestStatus = useCallback((requestId: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    setEditRequests(prev => prev.map(req => req.id === requestId ? { ...req, status, updatedAt: new Date() } : req));
  }, []);

  const value = { 
    cart, wishlist, orders, products, deals, editRequests,
    addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart, 
    toggleWishlist, isInWishlist, addOrder,
    addProduct, updateProduct, deleteProduct,
    addDeal, updateDeal, deleteDeal, updateDealStockOnOrder,
    updateEditRequestStatus,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
