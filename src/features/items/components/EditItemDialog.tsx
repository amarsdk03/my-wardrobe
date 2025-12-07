import React from "react";

import { useWebDataStore } from "@/stores/web-data-store";
import { gridSize } from "@/types/web-data";

import Item, {
    conditionTypes,
    necessityTypes,
} from "@/types/wardrobe-data";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ItemPreview from "@/features/items/components/ItemPreview";
import ItemFormFields from "@/features/items/components/ItemFormFields";

export default function EditItemDialog(
    {
        item,
        gridSize,
    } : {
        item: Item,
        gridSize: gridSize,
    }
) {
    const { updateItemInWardrobe, deleteItemFromWardrobe } = useWebDataStore();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [itemTitle, setItemTitle] = React.useState(item.name);
    const [itemInfo, setItemInfo] = React.useState(item.info);
    const [itemImageUrl, setItemImageUrl] = React.useState(item.images[0] || "");
    const [itemCategory, setItemCategory] = React.useState<string[]>(item.category);
    const [itemPrice, setItemPrice] = React.useState(item.price?.toString() || "");
    const [itemCondition, setItemCondition] = React.useState(item.condition?.toString() || "");
    const [itemNecessity, setItemNecessity] = React.useState(item.necessity?.toString() || "");
    const [wishlist, setWishlist] = React.useState(item.wishlist);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const updatedItem: Item = {
            id: item.id,
            name: itemTitle,
            images: itemImageUrl ? [itemImageUrl] : [],
            info: itemInfo,
            wishlist: wishlist,
            category: itemCategory,
            price: itemPrice ? parseFloat(itemPrice) : undefined,
            condition: itemCondition.toString() as unknown as conditionTypes || undefined,
            necessity: itemNecessity.toString() as unknown as necessityTypes || undefined,
        };

        updateItemInWardrobe(updatedItem);
        setDialogOpen(false);
    }

    function handleDeleteItem() {
        setDialogOpen(false);
        deleteItemFromWardrobe(item.id);
    }

    return (
        <AlertDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
        >
            <AlertDialogTrigger>
                <ItemPreview item={item} gridSize={gridSize} />
            </AlertDialogTrigger>
            <AlertDialogContent className={"item-dialog"} aria-describedby={"edit-item-dialog"}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Update item
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <ItemFormFields
                    mode={"edit"}
                    handleSubmit={handleSubmit}
                    itemTitle={itemTitle}
                    setItemTitle={setItemTitle}
                    itemImageUrl={itemImageUrl}
                    setItemImageUrl={setItemImageUrl}
                    itemCategory={itemCategory}
                    setItemCategory={setItemCategory}
                    itemPrice={itemPrice}
                    setItemPrice={setItemPrice}
                    itemCondition={itemCondition}
                    setItemCondition={setItemCondition}
                    itemNecessity={itemNecessity}
                    setItemNecessity={setItemNecessity}
                    itemInfo={itemInfo}
                    setItemInfo={setItemInfo}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    setDialogOpen={setDialogOpen}
                    handleDeleteItem={handleDeleteItem}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}