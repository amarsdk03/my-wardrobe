import {userWardrobe} from "@/types/wardrobe-data";

export default interface webData {
    userSettings: userSettings;
    wardrobeInfo: wardrobeInfo;
    userWardrobe: userWardrobe;
}

export interface wardrobeInfo {
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface userSettings {
    gridSize: gridSize;
    darkMode: boolean;
}

export type gridSize = "S" | "M" | "L";