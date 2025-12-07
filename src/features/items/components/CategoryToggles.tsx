import React, {useSyncExternalStore} from "react";

import {useWebDataStore} from "@/stores/web-data-store";
import {LayoutGridIcon, SlidersHorizontalIcon, StarIcon} from "lucide-react";

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
    const { formData } = useWebDataStore();

    const categoryIds = formData.userWardrobe.categories.map(cat => cat.id);
    const hasCategorySelected = filters.some(filter => categoryIds.includes(filter));
    const toggleFilters = hasCategorySelected ? filters : ['showAll', ...filters];

    function handleValueChange(newToggleFilters: string[]) {
        // If "showAll" was just selected, clear all category filters
        if (newToggleFilters.includes('showAll') && !toggleFilters.includes('showAll')) {
            const wishlistFilter = filters.includes('wishlist') ? ['wishlist'] : [];
            setFilters(wishlistFilter);
            return;
        }

        // Remove "showAll" from actual filters
        const actualFilters = newToggleFilters.filter(f => f !== 'showAll');
        setFilters(actualFilters);
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
            <ToggleGroup
                type="multiple"
                variant="outline"
                spacing={2}
                size="sm"
                disabled
            >
                {
                    Array(20).fill(0).map((_, index) =>
                        <ToggleGroupItem
                            key={index}
                            value={index.toString()}
                            className="toggle-hover-effect w-[20px]"
                        >
                        </ToggleGroupItem>
                    )
                }
            </ToggleGroup>
        );
    }

    return (
        <ScrollArea className={"pb-4"}>
            <ToggleGroup
                type="multiple"
                variant="outline"
                spacing={2}
                size="sm"
                value={toggleFilters}
                onValueChange={handleValueChange}
            >
                <ToggleGroupItem
                    value="showAll"
                    aria-label="Toggle all"
                    className="toggle-hover-effect hover:*:[svg]:stroke-indigo-500  data-[state=on]:*:[svg]:fill-indigo-500 data-[state=on]:*:[svg]:stroke-indigo-500"
                >
                    <LayoutGridIcon className={"mb-0.5"} />
                    Show all
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="wishlist"
                    aria-label="Toggle wishlist"
                    className="toggle-hover-effect hover:*:[svg]:stroke-yellow-500  data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                >
                    <StarIcon className={"mb-0.5"} />
                    Wishlist
                </ToggleGroupItem>
                <div className={"w-[1px] h-7 bg-stone-300 dark:bg-stone-700"} />
                {
                    formData.userWardrobe.categories.map((category) => {
                        return (
                            <ToggleGroupItem
                                key={category.id}
                                value={category.id}
                                aria-label={"Toggle " + category}
                                className="toggle-hover-effect data-[state=off]:*:[svg]:hidden data-[state=on]:*:[svg]:block"
                            >
                                <SlidersHorizontalIcon className={"stroke-stone-500 dark:stroke-stone-300"} />
                                { category.name }
                            </ToggleGroupItem>
                        )
                    })
                }
            </ToggleGroup>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}