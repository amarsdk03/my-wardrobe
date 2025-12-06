import React from "react";

import { useWebDataStore } from "@/stores/web-data-store";
import {CheckIcon, Trash2Icon} from "lucide-react";

import Item, {
    CATEGORIES,
    categoryTypes,
    CONDITIONS,
    conditionTypes,
    NECESSITY,
    necessityTypes,
    sizeTypes
} from "@/types/wardrobe-data";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel, FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import ItemPreview from "@/features/items/components/ItemPreview";

export default function EditItemDialog(
    {
        item,
    } : {
        item: Item,
    }
) {
    const { updateItemInWardrobe, deleteItemFromWardrobe } = useWebDataStore();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [itemTitle, setItemTitle] = React.useState(item.name);
    const [itemInfo, setItemInfo] = React.useState(item.info);
    const [itemImageUrl, setItemImageUrl] = React.useState(item.images[0] || "");
    const [itemCategory, setItemCategory] = React.useState<categoryTypes[]>(item.category);
    const [itemPrice, setItemPrice] = React.useState(item.price?.toString() || "");
    const [itemCondition, setItemCondition] = React.useState<conditionTypes | "">(item.condition || "");
    const [itemSize, setItemSize] = React.useState<sizeTypes | "">(item.size || "");
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
            condition: itemCondition || undefined,
            size: itemSize || undefined,
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
                <ItemPreview item={item} />
            </AlertDialogTrigger>
            <AlertDialogContent className={"item-dialog"} aria-describedby={"edit-item-dialog"}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Update item
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4"}>
                        <div className={"aspect-square hidden sm:block max-h-[400px]"}>
                            {itemImageUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={itemImageUrl}
                                    alt="Item preview"
                                    className="w-full h-full rounded-lg object-scale-down"
                                />
                            ) : (
                                <div className={"bg-stone-100 rounded-2xl flex items-center justify-center w-full h-full text-stone-500"}>
                                    Item preview here
                                </div>
                            )}
                        </div>
                        <ScrollArea className="max-h-[400px] overflow-hidden">
                            <FieldGroup className={"ps-2 pe-6"}>
                                <FieldSet className={"gap-4"}>
                                    <FieldLegend>
                                        Required info
                                    </FieldLegend>
                                    <FieldDescription>
                                        The following fields are required to update the item to your wardrobe.
                                    </FieldDescription>
                                    <FieldGroup className={"gap-5"}>
                                        <Field className={"gap-2"}>
                                            <FieldLabel htmlFor="name">
                                                Item title
                                            </FieldLabel>
                                            <Input
                                                id="name"
                                                placeholder="Nike Air Force 1 - White"
                                                value={itemTitle}
                                                onChange={(e) => setItemTitle(e.target.value)}
                                                required
                                            />
                                        </Field>
                                        <Field className={"gap-2"}>
                                            <FieldLabel htmlFor="main-image">
                                                Image preview URL
                                            </FieldLabel>
                                            <Input
                                                type="url"
                                                id="main-image"
                                                placeholder={"https://product-website/images/air-force-1.png"}
                                                value={itemImageUrl}
                                                onChange={(e) => setItemImageUrl(e.target.value)}
                                            />
                                            <FieldDescription className={"text-xs mt-0 pt-0"}>
                                                Ensure you use images with permission from the source owner.
                                            </FieldDescription>
                                        </Field>
                                        <Field className={"gap-2"}>
                                            <FieldLabel htmlFor="category">
                                                Select categories
                                            </FieldLabel>
                                            <ToggleGroup
                                                type="multiple"
                                                variant="outline"
                                                spacing={1}
                                                size="sm"
                                                className={"flex flex-wrap gap-2"}
                                                value={itemCategory}
                                                onValueChange={(value: string[]) => setItemCategory(value as categoryTypes[])}
                                            >
                                                {
                                                    CATEGORIES.map((category, index) => {
                                                        return (
                                                            <ToggleGroupItem
                                                                key={index}
                                                                value={category}
                                                                aria-label={"Toggle " + category + " bookmark"}
                                                                className="data-[state=off]:bg-stone-200 dark:data-[state=off]:bg-stone-900 data-[state=on]:bg-lime-100 dark:data-[state=on]:bg-lime-500 dark:data-[state=on]:text-lime-950 data-[state=off]:*:[svg]:hidden data-[state=on]:*:[svg]:block"
                                                            >
                                                                <CheckIcon className={"stroke-lime-500 dark:stroke-lime-800"} />
                                                                { category }
                                                            </ToggleGroupItem>
                                                        )
                                                    })
                                                }
                                            </ToggleGroup>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <FieldSeparator />
                                <FieldSet className={"gap-4"}>
                                    <FieldLegend>
                                        Additional info
                                    </FieldLegend>
                                    <FieldDescription>
                                        The following fields are optional, but useful to keep your wardrobe more organized.
                                    </FieldDescription>
                                    <FieldGroup className={"gap-5"}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field className={"gap-2"}>
                                                <FieldLabel htmlFor="price">
                                                    Item price
                                                </FieldLabel>
                                                <Input
                                                    id="price"
                                                    placeholder="109,99€"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={itemPrice}
                                                    onChange={(e) => setItemPrice(e.target.value)}
                                                />
                                            </Field>
                                            <Field className={"gap-2"}>
                                                <FieldLabel htmlFor="conditions">
                                                    Item condition
                                                </FieldLabel>
                                                <Select
                                                    value={itemCondition}
                                                    onValueChange={(value) => setItemCondition(value as conditionTypes | "")}
                                                >
                                                    <SelectTrigger id="conditions">
                                                        <SelectValue placeholder="Select a condition" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            CONDITIONS.map((condition) => (
                                                                <SelectItem key={condition} value={condition}>
                                                                    {condition}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        </div>
                                        <Field className={"gap-2"}>
                                            <FieldLabel htmlFor="necessity">
                                                Necessity
                                            </FieldLabel>
                                            <Select
                                                value={itemNecessity}
                                                onValueChange={setItemNecessity}
                                            >
                                                <SelectTrigger id="necessity">
                                                    <SelectValue placeholder="Select a necessity level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        NECESSITY.map((necessity) => (
                                                            <SelectItem key={necessity} value={necessity.toString()}>
                                                                {
                                                                    "⭐".repeat(necessity)
                                                                }
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                        <Field className={"gap-2"}>
                                            <FieldLabel htmlFor="info">
                                                Additional info
                                            </FieldLabel>
                                            <Textarea
                                                id="info"
                                                placeholder="Notes, tags, considerations..."
                                                value={itemInfo}
                                                onChange={(e) => setItemInfo(e.target.value)}
                                            />
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup className={"mt-2 mb-8"}>
                                        <Field orientation="horizontal">
                                            <Switch
                                                id="wishlist"
                                                checked={wishlist}
                                                onCheckedChange={setWishlist}
                                            />
                                            <FieldLabel
                                                htmlFor="wishlist"
                                                className="font-normal"
                                            >
                                                Add to Wishlist
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </ScrollArea>
                    </div>
                    <Field orientation="horizontal" className={"flex flex-col sm:flex-row justify-between"}>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    type="button"
                                    className="w-full sm:w-auto"
                                >
                                    <Trash2Icon />
                                    Delete item
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you absolutely sure?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone!
                                    </DialogDescription>
                                </DialogHeader>
                                <Button
                                    variant="destructive"
                                    type="button"
                                    onClick={handleDeleteItem}
                                >
                                    <Trash2Icon />
                                    Confirm deletion
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <div className={"w-full flex flex-col sm:flex-row justify-end gap-3 sm:gap-2"}>
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full sm:w-auto"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
                            >
                                Save changes
                            </Button>
                        </div>
                    </Field>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}