import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { products, categories } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-24 pb-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
             />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-md">
            Style in Motion
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow">
            Discover our new collection of dynamic apparel. Unmatched quality and style, designed for your active life.
          </p>
          <Button asChild size="lg" className="font-bold">
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 4).map((category) => {
            const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
            return (
              <Link href={`/shop?category=${category.name.toLowerCase()}`} key={category.id}>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      {categoryImage && (
                        <Image
                          src={categoryImage.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={categoryImage.imageHint}
                        />
                      )}
                       <div className="absolute inset-0 bg-black/20" />
                       <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg font-headline drop-shadow-md">
                         {category.name}
                       </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="bg-secondary">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              Why E-motion Commerce?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">
                  We source the best materials to create durable and stylish products.
                </p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  Get your orders delivered to your doorstep in no time.
                </p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
                <p className="text-muted-foreground">
                  Your data is safe with our secure and encrypted checkout process.
                </p>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}
