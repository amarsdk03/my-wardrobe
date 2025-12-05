export default interface Item {
    name: string;
    images: string[];
    info: string;
    wishlist: boolean;
    category: categoryTypes[];
    price?: number;
    condition?: conditionTypes;
    size?: sizeTypes;
    necessity?: number;
}

export const CATEGORIES = ["Shoes", "T-Shirt", "Sweatshirt", "Hoodie", "Polo", "Pants", "Jeans", "Shorts", "Tracksuit", "Jacket", "Socks", "Accessories", "Others"] as const;
export type categoryTypes = typeof CATEGORIES[number];

export type conditionTypes = "New" | "Still good" | "Used" | "To replace";

export type sizeTypes = shoeSizes | clothingSizes;
export type shoeSizes = number;
export type clothingSizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";