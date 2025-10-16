
import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  createdAt: Date | Timestamp;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date | Timestamp;
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
  createdAt: Date | Timestamp;
  zipFileUrl?: string;
  isPaid: boolean;
  size?: string;
  fileTypes?: string[];
  requiredSoftware?: string[];
}

export interface DealProduct extends Product {
  discountPrice: number;
  offerEndsAt: Date | Timestamp;
  stock: number;
  sold: number;
  rating: number;
}

export interface CartItem {
  id?: string; // doc id from firestore
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  id?: string; // doc id from firestore
  productId: string;
  addedAt: Date | Timestamp;
}

export interface Cart {
  items: CartItem[];
  updatedAt: Date | Timestamp;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: Date | Timestamp;
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
  requestedAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface AppRating {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date | Timestamp;
}

export interface AppSettings {
  shareLink: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  imageUrl: string;
}

export interface ImagePlaceholder {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}
