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
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    Filters here
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}