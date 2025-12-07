import { create } from "zustand";

import webData, {wardrobeInfo, userSettings} from "@/types/web-data";
import Item, {Category, defaultCategoryNames, userWardrobe} from "@/types/wardrobe-data";

export type webDataStore = {
    formData: webData;

    updateUserSettings: (settings: Partial<userSettings>) => void;
    updateWardrobeInfo: (info: Partial<wardrobeInfo>) => void;

    loadWardrobe: () => void;
    importWardrobe: (wardrobe: userWardrobe) => void;
    exportWardrobe: () => webData;

    addNewCategory: (category: Category) => void;
    renameCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;

    addNewItemToWardrobe: (item: Item) => void;
    updateItemInWardrobe: (item: Item) => void;
    deleteItemFromWardrobe: (id: string) => void;
}

const STORAGE_KEY = "digital-wardrobe-data";

const defaultWebData: webData = {
    userSettings: {
        gridSize: "S",
        darkMode: false,
    },
    wardrobeInfo: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
    },
    userWardrobe: {
        categories: [
            ...defaultCategoryNames.map(name => ({
                id: crypto.randomUUID(),
                name: name,
            })),
            {
                id: crypto.randomUUID(),
                name: "Others",
            }
        ],
        wardrobe: [],
    },
};

const loadFromLocalStorage = (): webData => {
    if (typeof window === 'undefined') return defaultWebData;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            const parsed = JSON.parse(stored);
            parsed.wardrobeInfo.createdAt = new Date(parsed.wardrobeInfo.createdAt);
            parsed.wardrobeInfo.lastUpdatedAt = new Date(parsed.wardrobeInfo.lastUpdatedAt);
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

    updateWardrobeInfo: (info) =>
        set((state) => {
            const newData = {
                ...state.formData,
                wardrobeInfo: {
                    ...state.formData.wardrobeInfo,
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
        set((state) => {
            const newData: webData = {
                userWardrobe: wardrobe,
                userSettings: state.formData.userSettings,
                wardrobeInfo: {
                    createdAt: state.formData.wardrobeInfo.createdAt,
                    lastUpdatedAt: new Date(),
                },
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    exportWardrobe: () => {
        return get().formData;
    },

    addNewCategory: (category) =>
        set((state) => {
            // Check if category name already exists
            const categoryExists = state.formData.userWardrobe.categories.some(
                cat => cat.name.toLowerCase() === category.name.toLowerCase()
            );

            if (categoryExists) {
                console.warn(`Category "${category.name}" already exists`);
                return state; // Return unchanged state
            }

            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    categories: [
                        ...state.formData.userWardrobe.categories,
                        category
                    ]
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    renameCategory: (category) =>
        set((state) => {
            // Check if the new name already exists in another category
            const nameExistsInOther = state.formData.userWardrobe.categories.some(
                cat => cat.id !== category.id && cat.name.toLowerCase() === category.name.toLowerCase()
            );

            if (nameExistsInOther) {
                console.warn(`Category name "${category.name}" already exists`);
                return state; // Return unchanged state
            }

            const newCategories = state.formData.userWardrobe.categories.map(cat =>
                cat.id === category.id ? category : cat
            );
            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    categories: newCategories
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    deleteCategory: (id) =>
        set((state) => {
            const newCategories = state.formData.userWardrobe.categories.filter(cat => cat.id !== id);
            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    categories: newCategories
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    addNewItemToWardrobe: (item) =>
        set((state) => {
            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    wardrobe: [...state.formData.userWardrobe.wardrobe, item]
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    updateItemInWardrobe: (item) =>
        set((state) => {
            const newWardrobe = state.formData.userWardrobe.wardrobe.map((wardrobeItem) =>
                wardrobeItem.id === item.id ? { ...item } : wardrobeItem
            );
            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    wardrobe: newWardrobe,
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),

    deleteItemFromWardrobe: (id) =>
        set((state) => {
            const newWardrobe = state.formData.userWardrobe.wardrobe.filter((item) => item.id !== id);
            const newData = {
                ...state.formData,
                userWardrobe: {
                    ...state.formData.userWardrobe,
                    wardrobe: newWardrobe,
                }
            };
            saveToLocalStorage(newData);
            return { formData: newData };
        }),
}));