
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { CartItem, WishlistItem, Order, Product, DealProduct, EditRequest, AppUser, AppRating, AppSettings } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
    products as initialProducts, 
    dealProduct as initialDealProduct, 
    dealProduct2 as initialDealProduct2, 
    dealProduct3 as initialDealProduct3,
    editRequests as initialEditRequests,
    orders as initialOrders,
    initialUsers,
    initialAppRatings,
} from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const allInitialDeals = [initialDealProduct, initialDealProduct2, initialDealProduct3];

const initialAppSettings: AppSettings = {
    shareLink: 'https://invitedesigner.com'
};

interface AppStateContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  products: Product[];
  deals: DealProduct[];
  editRequests: EditRequest[];
  users: AppUser[];
  appRatings: AppRating[];
  appSettings: AppSettings;
  
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

  addEditRequest: (request: Omit<EditRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt'>) => void;
  updateEditRequestStatus: (requestId: string, status: EditRequest['status']) => void;

  addUser: (user: AppUser) => void;
  addRating: (rating: Omit<AppRating, 'id' | 'createdAt'>) => void;

  updateShareLink: (newLink: string) => void;
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
  
  const [users, setUsers] = useState<AppUser[]>(() => {
    if (!isClient) return initialUsers;
    try {
        const item = window.localStorage.getItem('users');
        const usersData = item ? JSON.parse(item) : initialUsers;
        return usersData.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt),
        }));
    } catch (error) {
        console.error(error);
        return initialUsers;
    }
  });
  
  const [appRatings, setAppRatings] = useState<AppRating[]>(() => {
    if (!isClient) return initialAppRatings;
    try {
      const item = window.localStorage.getItem('appRatings');
      const ratingsData = item ? JSON.parse(item) : initialAppRatings;
      return ratingsData.map((rating: any) => ({
        ...rating,
        createdAt: new Date(rating.createdAt),
      }));
    } catch (error) {
      console.error(error);
      return initialAppRatings;
    }
  });
  
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    if (!isClient) return initialAppSettings;
    try {
      const item = window.localStorage.getItem('appSettings');
      return item ? JSON.parse(item) : initialAppSettings;
    } catch (error) {
      console.error(error);
      return initialAppSettings;
    }
  });


  useEffect(() => { if (isClient) { window.localStorage.setItem('products', JSON.stringify(products)); }}, [products, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('deals', JSON.stringify(deals)); }}, [deals, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('cart', JSON.stringify(cart)); }}, [cart, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('wishlist', JSON.stringify(wishlist)); }}, [wishlist, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('orders', JSON.stringify(orders)); }}, [orders, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('editRequests', JSON.stringify(editRequests)); }}, [editRequests, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('users', JSON.stringify(users)); }}, [users, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('appRatings', JSON.stringify(appRatings)); }}, [appRatings, isClient]);
  useEffect(() => { if (isClient) { window.localStorage.setItem('appSettings', JSON.stringify(appSettings)); }}, [appSettings, isClient]);

  const addToCart = useCallback((productId: string, quantity: number = 1, isDeal: boolean = false) => {
    let itemAdded = false;
    let toastTitle = '';
    let toastDescription = '';
    
    setCart(prevCart => {
      const allItems = [...products, ...deals];
      const product = allItems.find(p => p.id === productId);

      if (isDeal) {
        const alreadyPurchased = orders.some(order => order.items.some(item => item.productId === productId));
        if (alreadyPurchased) {
          toastTitle = "Already Purchased";
          toastDescription = "You can only buy a deal item once.";
          return prevCart;
        }
      }

      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (isDeal && existingItem) {
        toastTitle = "Already in Cart";
        toastDescription = "Deal items can only be added to the cart once.";
        return prevCart;
      }
      
      toastTitle = "Added to Cart";
      toastDescription = `${quantity} x ${product?.name || 'item'} has been added to your cart.`;
      itemAdded = true;

      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });

    if (toastTitle) {
        toast({
            variant: itemAdded ? "default" : "destructive",
            title: toastTitle,
            description: toastDescription
        });
    }
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
    let toastTitle = '';
    let toastDescription = '';
    let isLiked = false;

    setWishlist(prevWishlist => {
      const product = products.find(p => p.id === productId);
      const existingItem = prevWishlist.find(item => item.productId === productId);
      isLiked = !!existingItem;

      if (existingItem) {
        toastTitle = "Removed from Wishlist";
        toastDescription = `${product?.name} has been removed from your wishlist.`;
        return prevWishlist.filter(item => item.productId !== productId);
      } else {
        toastTitle = "Added to Wishlist";
        toastDescription = `${product?.name} has been added to your wishlist.`;
        return [...prevWishlist, { productId, addedAt: new Date() }];
      }
    });
    
    if (toastTitle) {
      toast({ title: toastTitle, description: toastDescription });
    }
  }, [products, toast]);


  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & { imageUrl: string }) => {
    setProducts(prev => {
      const newId = `prod${Date.now()}`;
      const imageId = `product-image-${newId}`;
      
      const newImage = {
          id: imageId,
          description: productData.name,
          imageUrl: productData.imageUrl,
          imageHint: 'custom product'
      };
      PlaceHolderImages.push(newImage);
      // This is a bit of a hack to ensure the main JSON file is also updated if it were a real filesystem
      // In this environment, we just need to ensure our stateful `PlaceHolderImages` has the data.
      
      const newProduct: Product = {
        ...productData,
        id: newId,
        slug: productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        createdAt: new Date(),
        images: [imageId, 'product-placeholder-2'],
      };
      return [newProduct, ...prev];
    });
  }, []);

  const updateProduct = useCallback((productId: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
        if (p.id === productId) {
            const updatedProduct = { ...p, ...productData };
            if (productData.name) {
                updatedProduct.slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
    setDeals(prev => {
      const newId = `deal${Date.now()}`;
      const imageId = `product-deal-${newId}`;

      const newImage = {
          id: imageId,
          description: dealData.name,
          imageUrl: dealData.imageUrl,
          imageHint: 'custom deal'
      };
      PlaceHolderImages.push(newImage);

      const newDeal: DealProduct = {
        ...dealData,
        id: newId,
        slug: dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        createdAt: new Date(),
        images: [imageId],
        sold: 0,
        rating: Math.random() * 2 + 3, // 3 to 5 stars
      };
      return [newDeal, ...prev];
    });
  }, []);

  const updateDeal = useCallback((dealId: string, dealData: Partial<DealProduct>) => {
    setDeals(prev => prev.map(d => {
        if (d.id === dealId) {
            const updatedDeal = { ...d, ...dealData };
            if (dealData.name) {
                updatedDeal.slug = dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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

  const addEditRequest = useCallback((request: Omit<EditRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt'>) => {
    setEditRequests(prev => {
      const newRequest: EditRequest = {
        ...request,
        id: `req${Date.now()}`,
        status: 'Pending',
        requestedAt: new Date(),
        updatedAt: new Date(),
      };
      return [newRequest, ...prev];
    });
  }, []);
  
  const updateEditRequestStatus = useCallback((requestId: string, status: EditRequest['status']) => {
    setEditRequests(prev => prev.map(req => req.id === requestId ? { ...req, status, updatedAt: new Date() } : req));
  }, []);

  const addUser = useCallback((user: AppUser) => {
    setUsers(prev => {
        // Avoid adding duplicate users
        if (prev.some(u => u.email === user.email)) {
            return prev;
        }
        return [...prev, user];
    });
  }, []);

  const addRating = useCallback((rating: Omit<AppRating, 'id' | 'createdAt'>) => {
    setAppRatings(prev => {
        const newRating: AppRating = {
            ...rating,
            id: `rating${Date.now()}`,
            createdAt: new Date(),
        };
        return [newRating, ...prev];
    });
  }, []);

  const updateShareLink = useCallback((newLink: string) => {
    setAppSettings(prev => ({ ...prev, shareLink: newLink }));
  }, []);

  const value = { 
    cart, wishlist, orders, products, deals, editRequests, users, appRatings, appSettings,
    addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart, 
    toggleWishlist, isInWishlist, addOrder,
    addProduct, updateProduct, deleteProduct,
    addDeal, updateDeal, deleteDeal, updateDealStockOnOrder,
    addEditRequest, updateEditRequestStatus,
    addUser,
    addRating,
    updateShareLink,
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
