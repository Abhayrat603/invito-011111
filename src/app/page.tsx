
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, Heart, User, ShoppingBag, Star, ChevronDown, Plus, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products, categories } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress";

function getPlaceholderImage(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (image) {
        return image;
    }
    const productImages: {[key: string]: {url: string, hint: string}} = {
        'product-tee-1': { url: 'https://picsum.photos/seed/tee1/800/800', hint: 'gray t-shirt' },
        'product-shorts-1': { url: 'https://picsum.photos/seed/shorts1/800/800', hint: 'running shorts' },
        'product-sneakers-1': { url: 'https://picsum.photos/seed/sneaker1/800/800', hint: 'white sneakers' },
        'product-hoodie-1': { url: 'https://picsum.photos/seed/hoodie1/800/800', hint: 'gray hoodie' },
    };
    if (productImages[id]) {
        return {
            id: id,
            imageUrl: productImages[id].url,
            imageHint: productImages[id].hint,
            description: "Product image"
        }
    }
    return {
        id: 'fallback',
        imageUrl: 'https://picsum.photos/seed/fallback/800/800',
        imageHint: 'product image',
        description: 'Product image'
    };
}

const navLinks = ["Home", "Categories", "Men's", "Women's", "Jewelry", "Perfume", "Blog", "Hot Offers"];


const BestSellerItem = ({product}: {product: (typeof products)[0]}) => {
    const image = getPlaceholderImage(product.images[0]);
    return (
        <div className="flex items-center space-x-3">
            <div className="w-16 h-16 relative rounded-md overflow-hidden">
                {image && <Image src={image.imageUrl} alt={product.name} layout="fill" objectFit="cover" />}
            </div>
            <div>
                <h4 className="text-sm font-medium text-foreground">{product.name}</h4>
                <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3", i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                    ))}
                </div>
                <p className="text-sm font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

const ProductListItem = ({product}: {product: (typeof products)[0]}) => {
    const image = getPlaceholderImage(product.images[0]);
    return (
        <div className="flex items-center space-x-4">
            <div className="w-24 h-24 relative rounded-md overflow-hidden">
                 {image && <Image src={image.imageUrl} alt={product.name} layout="fill" objectFit="cover" />}
            </div>
            <div>
                <h4 className="text-base font-semibold text-foreground hover:text-primary transition-colors">{product.name}</h4>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                 <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-base font-bold text-primary">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}


export default function EcommerceHomePage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
        <div className="bg-background text-foreground">
            <header className="border-b">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex justify-between items-center text-xs py-2 text-muted-foreground">
                        <p>FREE SHIPPING THIS WEEK ORDER OVER - $55</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <span>USD $</span>
                                <ChevronDown className="w-4 h-4"/>
                            </div>
                             <div className="flex items-center gap-1">
                                <span>ENGLISH</span>
                                <ChevronDown className="w-4 h-4"/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                     <div className="flex justify-between items-center py-4">
                        <h1 className="text-3xl font-bold font-headline text-primary">Anon</h1>
                        <div className="relative w-full max-w-md">
                            <Input placeholder="Enter your product name..." className="bg-card border-border rounded-lg h-12 pl-4 pr-10" />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                        </div>
                         <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon"><User className="w-6 h-6"/></Button>
                            <Button variant="ghost" size="icon"><Heart className="w-6 h-6"/></Button>
                            <Button variant="ghost" size="icon"><ShoppingBag className="w-6 h-6"/></Button>
                        </div>
                    </div>
                    <hr/>
                    <nav className="flex justify-center items-center space-x-6 py-3">
                        {navLinks.map(link => (
                            <Link href="#" key={link}>
                                <div className="text-sm font-semibold uppercase text-foreground hover:text-primary transition-colors">{link}</div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl mt-8">
                <section className="relative mb-8 rounded-lg overflow-hidden bg-secondary/30">
                    <div className="grid grid-cols-2 items-center">
                         <div className="pl-16">
                            <p className="font-semibold text-primary uppercase">Trending Accessories</p>
                            <h2 className="text-5xl font-bold my-4 leading-tight font-headline">MODERN<br/>SUNGLASSES</h2>
                            <p className="text-lg mb-6">starting at $ 15.00</p>
                            <Button className="bg-primary text-primary-foreground rounded-lg px-8 py-6">SHOP NOW</Button>
                        </div>
                        <div className="relative h-[450px] w-full">
                           <Image src="https://picsum.photos/seed/sunglasses/800/900" layout="fill" objectFit="cover" alt="Fashion Sale" data-ai-hint="fashion models sunglasses" />
                        </div>
                    </div>
                </section>


                <div className="grid grid-cols-12 gap-8">
                    <aside className="col-span-3">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg mb-4">CATEGORY</h3>
                                <ul className="space-y-3">
                                    {categories.map(cat => (
                                        <li key={cat.id}>
                                            <Link href="#">
                                                <div className="flex justify-between items-center text-foreground hover:text-primary transition-colors">
                                                    <span>{cat.name}</span>
                                                    <Plus className="w-4 h-4"/>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                         <Link href="#">
                                            <div className="flex justify-between items-center text-foreground hover:text-primary transition-colors">
                                                <span>Bags</span>
                                                <Plus className="w-4 h-4"/>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-lg mb-4">BEST SELLERS</h3>
                                <div className="space-y-4">
                                   {products.slice(0, 3).map(p => <BestSellerItem key={p.id} product={p} />)}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="col-span-9">
                        <Tabs defaultValue="new-arrivals">
                            <TabsList className="bg-transparent p-0 border-b-0 rounded-none mb-4 justify-start gap-6">
                                <TabsTrigger value="new-arrivals" className="text-lg font-semibold p-0 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">New Arrivals</TabsTrigger>
                                <TabsTrigger value="trending" className="text-lg font-semibold p-0 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">Trending</TabsTrigger>
                                <TabsTrigger value="top-rated" className="text-lg font-semibold p-0 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">Top Rated</TabsTrigger>
                            </TabsList>
                            <TabsContent value="new-arrivals">
                                <div className="grid grid-cols-3 gap-6">
                                    {products.slice(0, 6).map(p => <ProductListItem key={p.id} product={p}/>)}
                                </div>
                            </TabsContent>
                            <TabsContent value="trending">
                               <div className="grid grid-cols-3 gap-6">
                                    {products.slice(2, 8).map(p => <ProductListItem key={p.id} product={p}/>)}
                                </div>
                            </TabsContent>
                             <TabsContent value="top-rated">
                               <div className="grid grid-cols-3 gap-6">
                                    {products.slice(1, 7).map(p => <ProductListItem key={p.id} product={p}/>)}
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-12 p-8 bg-secondary/30 rounded-lg flex items-center gap-8">
                             <div className="w-1/3">
                                <div className="relative aspect-square">
                                    <Image src="https://picsum.photos/seed/shampoo/800/800" alt="Deal of the day" layout="fill" objectFit="contain" data-ai-hint="shampoo bottle" />
                                </div>
                             </div>
                             <div className="w-2/3">
                                <div className="flex items-center space-x-2">
                                    {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <h3 className="text-2xl font-semibold my-2">SHAMPOO, CONDITIONER & FACEWASH PACKS</h3>
                                <p className="text-muted-foreground text-sm">Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor</p>
                                <div className="flex items-baseline gap-2 my-4">
                                    <p className="text-3xl font-bold text-primary">$150.00</p>
                                    <p className="text-xl text-muted-foreground line-through">$200.00</p>
                                </div>
                                <Button className="bg-primary text-primary-foreground rounded-lg px-8 py-6 mb-4">ADD TO CART</Button>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span>ALREADY SOLD: <strong>20</strong></span>
                                    <span>AVAILABLE: <strong>40</strong></span>
                                </div>
                                <Progress value={33} className="h-2" />
                                <div className="mt-4">
                                    <p className="text-sm font-semibold">HURRY UP! OFFER ENDS IN:</p>
                                    <div className="flex gap-4 mt-2">
                                        <div className="text-center p-3 rounded-md bg-background shadow-md">
                                            <span className="text-2xl font-bold">360</span>
                                            <span className="text-xs block">Days</span>
                                        </div>
                                         <div className="text-center p-3 rounded-md bg-background shadow-md">
                                            <span className="text-2xl font-bold">24</span>
                                            <span className="text-xs block">Hours</span>
                                        </div>
                                         <div className="text-center p-3 rounded-md bg-background shadow-md">
                                            <span className="text-2xl font-bold">59</span>
                                            <span className="text-xs block">Min</span>
                                        </div>
                                         <div className="text-center p-3 rounded-md bg-background shadow-md">
                                            <span className="text-2xl font-bold">00</span>
                                            <span className="text-xs block">Sec</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                    </div>
                </div>

            </main>

            <footer className="bg-card mt-16 border-t">
                <div className="container mx-auto max-w-7xl py-8">
                     <div className="grid grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold mb-4">OUR COMPANY</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#" className="hover:text-primary">Delivery</Link></li>
                                <li><Link href="#" className="hover:text-primary">Legal Notice</Link></li>
                                <li><Link href="#" className="hover:text-primary">Terms and Conditions</Link></li>
                                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                                <li><Link href="#" className="hover:text-primary">Secure Payment</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">SERVICES</h4>
                             <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#" className="hover:text-primary">Prices Drop</Link></li>
                                <li><Link href="#" className="hover:text-primary">New Products</Link></li>
                                <li><Link href="#" className="hover:text-primary">Best Sales</Link></li>
                                <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
                                <li><Link href="#" className="hover:text-primary">Sitemap</Link></li>
                            </ul>
                        </div>
                        <div>
                           <h4 className="font-bold mb-4">CONTACT</h4>
                           <div className="text-sm text-muted-foreground space-y-2">
                            <p>419 State 414 Rte Beaver Dams, New York (NY), 14812, USA</p>
                            <p>(607) 936-8058</p>
                            <p>Example@Gmail.Com</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-t mt-8 pt-6 text-sm">
                        <p className="text-muted-foreground">&copy; 2024. All Rights Reserved. Powered By Anon</p>
                        <div className="flex items-center gap-2">
                           <p className="text-muted-foreground">Payment:</p>
                           <img src="https://placehold.co/200x30/png" alt="payment methods" data-ai-hint="payment methods" />
                        </div>
                     </div>
                </div>
            </footer>
        </div>
    </AuthRedirect>
  );
}

  