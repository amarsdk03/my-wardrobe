'use client';

import React from "react";

import Title from "@/features/homepage/components/Title";
import Searchbar from "@/features/homepage/components/Searchbar";

import AddItemDialog from "@/features/items/components/AddItemDialog";
import ZoomLevel from "@/features/homepage/components/ZoomLevel";
import ItemGrid from "@/features/items/components/ItemGrid";
import {gridSize} from "@/types/web-data";
import CategoryToggles from "@/features/items/components/CategoryToggles";
import {useWebDataStore} from "@/stores/web-data-store";
import Link from "next/link";

export default function Home() {
    const { formData } = useWebDataStore();

    React.useEffect(() => {
        if (formData.userSettings.darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [formData.userSettings.darkMode]);

    const [gridSize, setGridSize] = React.useState<gridSize>("S");
    const [filters, setFilters] = React.useState<string[]>([]);
    const [searchQuery, updateSearchQuery] = React.useState<string>("");

    return (
        <>
            <div className={"w-full min-h-[90vh] px-4 lg:px-16 pb-32"}>
                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"home-title"}>
                        <Title />
                    </div>
                </div>
                <div className={"flex flex-row items-start justify-between"}>
                    <AddItemDialog />
                    <div className={"home-search"}>
                        <Searchbar
                            searchQuery={searchQuery}
                            searchQueryAction={updateSearchQuery}
                        />
                    </div>
                    <ZoomLevel
                        gridSize={gridSize}
                        setGridSize={setGridSize}
                    />
                </div>
                <div className={"max-w-full"}>
                    <CategoryToggles
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
                <div className={"mt-2 xl:mt-0"}>
                    <ItemGrid
                        gridSize={gridSize}
                        filters={filters}
                        searchQuery={searchQuery}
                    />
                </div>
            </div>
            <div className={"w-full h-full text-sm text-center opacity-50 px-4 pb-12"}>
                <Link href={"https://github.com/amarsdk03/my-wardrobe"} target={"_blank"}>
                    by Amar Sidkir
                </Link>
            </div>
        </>
    );
}
