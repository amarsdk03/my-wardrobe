export interface userWardrobe {
    categories: Category[];
    wardrobe: Item[];
}

export interface Category {
    id: string;
    name: string;
}

export default interface Item {
    id: string;
    name: string;
    images: string[];
    info: string;
    wishlist: boolean;
    category: string[];
    price?: number;
    condition?: conditionTypes;
    necessity?: necessityTypes;
}

export const defaultCategoryNames = ["Shoes", "T-Shirt", "Sweatshirt", "Hoodies", "Polo", "Pants", "Jeans", "Shorts", "Tracksuits", "Jackets", "Socks", "Accessories"];

export const CONDITIONS = ["New", "Good", "Used", "To replace"] as const;
export type conditionTypes = typeof CONDITIONS[number];

export const NECESSITY = ["5", "4", "3", "2", "1"] as const;
export type necessityTypes = typeof NECESSITY[number];