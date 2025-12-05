'use client';

import React from "react";
import {ListFilterIcon} from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function Searchbar() {
    const [showFilters, setShowFilters] = React.useState("");

    return (
        <Field className={"max-w-full"}>
            <div className={"flex gap-2"}>
                <Input
                    id="product-search"
                    type="text"
                    placeholder="Search here..."
                />
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Filters"
                    onClick={() => setShowFilters(showFilters === "filters" ? "" : "filters")}
                >
                    <ListFilterIcon />
                </Button>
            </div>
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
        </Field>
    )
}