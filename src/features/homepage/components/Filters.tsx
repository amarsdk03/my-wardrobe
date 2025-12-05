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
                    <div className={"rounded-md border-stone-200 opacity-80 text-stone-600 border-2 p-2 text-center"}>
                        Filters coming soon...
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}