import React from "react";
import { PlusIcon } from "lucide-react";

import Item, { CATEGORIES, categoryTypes } from "@/types/wardrobe-data";
import { useWebDataStore } from "@/stores/web-data-store";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
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

export default function AddItemDialog() {
    const { addNewItemToWardrobe } = useWebDataStore();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [itemTitle, setItemTitle] = React.useState("");
    const [itemInfo, setItemInfo] = React.useState("");
    const [itemImageUrl, setItemImageUrl] = React.useState("");
    const [itemCategory, setItemCategory] = React.useState<categoryTypes>("Others");
    const [wishlist, setWishlist] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem: Item = {
            name: itemTitle,
            images: itemImageUrl ? [itemImageUrl] : [],
            info: itemInfo,
            wishlist: wishlist,
            category: [itemCategory],
        };

        addNewItemToWardrobe(newItem);

        // Reset form
        setItemTitle("");
        setItemInfo("");
        setItemImageUrl("");
        setItemCategory("Others");
        setWishlist(false);
        setDialogOpen(false);
    };

    return (
        <AlertDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
        >
            <AlertDialogTrigger asChild>
                <Button size="icon">
                    <PlusIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"add-item-dialog"}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add new item
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className={"grid grid-cols-2 gap-8"}>
                        <div className={"aspect-square rounded-2xl max-h-[400px]"}>
                            {itemImageUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={itemImageUrl}
                                    alt="Item preview"
                                    className="w-full h-full object-scale-down"
                                />
                            ) : (
                                <div className={"flex items-center justify-center w-full h-full text-stone-500"}>
                                    Item preview here
                                </div>
                            )}
                        </div>
                        <ScrollArea className="max-h-[400px] overflow-hidden pe-6">
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
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
                                        <Field>
                                            <FieldLabel htmlFor="category">
                                                Category
                                            </FieldLabel>
                                            <Select
                                                value={itemCategory}
                                                onValueChange={(value) => setItemCategory(value as categoryTypes)}
                                            >
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        CATEGORIES.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                        <Field>
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
                                        <Field>
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
                                            <FieldDescription>
                                                Ensure you use images with permission from the source owner.
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                    <FieldGroup>
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
                                <FieldSeparator />
                            </FieldGroup>
                        </ScrollArea>
                    </div>
                    <Field orientation="horizontal" className={"justify-end mt-4"}>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Field>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}