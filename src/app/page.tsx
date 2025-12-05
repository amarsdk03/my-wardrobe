'use client';

import React from "react";

import Title from "@/features/homepage/components/Title";
import Searchbar from "@/features/homepage/components/Searchbar";

import AddItemDialog from "@/features/items/components/AddItemDialog";
import ZoomLevel from "@/features/homepage/components/ZoomLevel";
import ItemGrid from "@/features/items/components/ItemGrid";
import {gridSize} from "@/types/web-data";
import CategoryToggles from "@/features/items/components/CategoryToggles";

export default function Home() {
    const [gridSize, setGridSize] = React.useState<gridSize>("S");

    return (
        <div className={"w-full h-full px-4 lg:px-16 pb-16"}>
            <div className={"flex flex-col items-center justify-center"}>
                <div className={"home-title"}>
                    <Title />
                </div>
            </div>
            <div className={"flex flex-row items-start justify-between"}>
                <AddItemDialog />
                <div className={"home-search"}>
                    <Searchbar />
                </div>
                <ZoomLevel
                    gridSize={gridSize}
                    setGridSize={setGridSize}
                />
            </div>
            <CategoryToggles />
            <div className={"mt-8"}>
                <ItemGrid
                    gridSize={gridSize}
                />
            </div>
        </div>
    );
}
