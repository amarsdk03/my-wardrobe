import { z } from 'zod';
import {CONDITIONS, NECESSITY} from "@/types/wardrobe-data";

function hasNoPrototypePollution(obj: unknown): boolean {
    if (!obj || typeof obj !== 'object') return true;
    const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
    return !dangerousKeys.some(key => Object.prototype.hasOwnProperty.call(obj, key));
}

const categorySchema = z.strictObject({
    id: z.uuid(),
    name: z.string().max(50),
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });

const itemSchema = z.strictObject({
    id: z.uuid(),
    name: z.string(),
    images: z.array(z.httpUrl()).max(10),
    info: z.string(),
    wishlist: z.boolean(),
    category: z.array(z.string()).min(0).max(100),
    price: z.number().min(0).max(99999999).optional(),
    condition: z.enum(CONDITIONS).optional(),
    necessity: z.enum(NECESSITY).optional(),
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });

const userSettingsSchema = z.strictObject({
    gridSize: z.enum(["S", "M", "L"]),
    darkMode: z.boolean(),
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });

const wardrobeInfoSchema = z.strictObject({
    createdAt: z.coerce.date(),
    lastUpdatedAt: z.coerce.date(),
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });

const userWardrobeSchema = z.strictObject({
    categories: z.array(categorySchema).max(100),
    wardrobe: z.array(itemSchema).max(5000),
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });

const wardrobeDataSchema = z.strictObject({
    userSettings: userSettingsSchema,
    wardrobeInfo: wardrobeInfoSchema,
    userWardrobe: userWardrobeSchema,
}).refine(hasNoPrototypePollution, { message: "Prototype pollution detected" });



export function getSanitizedWardrobeData(data: object): { userWardrobe: z.infer<typeof userWardrobeSchema> } | null {
    Object.freeze(data);
    const result = wardrobeDataSchema.safeParse(data);
    console.log(result.error);
    return result.success ? result.data : null;
}