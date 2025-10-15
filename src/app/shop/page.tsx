"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, Suspense } from 'react';
import ProductCard from '@/components/product-card';
import { products, categories } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategories, setSelectedCategories] = useState<string[]>([initialCategory]);
  const [sortOption, setSortOption] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
      filtered = products.filter(p => selectedCategories.includes(p.category.toLowerCase()));
    }

    switch (sortOption) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default: // featured
        return filtered;
    }
  }, [selectedCategories, sortOption]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
        if (category === 'all') {
            return prev.includes('all') ? [] : ['all'];
        }
        const newSelection = prev.filter(c => c !== 'all');
        if (newSelection.includes(category)) {
            const finalSelection = newSelection.filter(c => c !== category);
            return finalSelection.length === 0 ? ['all'] : finalSelection;
        } else {
            return [...newSelection, category];
        }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Our Collection</h1>
        <p className="mt-2 text-muted-foreground">Browse through our curated selection of high-quality products.</p>
      </div>

      <div className="flex justify-between items-center mb-8 gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/> Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={selectedCategories.includes('all')} onCheckedChange={() => handleCategoryChange('all')}>All</DropdownMenuCheckboxItem>
                {categories.map(cat => (
                    <DropdownMenuCheckboxItem key={cat.id} checked={selectedCategories.includes(cat.name.toLowerCase())} onCheckedChange={() => handleCategoryChange(cat.name.toLowerCase())}>
                        {cat.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
         </div>
      )}
    </div>
  );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopPageContent />
        </Suspense>
    )
}
