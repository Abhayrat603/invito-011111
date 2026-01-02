
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/components/providers/app-state-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminDealsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { deals, deleteDeal, findImage } = useAppState();

    const handleDelete = (dealId: string, dealName: string) => {
        deleteDeal(dealId);
        toast({
            title: "Deal Deleted",
            description: `"${dealName}" has been removed.`,
        });
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Manage Deals</h1>
                    <Link href="/admin/deals/add">
                        <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4"/>
                        </Button>
                    </Link>
                </header>
                <main className="flex-grow p-4">
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Deal Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deals.map(deal => {
                                    const image = deal.images && deal.images.length > 0 ? findImage(deal.images[0]) : undefined;
                                    return (
                                        <TableRow key={deal.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                        <Image
                                                            src={image?.imageUrl || `https://picsum.photos/seed/${deal.id}/100`}
                                                            alt={deal.name}
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                    <span className="truncate">{deal.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>₹{deal.discountPrice.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/deals/edit/${deal.slug}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Edit className="h-4 w-4"/>
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                                <Trash2 className="h-4 w-4"/>
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will permanently delete "{deal.name}". This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(deal.id, deal.name)}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
