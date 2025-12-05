import { create } from "zustand";

import webData, {userInfo, userSettings} from "@/types/web-data";
import Item from "@/types/wardrobe-data";

export type webDataStore = {
    formData: webData;

    updateUserSettings: (settings: Partial<userSettings>) => void;
    updateUserInfo: (info: Partial<userInfo>) => void;

    loadWardrobe: () => void;
    importWardrobe: (wardrobe: webData) => void;
    exportWardrobe: () => webData;

    addNewItemToWardrobe: (item: Item) => void;
    updateItemInWardrobe: (index: number, item: Item) => void;
    deleteItemFromWardrobe: (index: number) => void;
}

const STORAGE_KEY = "digital-wardrobe-data";

const defaultWebData: webData = {
    userSettings: {
        language: { code: "en", name: "English" },
        gridSize: "S",
        gridType: "none",
        showItemNames: false,
        showItemCategories: false,
        showItemPrices: false,
        showItemCondition: false,
    },
    userInfo: {
        firstAccess: new Date(),
        lastAccess: new Date(),
    },
    wardrobe: [],
};

const loadFromLocalStorage = (): webData => {
    if (typeof window === 'undefined') return defaultWebData;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            const parsed = JSON.parse(stored);
            parsed.userInfo.firstAccess = new Date(parsed.userInfo.firstAccess);
            parsed.userInfo.lastAccess = new Date(parsed.userInfo.lastAccess);
            return parsed;
        }
    } catch (error) {
        console.error("Error loading from localStorage:", error);
    }

    return defaultWebData;
};

const saveToLocalStorage = (data: webData) => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export const useWebDataStore = create<webDataStore>()((set, get) => ({
    formData: loadFromLocalStorage(),

    updateUserSettings: (settings) =>
        set((state) => {
            const newData = {
                ...state.formData,
                userSettings: {
                    ...state.formData.userSettings,
                    ...settings,
                },
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    updateUserInfo: (info) =>
        set((state) => {
            const newData = {
                ...state.formData,
                userInfo: {
                    ...state.formData.userInfo,
                    ...info,
                    lastAccess: new Date(),
                },
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    loadWardrobe: () =>
        set(() => {
            const data = loadFromLocalStorage();
            return { formData: data };
        }),

    importWardrobe: (wardrobe) =>
        set(() => {
            const newData = {
                ...wardrobe,
                userInfo: {
                    ...wardrobe.userInfo,
                    lastAccess: new Date(),
                },
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    exportWardrobe: () => {
        return get().formData;
    },

    addNewItemToWardrobe: (item) =>
        set((state) => {
            const newData = {
                ...state.formData,
                wardrobe: [...state.formData.wardrobe, item],
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    updateItemInWardrobe: (index, item) =>
        set((state) => {
            const newWardrobe = [...state.formData.wardrobe];
            if (index >= 0 && index < newWardrobe.length) {
                newWardrobe[index] = item;
            }
            const newData = {
                ...state.formData,
                wardrobe: newWardrobe,
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    deleteItemFromWardrobe: (index) =>
        set((state) => {
            const newWardrobe = state.formData.wardrobe.filter((_, i) => i !== index);
            const newData = {
                ...state.formData,
                wardrobe: newWardrobe,
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),
}));