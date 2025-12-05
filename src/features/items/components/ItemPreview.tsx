'use client';

import Item from "@/types/wardrobe-data";

export default function ItemPreview(
    {
        item
    } : {
        item: Item
    }
) {
    return (
        <div className="bg-white rounded-2xl p-2 aspect-square overflow-hidden relative group cursor-pointer">
            {
                item.images[0] ? (
                    <>
                        { /* eslint-disable-next-line @next/next/no-img-element */ }
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-scale-down transition-transform duration-300 group-hover:-translate-y-2"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-sm text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white to-transparent">
                            {item.name}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center text-center w-full h-full">
                        {item.name}
                    </div>
                )
            }
        </div>
    );
}