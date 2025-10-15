"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { db } from "@/lib/firebase";
import type { Order, OrderItem, Product } from "@/lib/types";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const fetchOrders = async (uid: string): Promise<Order[]> => {
  const ordersQuery = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(ordersQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
};

const fetchProducts = async (productIds: string[]): Promise<Map<string, Product>> => {
  if (productIds.length === 0) return new Map();
  const productsQuery = query(collection(db, "products"), where("id", "in", productIds));
  const querySnapshot = await getDocs(productsQuery);
  const productMap = new Map();
  querySnapshot.forEach(doc => {
    const product = doc.data() as Product;
    productMap.set(product.id, product);
  });
  return productMap;
};

const OrderItemView = ({ item, product }: { item: OrderItem; product: Product | undefined }) => {
    if(!product) return <Skeleton className="h-24 w-full" />;

    const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
    
    return (
        <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                {productImage && (
                    <Image src={productImage.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint={productImage.imageHint}/>
                )}
            </div>
            <div className="flex-grow">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    )
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { data: orders, isLoading: isLoadingOrders } = useSWR(
    user ? `orders/${user.uid}` : null,
    () => fetchOrders(user!.uid)
  );

  const allProductIds = orders?.flatMap(o => o.items.map(i => i.productId)) || [];
  const uniqueProductIds = [...new Set(allProductIds)];

  const { data: productsMap, isLoading: isLoadingProducts } = useSWR(
    uniqueProductIds.length > 0 ? `products/${uniqueProductIds.join(',')}` : null,
    () => fetchProducts(uniqueProductIds)
  );

  const isLoading = isLoadingOrders || isLoadingProducts;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <p>You have not placed any orders yet.</p>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-lg">
              <span>Order #{order.id.substring(0, 7)}</span>
              <Badge variant={order.status === 'placed' ? 'default' : 'secondary'}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {order.items.map((item) => (
                    <OrderItemView key={item.productId} item={item} product={productsMap?.get(item.productId)} />
                ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end items-center">
                <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
