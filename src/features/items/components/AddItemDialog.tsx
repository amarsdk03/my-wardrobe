import React from "react";
import {PlusIcon} from "lucide-react";

import Item, {
    conditionTypes,
    necessityTypes
} from "@/types/wardrobe-data";
import { useWebDataStore } from "@/stores/web-data-store";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ItemFormFields from "@/features/items/components/ItemFormFields";

export default function AddItemDialog() {
    const { addNewItemToWardrobe } = useWebDataStore();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [itemTitle, setItemTitle] = React.useState("");
    const [itemImageUrl, setItemImageUrl] = React.useState("");
    const [itemCategory, setItemCategory] = React.useState<string[]>(["Others"]);
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemCondition, setItemCondition] = React.useState("New");
    const [itemNecessity, setItemNecessity] = React.useState("5");
    const [itemInfo, setItemInfo] = React.useState("");
    const [wishlist, setWishlist] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem: Item = {
            id: crypto.randomUUID(),
            name: itemTitle,
            images: itemImageUrl ? [itemImageUrl] : [],
            info: itemInfo,
            wishlist: wishlist,
            category: itemCategory,
            price: itemPrice ? parseFloat(itemPrice) : undefined,
            condition: itemCondition as conditionTypes || undefined,
            necessity: itemNecessity.toString() as unknown as necessityTypes || undefined,
        };

        addNewItemToWardrobe(newItem);
        setDialogOpen(false);
    };

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
        >
            <DialogTrigger asChild>
                <Button size="icon">
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className={"item-dialog"} aria-describedby={"add-item-dialog"}>
                <DialogHeader>
                    <DialogTitle>
                        Add new item
                    </DialogTitle>
                </DialogHeader>
                <ItemFormFields
                    mode={"add"}
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
                />
            </DialogContent>
        </Dialog>
    )
}