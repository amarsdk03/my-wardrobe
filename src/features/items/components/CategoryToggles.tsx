import {useSyncExternalStore} from "react";

import {useWebDataStore} from "@/stores/web-data-store";
import {LayoutGridIcon, SlidersHorizontalIcon, StarIcon, StarOffIcon} from "lucide-react";
import {cn} from "@/lib/utils";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";

const WISHLIST_ONLY_FILTER = "wishlistOnly";
const NON_WISHLIST_ONLY_FILTER = "nonWishlistOnly";

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

    const wishlistFilters = filters.filter(
        (filter) => filter === WISHLIST_ONLY_FILTER || filter === NON_WISHLIST_ONLY_FILTER
    );
    const categoryFilters = filters.filter(
        (filter) => filter !== WISHLIST_ONLY_FILTER && filter !== NON_WISHLIST_ONLY_FILTER
    );

    const categoryIds = formData.userWardrobe.categories.map(cat => cat.id);
    const hasCategorySelected = categoryFilters.some(filter => categoryIds.includes(filter));
    const toggleFilters = hasCategorySelected ? categoryFilters : ['showAll', ...categoryFilters];

    const wishlistState: "all" | "wishlist" | "nonWishlist" =
        wishlistFilters.includes(WISHLIST_ONLY_FILTER)
            ? "wishlist"
            : wishlistFilters.includes(NON_WISHLIST_ONLY_FILTER)
                ? "nonWishlist"
                : "all";

    function handleWishlistToggle() {
        if (wishlistState === "all") {
            setFilters([...categoryFilters, WISHLIST_ONLY_FILTER]);
            return;
        }

        if (wishlistState === "wishlist") {
            setFilters([...categoryFilters, NON_WISHLIST_ONLY_FILTER]);
            return;
        }

        setFilters(categoryFilters);
    }

    function handleValueChange(newToggleFilters: string[]) {
        // If "showAll" was just selected, clear all category filters
        if (newToggleFilters.includes('showAll') && !toggleFilters.includes('showAll')) {
            setFilters(wishlistFilters);
            return;
        }

        // Remove "showAll" from actual filters
        const actualCategoryFilters = newToggleFilters.filter(f => f !== 'showAll');
        setFilters([...actualCategoryFilters, ...wishlistFilters]);
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
                            className="toggle-hover-effect w-5"
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
                    className="toggle-hover-effect hover:*:[svg]:stroke-indigo-500 data-[state=on]:*:[svg]:fill-indigo-500 data-[state=on]:*:[svg]:stroke-indigo-500"
                >
                    <LayoutGridIcon className={"mb-0.5"} />
                    Show all
                </ToggleGroupItem>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={cn(
                        "toggle-hover-effect",
                        wishlistState === "wishlist" && "hover:*:[svg]:stroke-yellow-500 *:[svg]:fill-yellow-500 *:[svg]:stroke-yellow-500 text-yellow-600 dark:text-yellow-400",
                        wishlistState === "nonWishlist" && "hover:*:[svg]:stroke-orange-500 *:[svg]:stroke-orange-500 text-orange-600 dark:text-orange-400",
                        wishlistState === "all" && "text-stone-600 dark:text-stone-300"
                    )}
                    aria-label="Cycle wishlist filter"
                >
                    {
                        wishlistState === "all" ? (
                                <StarIcon className={"mb-0.5"} />
                            ) : wishlistState === "wishlist" ? (
                                <StarIcon className={"mb-0.5"} />
                            ) : (
                                <StarOffIcon className={"mb-0.5"} />
                            )
                    }
                    Wishlist
                </Button>
                <div className={"w-px h-7 bg-stone-300 dark:bg-stone-700"} />
                {
                    formData.userWardrobe.categories.map((category) => {
                        return (
                            <ToggleGroupItem
                                key={category.id}
                                value={category.id}
                                aria-label={"Toggle " + category.name}
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