'use client';

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { useWebDataStore } from "@/stores/web-data-store";
import { gridSize } from "@/types/web-data";

import { Skeleton } from "@/components/ui/skeleton";

import EditItemDialog from "@/features/items/components/EditItemDialog";

export default function ItemGrid(
    {
        gridSize,
        filters,
        searchQuery
    }: {
        gridSize: gridSize,
        filters: string[],
        searchQuery: string
    }
) {
    const { formData } = useWebDataStore();

    let gridSizeClass: string;
    let gridGapClass: string;
    let skeletonItems: number;

    if (gridSize === "S") {
        gridSizeClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8";
        gridGapClass = "gap-2";
        skeletonItems = 24;
    } else if (gridSize === "M") {
        gridSizeClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6";
        gridGapClass = "gap-3";
        skeletonItems = 12;
    } else {
        gridSizeClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
        gridGapClass = "gap-4";
        skeletonItems = 8;
    }

    // Properly handle SSR hydration
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    // Show skeleton during SSR
    if (!isClient) {
        return (
            <div className={cn("grid", gridSizeClass, gridGapClass)}>
                {
                    Array(skeletonItems).fill(0).map((_, index) =>
                        <Skeleton key={index} className={"bg-stone-200 aspect-square rounded-2xl"} />
                    )
                }
            </div>
        );
    }

    const filteredWardrobe = formData.wardrobe.filter(item => {
        // Search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                item.name.toLowerCase().includes(searchLower) ||
                item.info.toLowerCase().includes(searchLower) ||
                item.category.some(c => c.toLowerCase().includes(searchLower));

            if (!matchesSearch) return false;
        }

        // Category/wishlist filters
        if (filters.length === 0) return true;

        const wishlistActive = filters.includes("wishlist");
        if (wishlistActive && !item.wishlist) return false;

        const categoryFilters = filters.filter(f => f !== "wishlist");

        if (categoryFilters.length > 0) {
            const hasMatchingCategory = item.category.some(cat =>
                categoryFilters.includes(cat)
            );
            if (!hasMatchingCategory) return false;
        }

        return true;
    });

    if (formData.wardrobe.length === 0) {
        return (
            <div className="mt-18">
                <p className="text-2xl text-stone-500 dark:text-stone-400 text-center font-medium">
                    No items added to your wardrobe yet.
                </p>
                <p className="text-xl text-stone-500 dark:text-stone-400 text-center">
                    Click the <span className={"text-yellow-500 font-semibold"}>yellow +</span> button to add your first item!
                </p>
            </div>
        )
    } else if (filteredWardrobe.length === 0) {
        return (
            <div className="mt-18">
                <p className="text-2xl text-stone-500 dark:text-stone-400 text-center font-medium">
                    No result matching your search.
                </p>
                <p className="text-xl text-stone-500 dark:text-stone-400 text-center">
                    Try changing the filters or search query.
                </p>
            </div>
        )
    } else {
        return (
            <div className={cn("grid", gridSizeClass, gridGapClass)}>
                {
                    filteredWardrobe.map((item) =>
                        <EditItemDialog key={item.id} item={item} />
                    )
                }
            </div>
        )
    }
}