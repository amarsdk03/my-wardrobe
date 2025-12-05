import {SlidersHorizontalIcon, StarIcon} from "lucide-react";

import {CATEGORIES} from "@/types/wardrobe-data";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {Separator} from "@/components/ui/separator";

export default function CategoryToggles() {
    return (
        <ToggleGroup type="single" variant="outline" spacing={2} size="sm" className={"h-6"}>
            <ToggleGroupItem
                value="heart"
                aria-label="Toggle heart"
                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
            >
                <StarIcon />
                Wishlist
            </ToggleGroupItem>
            <Separator orientation="vertical" className="mx-1" />
            {
                CATEGORIES.map((category, index) => {
                    return (
                        <ToggleGroupItem
                            key={index}
                            value={category}
                            aria-label={"Toggle " + category + " bookmark"}
                            className="data-[state=on]:bg-transparent data-[state=off]:*:[svg]:hidden data-[state=on]:*:[svg]:block"
                        >
                            <SlidersHorizontalIcon className={"fill-stone-100 stroke-stone-500"} />
                            { category }
                        </ToggleGroupItem>
                    )
                })
            }
        </ToggleGroup>
    )
}