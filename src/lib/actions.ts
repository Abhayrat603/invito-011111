"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase-admin";
import type { Cart, CartItem, Order } from "./types";
import { cookies } from "next/headers";

async function getUserId(): Promise<string | null> {
  try {
    const sessionCookie = cookies().get("session")?.value;
    if (!sessionCookie) return null;
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return decodedClaims.uid;
  } catch (error) {
    return null;
  }
}

export async function updateCartAction(items: CartItem[]): Promise<Cart> {
  const uid = await getUserId();
  if (!uid) {
    throw new Error("User not authenticated.");
  }

  const cartRef = db.collection("carts").doc(uid);
  const cartData: Cart = {
    items,
    updatedAt: new Date(),
  };

  await cartRef.set(cartData, { merge: true });

  revalidatePath("/cart");

  return cartData;
}

export async function placeOrderAction(): Promise<{ orderId: string }> {
  const uid = await getUserId();
  if (!uid) {
    throw new Error("User not authenticated.");
  }

  const cartRef = db.collection("carts").doc(uid);
  const cartDoc = await cartRef.get();

  if (!cartDoc.exists) {
    throw new Error("Cart is empty.");
  }

  const cart = cartDoc.data() as Cart;
  if (!cart.items || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const productIds = cart.items.map((item) => item.productId);
  const productsSnapshot = await db.collection("products").where('id', 'in', productIds).get();
  
  const productMap = new Map();
  productsSnapshot.forEach(doc => {
    const product = doc.data();
    productMap.set(product.id, product);
  });

  let total = 0;
  const orderItems = cart.items.map(item => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found.`);
    }
    total += product.price * item.quantity;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    };
  });
  
  const newOrderRef = db.collection("orders").doc();
  const orderData: Omit<Order, "id"> = {
    uid,
    items: orderItems,
    total,
    status: "placed",
    createdAt: new Date(),
  };

  await newOrderRef.set(orderData);
  await cartRef.delete();

  revalidatePath("/cart");
  revalidatePath("/account/orders");

  return { orderId: newOrderRef.id };
}

export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
}

export async function clearSessionCookie() {
  cookies().delete("session");
}
