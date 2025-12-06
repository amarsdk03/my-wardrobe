export default interface Item {
    id: string;
    name: string;
    images: string[];
    info: string;
    wishlist: boolean;
    category: categoryTypes[];
    price?: number;
    condition?: conditionTypes;
    size?: sizeTypes;
    necessity?: necessityTypes;
}

export const CATEGORIES = ["Shoes", "T-Shirt", "Sweatshirt", "Hoodie", "Polo", "Pants", "Jeans", "Shorts", "Tracksuit", "Jacket", "Socks", "Accessories", "Others"] as const;
export type categoryTypes = typeof CATEGORIES[number];

export const CONDITIONS = ["New", "Like new", "Good", "Used", "To replace"] as const;
export type conditionTypes = typeof CONDITIONS[number];

export const NECESSITY = [1, 2, 3, 4, 5] as const;
export type necessityTypes = typeof NECESSITY[number];

export type sizeTypes = shoeSizes | clothingSizes;
export type shoeSizes = number;
export type clothingSizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";