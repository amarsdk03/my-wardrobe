import {SlidersHorizontalIcon, StarIcon} from "lucide-react";

import {CATEGORIES} from "@/types/wardrobe-data";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function CategoryToggles(
    {
        filters,
        setFilters,
    } : {
        filters: string[],
        setFilters: (value: string[]) => void,
    }
) {
    return (
        <ScrollArea className={"pb-4"}>
            <ToggleGroup
                type="multiple"
                variant="outline"
                spacing={2}
                size="sm"
                value={filters}
                onValueChange={setFilters}
            >
                <ToggleGroupItem
                    value="wishlist"
                    aria-label="Toggle wishlist"
                    className="data-[state=off]:bg-transparent data-[state=on]:bg-white dark:data-[state=on]:bg-black data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                >
                    <StarIcon />
                    Wishlist
                </ToggleGroupItem>
                <div className={"w-[1px] h-7 bg-stone-300"} />
                {
                    CATEGORIES.map((category, index) => {
                        return (
                            <ToggleGroupItem
                                key={index}
                                value={category}
                                aria-label={"Toggle " + category}
                                className="data-[state=off]:bg-transparent data-[state=on]:bg-white dark:data-[state=on]:bg-black data-[state=off]:*:[svg]:hidden data-[state=on]:*:[svg]:block"
                            >
                                <SlidersHorizontalIcon className={"stroke-stone-500 dark:stroke-stone-300"} />
                                { category }
                            </ToggleGroupItem>
                        )
                    })
                }
            </ToggleGroup>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}