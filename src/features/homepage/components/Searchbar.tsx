'use client';

import React from "react";
import {ListFilterIcon} from "lucide-react";

import FiltersAccordion from "@/features/homepage/components/Filters";
import SettingsDialog from "@/features/settings/components/SettingsDialog";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Searchbar() {
    const [showFilters, setShowFilters] = React.useState("");

    return (
        <div className={"max-w-full"}>
            <div className={"flex h-9 gap-1"}>
                <Input
                    id="product-search"
                    type="text"
                    placeholder="Search here..."
                />
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