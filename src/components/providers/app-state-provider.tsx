
"use client";

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import type { CartItem, WishlistItem, Order, Product, DealProduct, EditRequest, AppUser, AppRating, AppSettings } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from './auth-provider';
import { 
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
    updateDoc,
    writeBatch,
    Timestamp,
    where,
    query,
    getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollection } from '@/hooks/use-collection';
import { useDoc } from '@/hooks/use-doc';


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
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'userId'>) => Promise<string>;

  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & { imageUrl: string }) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  addDeal: (deal: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images' | 'isPaid'> & { imageUrl: string }) => void;
  updateDeal: (dealId: string, dealData: Partial<DealProduct>) => void;
  deleteDeal: (dealId: string) => void;
  updateDealStockOnOrder: (cartProducts: any[]) => void;

  addEditRequest: (request: Omit<EditRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt'>) => void;
  updateEditRequestStatus: (requestId: string, status: EditRequest['status']) => void;

  addUser: (user: Omit<AppUser, 'id' | 'createdAt'> & {id: string}) => void;
  addRating: (rating: Omit<AppRating, 'id' | 'createdAt' | 'userId' | 'userName'>) => void;

  updateShareLink: (newLink: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const initialAppSettings: AppSettings = {
    shareLink: 'https://invitedesigner.com'
};

const convertTimestamps = (data: any[], fields: string[]) => {
    return data.map(item => {
        const newItem = {...item};
        fields.forEach(field => {
            if (newItem[field] instanceof Timestamp) {
                newItem[field] = newItem[field].toDate();
            }
        });
        return newItem;
    });
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: productsData } = useCollection(collection(db, 'products'));
  const products: Product[] = productsData ? convertTimestamps(productsData, ['createdAt']) as Product[] : [];

  const { data: dealsData } = useCollection(collection(db, 'deals'));
  const deals: DealProduct[] = dealsData ? convertTimestamps(dealsData, ['createdAt', 'offerEndsAt']) as DealProduct[] : [];

  const { data: usersData } = useCollection(collection(db, 'users'));
  const users: AppUser[] = usersData ? convertTimestamps(usersData, ['createdAt']) as AppUser[] : [];

  const { data: appRatingsData } = useCollection(collection(db, 'appRatings'));
  const appRatings: AppRating[] = appRatingsData ? convertTimestamps(appRatingsData, ['createdAt']) as AppRating[] : [];

  const { data: editRequestsData } = useCollection(collection(db, 'editRequests'));
  const editRequests: EditRequest[] = editRequestsData ? convertTimestamps(editRequestsData, ['requestedAt', 'updatedAt']) as EditRequest[] : [];
  
  const { data: appSettingsData } = useDoc(doc(db, 'settings', 'app'));
  const appSettings: AppSettings = appSettingsData ? appSettingsData as AppSettings : initialAppSettings;

  const { data: cartData } = useCollection(user ? collection(db, `users/${user.uid}/cart`) : null);
  const cart: CartItem[] = cartData as CartItem[] || [];

  const { data: wishlistData } = useCollection(user ? collection(db, `users/${user.uid}/wishlist`) : null);
  const wishlist: WishlistItem[] = wishlistData ? convertTimestamps(wishlistData, ['addedAt']) as WishlistItem[] : [];

  const { data: userOrdersData } = useCollection(user ? query(collection(db, 'orders'), where('userId', '==', user.uid)) : null);
  const userOrders: Order[] = userOrdersData ? convertTimestamps(userOrdersData, ['createdAt']) as Order[] : [];
  
  const { data: adminOrdersData } = useCollection(user && user.email === 'abhayrat603@gmail.com' ? collection(db, 'orders') : null);
  const allOrders: Order[] = adminOrdersData ? convertTimestamps(adminOrdersData, ['createdAt']) as Order[] : [];
  
  const orders = user?.email === 'abhayrat603@gmail.com' ? allOrders : userOrders;


  const addToCart = useCallback(async (productId: string, quantity: number = 1, isDeal: boolean = false) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to add items to your cart.",
        });
        return;
    }

    const userCartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(userCartRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const existingItemDoc = querySnapshot.docs[0];

    const allProductItems = [...products, ...deals];
    const product = allProductItems.find(p => p.id === productId);

    if (isDeal) {
        const userHasPurchasedDeal = orders.some(order => order.items.some(item => item.productId === productId));
        if (userHasPurchasedDeal) {
          toast({ variant: "destructive", title: "Already Purchased", description: "You can only buy a deal item once." });
          return;
        }
        if (!querySnapshot.empty) {
            toast({ variant: "destructive", title: "Already in Cart", description: "Deal items can only be added to the cart once." });
            return;
        }
    }
    
    if (existingItemDoc) {
        const existingItem = existingItemDoc.data() as CartItem;
        const docRef = doc(db, `users/${user.uid}/cart`, existingItemDoc.id);
        await updateDoc(docRef, { quantity: existingItem.quantity + quantity });
    } else {
        await addDoc(userCartRef, { productId, quantity });
    }

    toast({ title: "Added to Cart", description: `${quantity} x ${product?.name || 'item'} has been added.` });
  }, [user, orders, products, deals, toast]);

  const increaseCartQuantity = useCallback(async (productId: string) => {
    if (!user) return;
    const isDeal = deals.some(p => p.id === productId);
    if(isDeal) {
        toast({
            variant: "destructive",
            title: "Purchase Limit",
            description: "You can only buy one of this deal item.",
        });
        return;
    }

    const userCartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(userCartRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const existingItemDoc = querySnapshot.docs[0];

    if(existingItemDoc) {
        const existingItem = existingItemDoc.data() as CartItem;
        const docRef = doc(db, `users/${user.uid}/cart`, existingItemDoc.id);
        await updateDoc(docRef, { quantity: existingItem.quantity + 1 });
    }
  }, [user, deals, toast]);

  const decreaseCartQuantity = useCallback(async (productId: string) => {
    if (!user) return;
    const userCartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(userCartRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const existingItemDoc = querySnapshot.docs[0];

    if(existingItemDoc) {
        const existingItem = existingItemDoc.data() as CartItem;
        const docRef = doc(db, `users/${user.uid}/cart`, existingItemDoc.id);
        if (existingItem.quantity > 1) {
            await updateDoc(docRef, { quantity: existingItem.quantity - 1 });
        } else {
            await deleteDoc(docRef);
        }
    }
  }, [user]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user) return;
    const userCartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(userCartRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const existingItemDoc = querySnapshot.docs[0];

    if(existingItemDoc) {
        await deleteDoc(doc(db, `users/${user.uid}/cart`, existingItemDoc.id));
        toast({
            title: "Item Removed",
            description: "The item has been removed from your cart."
        });
    }
  }, [user, toast]);

  const clearCart = useCallback(async () => {
    if (!user) return;
    const userCartRef = collection(db, `users/${user.uid}/cart`);
    const querySnapshot = await getDocs(userCartRef);
    const batch = writeBatch(db);
    querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
  }, [user]);

  const addOrder = useCallback(async (order: Omit<Order, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) throw new Error("User not authenticated");
    const newOrder = {
        ...order,
        userId: user.uid,
        createdAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    return docRef.id;
  }, [user]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to manage your wishlist.",
        });
        return;
    }

    const userWishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const q = query(userWishlistRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const existingItemDoc = querySnapshot.docs[0];

    const allProductItems = [...products, ...deals];
    const product = allProductItems.find(p => p.id === productId);
    let toastTitle = '';
    let toastDescription = '';
    
    if(existingItemDoc) {
        await deleteDoc(doc(db, `users/${user.uid}/wishlist`, existingItemDoc.id));
        toastTitle = "Removed from Wishlist";
        toastDescription = `${product?.name} has been removed from your wishlist.`;
    } else {
        await addDoc(userWishlistRef, { productId, addedAt: serverTimestamp() });
        toastTitle = "Added to Wishlist";
        toastDescription = `${product?.name} has been added to your wishlist.`;
    }
    toast({ title: toastTitle, description: toastDescription });
  }, [user, products, deals, toast]);


  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & { imageUrl: string }) => {
    const slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProduct = {
      ...productData,
      slug: slug,
      createdAt: serverTimestamp(),
      images: ['product-placeholder-1', 'product-placeholder-2'],
    };
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    
    const imageId = `product-image-${docRef.id}`;
    const newImage = {
        id: imageId,
        description: productData.name,
        imageUrl: productData.imageUrl,
        imageHint: 'custom product'
    };
    const imageExists = PlaceHolderImages.some(img => img.id === imageId);
    if (!imageExists) {
        PlaceHolderImages.push(newImage);
    }
    await updateDoc(docRef, { images: [imageId, 'product-placeholder-2'] });

  }, []);

  const updateProduct = useCallback(async (productId: string, productData: Partial<Omit<Product, 'id'>>) => {
    const productRef = doc(db, 'products', productId);
    const updatedData: Partial<Product> = { ...productData };
    if (productData.name) {
        updatedData.slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    await updateDoc(productRef, updatedData);
  }, []);
  
  const deleteProduct = useCallback(async (productId: string) => {
    await deleteDoc(doc(db, 'products', productId));
  }, []);

  const addDeal = useCallback(async (dealData: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images' | 'isPaid'> & { imageUrl: string }) => {
    const newDeal = {
        ...dealData,
        slug: dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        createdAt: serverTimestamp(),
        offerEndsAt: Timestamp.fromDate(new Date(dealData.offerEndsAt)),
        images: [],
        sold: 0,
        rating: Math.random() * 2 + 3,
        isPaid: true,
    };
    const docRef = await addDoc(collection(db, 'deals'), newDeal);
    const imageId = `product-deal-${docRef.id}`;
    const imageExists = PlaceHolderImages.some(img => img.id === imageId);
    if (!imageExists) {
        PlaceHolderImages.push({
            id: imageId,
            description: dealData.name,
            imageUrl: dealData.imageUrl,
            imageHint: 'custom deal'
        });
    }
    await updateDoc(docRef, { images: [imageId] });

  }, []);

  const updateDeal = useCallback(async (dealId: string, dealData: Partial<DealProduct>) => {
    const dealRef = doc(db, 'deals', dealId);
    const updatedData: Partial<DealProduct> = { ...dealData };
     if (dealData.name) {
        updatedData.slug = dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (dealData.offerEndsAt && !(dealData.offerEndsAt instanceof Timestamp)) {
        updatedData.offerEndsAt = Timestamp.fromDate(new Date(dealData.offerEndsAt));
    }
    await updateDoc(dealRef, updatedData);
  }, []);

  const deleteDeal = useCallback(async (dealId: string) => {
    await deleteDoc(doc(db, 'deals', dealId));
  }, []);

  const updateDealStockOnOrder = useCallback(async (cartProducts: any[]) => {
     const batch = writeBatch(db);
     cartProducts.forEach(p => {
        if (p && 'discountPrice' in p) {
            const deal = deals.find(dp => dp.id === p.id);
            if (deal) {
                const dealRef = doc(db, 'deals', deal.id);
                batch.update(dealRef, { sold: deal.sold + p.quantity });
            }
        }
     });
     await batch.commit();
  }, [deals]);

  const addEditRequest = useCallback(async (request: Omit<EditRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt'>) => {
    if (!user) return;
    const newRequest = {
      ...request,
      userId: user.uid,
      status: 'Pending' as const,
      requestedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'editRequests'), newRequest);
  }, [user]);
  
  const updateEditRequestStatus = useCallback(async (requestId: string, status: EditRequest['status']) => {
    const reqRef = doc(db, 'editRequests', requestId);
    await updateDoc(reqRef, { status, updatedAt: serverTimestamp() });
  }, []);

  const addUser = useCallback(async (user: Omit<AppUser, 'createdAt'> & {id: string}) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: serverTimestamp()
    }, { merge: true });
  }, []);

  const addRating = useCallback(async (rating: Omit<AppRating, 'id' | 'createdAt' | 'userId' | 'userName'>) => {
    if (!user) return;
    const newRating = {
        ...rating,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'appRatings'), newRating);
  }, [user]);

  const updateShareLink = useCallback(async (newLink: string) => {
    const settingsRef = doc(db, 'settings', 'app');
    await updateDoc(settingsRef, { shareLink: newLink }, { merge: true });
  }, []);

  const value = { 
    cart, wishlist, 
    orders,
    products, deals, 
    editRequests, users, appRatings, appSettings,
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
