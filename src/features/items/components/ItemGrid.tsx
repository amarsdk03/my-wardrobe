'use client';

import { gridSize } from "@/types/web-data";

import { Skeleton } from "@/components/ui/skeleton";
import { useWebDataStore } from "@/stores/web-data-store";
import { useSyncExternalStore } from "react";
import ItemPreview from "@/features/items/components/ItemPreview";

export default function ItemGrid(
    {
        gridSize,
    } : {
        gridSize: gridSize,
    }
) {
    const { formData } = useWebDataStore();

    let gridSizeClass: string;
    let skeletonItems: number;

    if (gridSize === "S") {
        gridSizeClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
        skeletonItems = 18;
    } else if (gridSize === "M") {
        gridSizeClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
        skeletonItems = 15;
    } else {
        gridSizeClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
        skeletonItems = 12;
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
            <div className={"grid " + gridSizeClass + " gap-4"}>
                {
                    Array(skeletonItems).fill(0).map((_, index) =>
                        <Skeleton key={index} className={"bg-stone-200 aspect-square rounded-2xl"} />
                    )
                }
            </div>
        );
    }

    return (
        <div className={"grid " + gridSizeClass + " gap-4"}>
            {
                formData.wardrobe.length > 0
                    ?
                    formData.wardrobe.map((item, index) =>
                        <ItemPreview key={index} item={item} />
                    )
                    :
                    Array(skeletonItems).fill(0).map((_, index) =>
                        <Skeleton key={index} className={"bg-stone-200 aspect-square rounded-2xl"} />
                    )
            }
        </div>
    )
}