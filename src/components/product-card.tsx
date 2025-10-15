
"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Find an image from the placeholder data
import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}


export function ProductCard({ product, onSale = false }: { product: Product, onSale?: boolean }) {
    const salePrice = product.price * 0.9;
    const productImage = findImage(product.images[0]);

    return (
        <Link href={`/products/${product.slug}`} className="group/card">
            <div className="bg-card text-card-foreground rounded-lg shadow-sm overflow-hidden border relative transition-all group-hover/card:shadow-md">
                
                {onSale && (
                     <div className="absolute top-0 left-0 bg-yellow-500 text-white font-bold px-4 py-1 rounded-br-lg z-10 text-sm">
                        Paid
                    </div>
                )}
                
                <div className="p-4">
                    <div className="bg-teal-400 rounded-lg p-4 flex flex-col items-center">
                        {productImage && (
                            <Image
                                src="https://picsum.photos/seed/mundan/600/800"
                                alt={product.name}
                                width={400}
                                height={550}
                                className="object-cover rounded-md shadow-lg"
                                data-ai-hint="invitation card"
                            />
                        )}
                        <p className="mt-2 text-white font-semibold text-sm">FREE HINDI DESIGN</p>
                    </div>
                </div>

                <div className="px-6 pb-4">
                     <h3 className="font-medium text-base my-1 text-foreground text-center">
                        Namkaran Card
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-2xl text-foreground">₹70</span>
                        <Button variant="outline" className="bg-green-100 border-green-200 text-green-800 hover:bg-green-200 hover:text-green-900">
                            <Download className="mr-2 h-5 w-5"/>
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
