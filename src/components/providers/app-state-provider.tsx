
"use client";

import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import type { CartItem, WishlistItem, Order, Product, DealProduct, EditRequest, AppUser, AppRating, AppSettings, Testimonial, ImagePlaceholder } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
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
    getDocs,
    setDoc
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
  testimonial: Testimonial;
  images: ImagePlaceholder[];
  
  addToCart: (productId: string, quantity?: number, isDeal?: boolean) => void;
  removeFromCart: (productId: string) => void;
  increaseCartQuantity: (productId: string) => void;
  decreaseCartQuantity: (productId: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'userId'>) => Promise<string>;

  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images' | 'fileTypes' | 'requiredSoftware'> & { imageUrl: string; fileTypes?: string; requiredSoftware?: string; }) => void;
  updateProduct: (productId: string, productData: Partial<Product> & { imageUrl?: string; fileTypes?: string; requiredSoftware?: string; }) => void;
  deleteProduct: (productId: string) => void;

  addDeal: (deal: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images' | 'isPaid'> & { imageUrl: string }) => void;
  updateDeal: (dealId: string, dealData: Partial<DealProduct> & { imageUrl?: string }) => void;
  deleteDeal: (dealId: string) => void;
  updateDealStockOnOrder: (cartProducts: any[]) => void;

  addEditRequest: (request: Omit<EditRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt'>) => void;
  updateEditRequestStatus: (requestId: string, status: EditRequest['status']) => void;

  addUser: (user: Omit<AppUser, 'createdAt'> & {id: string}) => void;
  addRating: (rating: Omit<AppRating, 'id' | 'createdAt' | 'userId' | 'userName'>) => void;

  updateShareLink: (newLink: string) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  findImage: (id: string) => ImagePlaceholder | undefined;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const initialAppSettings: AppSettings = {
    shareLink: 'https://invitedesigner.com'
};

const initialTestimonial: Testimonial = {
    name: "ALAN DOE",
    title: "CEO & Founder Invision",
    quote: "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet.",
    imageUrl: "https://i.ibb.co/L9LcfJ3/testimonial-alan.jpg"
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

  const productsQuery = useMemo(() => collection(db, 'products'), []);
  const { data: productsData } = useCollection(productsQuery);
  const products: Product[] = productsData ? convertTimestamps(productsData, ['createdAt']) as Product[] : [];

  const dealsQuery = useMemo(() => collection(db, 'deals'), []);
  const { data: dealsData } = useCollection(dealsQuery);
  const deals: DealProduct[] = dealsData ? convertTimestamps(dealsData, ['createdAt', 'offerEndsAt']) as DealProduct[] : [];

  const usersQuery = useMemo(() => collection(db, 'users'), []);
  const { data: usersData } = useCollection(usersQuery);
  const users: AppUser[] = usersData ? convertTimestamps(usersData, ['createdAt']) as AppUser[] : [];

  const appRatingsQuery = useMemo(() => collection(db, 'appRatings'), []);
  const { data: appRatingsData } = useCollection(appRatingsQuery);
  const appRatings: AppRating[] = appRatingsData ? convertTimestamps(appRatingsData, ['createdAt']) as AppRating[] : [];

  const editRequestsQuery = useMemo(() => collection(db, 'editRequests'), []);
  const { data: editRequestsData } = useCollection(editRequestsQuery);
  const editRequests: EditRequest[] = editRequestsData ? convertTimestamps(editRequestsData, ['requestedAt', 'updatedAt']) as EditRequest[] : [];
  
  const appSettingsDoc = useMemo(() => doc(db, 'settings', 'app'), []);
  const { data: appSettingsData } = useDoc(appSettingsDoc);
  const appSettings: AppSettings = appSettingsData ? appSettingsData as AppSettings : initialAppSettings;

  const testimonialDoc = useMemo(() => doc(db, 'settings', 'testimonial'), []);
  const { data: testimonialData } = useDoc(testimonialDoc);
  const testimonial: Testimonial = testimonialData ? testimonialData as Testimonial : initialTestimonial;

  const imagesQuery = useMemo(() => collection(db, 'images'), []);
  const { data: imagesData } = useCollection(imagesQuery);
  const images: ImagePlaceholder[] = imagesData as ImagePlaceholder[] || [];

  const cartCollectionRef = useMemo(() => user ? collection(db, `users/${user.uid}/cart`) : null, [user]);
  const { data: cartData } = useCollection(cartCollectionRef);
  const cart: CartItem[] = cartData as CartItem[] || [];

  const wishlistCollectionRef = useMemo(() => user ? collection(db, `users/${user.uid}/wishlist`) : null, [user]);
  const { data: wishlistData } = useCollection(wishlistCollectionRef);
  const wishlist: WishlistItem[] = wishlistData ? convertTimestamps(wishlistData, ['addedAt']) as WishlistItem[] : [];

  const userOrdersQuery = useMemo(() => user ? query(collection(db, 'orders'), where('userId', '==', user.uid)) : null, [user]);
  const { data: userOrdersData } = useCollection(userOrdersQuery);
  const userOrders: Order[] = userOrdersData ? convertTimestamps(userOrdersData, ['createdAt']) as Order[] : [];
  
  const allOrdersQuery = useMemo(() => (user && user.email === 'abhayrat603@gmail.com') ? collection(db, 'orders') : null, [user]);
  const { data: adminOrdersData } = useCollection(allOrdersQuery);
  const allOrders: Order[] = adminOrdersData ? convertTimestamps(adminOrdersData, ['createdAt']) as Order[] : [];
  
  const orders = user?.email === 'abhayrat603@gmail.com' ? allOrders : userOrders;

  const findImage = useCallback((id: string) => {
    return images.find(img => img.id === id);
  }, [images]);

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

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'images' | 'fileTypes' | 'requiredSoftware'> & { imageUrl: string; fileTypes?: string; requiredSoftware?: string; }) => {
    const slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProductRef = doc(collection(db, 'products'));
    const imageId = `product-image-${newProductRef.id}`;
    
    const newImage = {
        id: imageId,
        description: productData.name,
        imageUrl: productData.imageUrl,
        imageHint: 'custom product'
    };
    await setDoc(doc(db, 'images', imageId), newImage);

    const newProduct = {
      ...productData,
      id: newProductRef.id,
      slug: slug,
      createdAt: serverTimestamp(),
      images: [imageId, 'product-placeholder-2'],
      fileTypes: productData.fileTypes?.split(',').map(s => s.trim()).filter(Boolean) || [],
      requiredSoftware: productData.requiredSoftware?.split(',').map(s => s.trim()).filter(Boolean) || [],
    };
    await setDoc(newProductRef, newProduct);
  }, []);

  const updateProduct = useCallback(async (productId: string, productData: Partial<Omit<Product, 'id'>> & { imageUrl?: string; fileTypes?: string; requiredSoftware?: string; }) => {
    const productRef = doc(db, 'products', productId);
    const { imageUrl, ...restOfProductData } = productData;
    
    const updatedData: any = { ...restOfProductData };
    
    if (productData.name) {
        updatedData.slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    if (imageUrl) {
        const imageId = `product-image-${productId}`;
        const imageRef = doc(db, 'images', imageId);
        const imagePayload = {
            id: imageId,
            description: productData.name || 'Product Image',
            imageUrl: imageUrl,
            imageHint: 'custom product'
        }
        await setDoc(imageRef, imagePayload, { merge: true });
        updatedData.images = [imageId, 'product-placeholder-2'];
    }

    if (typeof productData.fileTypes === 'string') {
        updatedData.fileTypes = productData.fileTypes.split(',').map(s => s.trim()).filter(Boolean);
    }
     if (typeof productData.requiredSoftware === 'string') {
        updatedData.requiredSoftware = productData.requiredSoftware.split(',').map(s => s.trim()).filter(Boolean);
    }

    await updateDoc(productRef, updatedData);
  }, []);
  
  const deleteProduct = useCallback(async (productId: string) => {
    await deleteDoc(doc(db, 'products', productId));
    // Also delete the associated image
    await deleteDoc(doc(db, 'images', `product-image-${productId}`));
  }, []);

  const addDeal = useCallback(async (dealData: Omit<DealProduct, 'id' | 'slug' | 'createdAt' | 'sold' | 'rating' | 'images' | 'isPaid'> & { imageUrl: string }) => {
    const newDealRef = doc(collection(db, 'deals'));
    const imageId = `product-deal-${newDealRef.id}`;
    
    const newImage = {
        id: imageId,
        description: dealData.name,
        imageUrl: dealData.imageUrl,
        imageHint: 'custom deal'
    };
    await setDoc(doc(db, 'images', imageId), newImage);

    const newDeal = {
        ...dealData,
        id: newDealRef.id,
        slug: dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        createdAt: serverTimestamp(),
        offerEndsAt: Timestamp.fromDate(new Date(dealData.offerEndsAt)),
        images: [imageId],
        sold: 0,
        rating: Math.random() * 2 + 3,
        isPaid: true,
    };
    await setDoc(newDealRef, newDeal);
  }, []);

  const updateDeal = useCallback(async (dealId: string, dealData: Partial<DealProduct> & { imageUrl?: string }) => {
    const dealRef = doc(db, 'deals', dealId);
    const { imageUrl, ...restOfDealData } = dealData;
    const updatedData: Partial<DealProduct> = { ...restOfDealData };

     if (dealData.name) {
        updatedData.slug = dealData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (dealData.offerEndsAt && !(dealData.offerEndsAt instanceof Timestamp)) {
        updatedData.offerEndsAt = Timestamp.fromDate(new Date(dealData.offerEndsAt));
    }

    if (imageUrl) {
        const imageId = `product-deal-${dealId}`;
        const imageRef = doc(db, 'images', imageId);
        const imagePayload = {
            id: imageId,
            description: dealData.name || 'Deal Image',
            imageUrl: imageUrl,
            imageHint: 'custom deal'
        };
        await setDoc(imageRef, imagePayload, { merge: true });
        updatedData.images = [imageId];
    }

    await updateDoc(dealRef, updatedData);
  }, []);

  const deleteDeal = useCallback(async (dealId: string) => {
    await deleteDoc(doc(db, 'deals', dealId));
    await deleteDoc(doc(db, 'images', `product-deal-${dealId}`));
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
    await setDoc(userRef, {
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
    await setDoc(settingsRef, { shareLink: newLink }, { merge: true });
  }, []);

  const updateTestimonial = useCallback(async (testimonialData: Testimonial) => {
    const testimonialRef = doc(db, 'settings', 'testimonial');
    await setDoc(testimonialRef, testimonialData, { merge: true });
  }, []);


  const value = { 
    cart, wishlist, 
    orders,
    products, deals, 
    editRequests, users, appRatings, appSettings, testimonial,
    images,
    addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart, 
    toggleWishlist, isInWishlist, addOrder,
    addProduct, updateProduct, deleteProduct,
    addDeal, updateDeal, deleteDeal, updateDealStockOnOrder,
    addEditRequest, updateEditRequestStatus,
    addUser,
    addRating,
    updateShareLink,
    updateTestimonial,
    findImage,
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
