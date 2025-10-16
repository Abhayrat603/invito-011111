
export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  createdAt: Date;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  imageId: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  createdAt: Date;
  zipFileUrl?: string;
  isPaid: boolean;
}

export interface DealProduct extends Product {
  discountPrice: number;
  offerEndsAt: Date;
  stock: number;
  sold: number;
  rating: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;

  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  updatedAt: Date;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: Date;
}

export interface EditRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productName: string;
  productId: string;
  requestDetails: string;
  turnaroundTime: 'Urgent' | '1 Day' | '2 Days';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Successful';
  requestedAt: Date;
  updatedAt: Date;
}

export interface AppRating {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AppSettings {
  shareLink: string;
}
