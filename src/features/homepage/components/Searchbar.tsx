'use client';

import React from "react";
import {ListFilterIcon, XIcon} from "lucide-react";

import FiltersAccordion from "@/features/homepage/components/Filters";
import SettingsDialog from "@/features/settings/components/SettingsDialog";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Searchbar(
    {
        searchQuery,
        searchQueryAction,
    } : {
        searchQuery: string,
        searchQueryAction: (value: string) => void,
    }
) {
    const [showFilters, setShowFilters] = React.useState("");

    return (
        <div className={"max-w-full"}>
            <div className={"flex h-9 gap-1"}>
                <InputGroup>
                    <InputGroupInput
                        id="product-search"
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => searchQueryAction(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                        <Button
                            type="reset"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => searchQueryAction("")}
                        >
                            <XIcon />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <Separator orientation="vertical" className={"mx-1"} />
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Filters"
                    onClick={() => setShowFilters(showFilters === "filters" ? "" : "filters")}
                >
                    <ListFilterIcon />
                </Button>
                <SettingsDialog />
            </div>
            <div className={"mt-2"}>
                <FiltersAccordion
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                />
            </div>
        </div>
    )
}