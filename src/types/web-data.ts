import Item from "@/types/wardrobe-data";

export default interface webData {
    userSettings: userSettings;
    userInfo: userInfo;
    wardrobe: Item[];
}

export interface userInfo {
    firstAccess: Date;
    lastAccess: Date;
}

export interface userSettings {
    language: Language;
    gridSize: gridSize;
    gridType: gridType;
    showItemNames: boolean;
    showItemCategories: boolean;
    showItemPrices: boolean;
    showItemCondition: boolean;
}

type Language = {
    code: "en",
    name: "English"
} | {
    code: "it",
    name: "Italian"
};

export type gridSize = "S" | "M" | "L";
export type gridType = "none" | "dashed" | "solid";