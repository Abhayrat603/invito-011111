
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/alert-dialog";
import { getIconByName } from "@/lib/icon-map";
import { useMemo } from "react";

export default function AdminMenuPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { menuItems, deleteMenuItem } = useAppState();

    const handleDelete = (menuItemId: string, menuItemName: string) => {
        deleteMenuItem(menuItemId);
        toast({
            title: "Menu Item Deleted",
            description: `"${menuItemName}" has been removed.`,
        });
    };
    
    const sortedMenuItems = useMemo(() => {
        return [...menuItems].sort((a, b) => a.order - b.order);
    }, [menuItems]);

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Manage Menu</h1>
                    <Link href="/admin/menu/add">
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
                                    <TableHead></TableHead>
                                    <TableHead>Menu Item</TableHead>
                                    <TableHead>Link</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedMenuItems.map(item => {
                                    const Icon = getIconByName(item.icon);
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                    <span className="truncate">{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground truncate">{item.href}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/menu/edit/${item.id}`}>
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
                                                                    This will permanently delete "{item.name}". This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(item.id, item.name)}>Delete</AlertDialogAction>
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
