'use client';

import Item from "@/types/wardrobe-data";
import {Badge} from "@/components/ui/badge";
import {StarIcon} from "lucide-react";

export default function ItemPreview(
    {
        item
    } : {
        item: Item
    }
) {
    return (
        <div className="bg-white rounded-2xl p-2 aspect-square overflow-hidden relative group">
            {
                item.images[0] ? (
                    <>
                        { /* eslint-disable-next-line @next/next/no-img-element */ }
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-scale-down transition-transform duration-300 text-black group-hover:-translate-y-1"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-sm text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-stone-200 to-white">
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