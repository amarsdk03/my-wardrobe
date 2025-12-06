import React from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion"

export default function FiltersAccordion(
    {
        showFilters,
        setShowFilters,
    } : {
        showFilters: string,
        setShowFilters: (value: string) => void,
    }
) {
    return (
        <Accordion
            value={showFilters}
            onValueChange={setShowFilters}
            type="single"
            collapsible
            className="w-full"
            defaultValue="filters"
        >
            <AccordionItem value="filters">
                <AccordionContent>
                    <div className={"rounded-md opacity-80 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 border-2 p-2 text-center"}>
                        Filters coming soon...
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}