'use client';

import Item from "@/types/wardrobe-data";
import {gridSize} from "@/types/web-data";
import {cn} from "@/lib/utils";
import {StarIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function ItemPreview(
    {
        item,
        gridSize,
    } : {
        item: Item,
        gridSize: gridSize,
    }
) {
    let itemNamePadding: string;

    switch (gridSize) {
        case "S":
            itemNamePadding = "text-xs px-2 py-2";
            break;
        case "M":
            itemNamePadding = "text-xs px-3 py-2";
            break;
        case "L":
            itemNamePadding = "text-sm px-4 py-3";
            break;
    }

    return (
        <div className="item-preview bg-white rounded-2xl aspect-square cursor-pointer overflow-hidden relative group p-2">
            {
                item.images[0] ? (
                    <>
                        { /* eslint-disable-next-line @next/next/no-img-element */ }
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            onError={
                                (e) => {
                                    e.currentTarget.src = '/no-preview.png';
                                }
                            }
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-scale-down transition-transform duration-300 text-black group-hover:-translate-y-1"
                        />
                        <div className={cn(itemNamePadding, "absolute bottom-0 left-0 right-0 text-center text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-stone-200 to-white")}>
                            {item.name}
                        </div>
                        {
                            item.wishlist && (
                                <div className="absolute top-0 left-0 ps-2 pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-300 text-black"
                                    >
                                        <StarIcon />
                                        Wishlist
                                    </Badge>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center text-center dark:text-stone-600 w-full h-full">
                            {item.name}
                        </div>
                        {
                            item.wishlist && (
                                <div className="absolute top-0 left-0 ps-2 pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-300 text-black"
                                    >
                                        <StarIcon />
                                        Wishlist
                                    </Badge>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}