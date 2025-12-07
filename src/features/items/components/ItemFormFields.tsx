import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";

import {useWebDataStore} from "@/stores/web-data-store";
import {CONDITIONS, NECESSITY} from "@/types/wardrobe-data";
import {CheckIcon, RotateCcwIcon, ShirtIcon, SquarePenIcon, Trash2Icon} from "lucide-react";

import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/components/ui/field";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function ItemFormFields(
    {
        mode,
        handleSubmit,
        itemTitle,
        setItemTitle,
        itemImageUrl,
        setItemImageUrl,
        itemCategory,
        setItemCategory,
        itemPrice,
        setItemPrice,
        itemCondition,
        setItemCondition,
        itemNecessity,
        setItemNecessity,
        itemInfo,
        setItemInfo,
        wishlist,
        setWishlist,
        setDialogOpen,
        handleDeleteItem,
    } : {
        mode: "add" | "edit",
        handleSubmit: (e: FormEvent) => void,
        itemTitle: string,
        setItemTitle: Dispatch<SetStateAction<string>>,
        itemImageUrl: string,
        setItemImageUrl: Dispatch<SetStateAction<string>>,
        itemCategory: string[],
        setItemCategory: Dispatch<SetStateAction<string[]>>,
        itemPrice: string,
        setItemPrice: Dispatch<SetStateAction<string>>,
        itemCondition: string,
        setItemCondition: Dispatch<SetStateAction<string>>,
        itemNecessity: string,
        setItemNecessity: Dispatch<SetStateAction<string>>,
        itemInfo: string,
        setItemInfo: Dispatch<SetStateAction<string>>,
        wishlist: boolean,
        setWishlist: Dispatch<SetStateAction<boolean>>,
        setDialogOpen: Dispatch<SetStateAction<boolean>>,
        handleDeleteItem?: () => void,
    }
) {
    const { formData } = useWebDataStore();
    
    const [brokenImageUrl, setBrokenImageUrl] = useState(false);

    function resetFields() {
        setItemTitle("");
        setItemImageUrl("");
        setItemCategory([]);
        setItemPrice("");
        setItemCondition("");
        setItemNecessity("");
        setItemInfo("");
        setWishlist(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4"}>
                <div className={"aspect-square hidden sm:block max-h-[400px]"}>
                    {
                        itemImageUrl && !brokenImageUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={itemImageUrl}
                                alt="Item preview"
                                onError={() => setBrokenImageUrl(true)}
                                referrerPolicy="no-referrer"
                                className="w-full h-full rounded-lg object-scale-down"
                            />
                        ) : (
                            <div className={"bg-stone-100 rounded-2xl flex items-center justify-center w-full h-full text-stone-500"}>
                                Item preview here
                            </div>
                        )
                    }
                </div>
                <ScrollArea className="max-h-[400px] overflow-hidden">
                    <FieldGroup className={"ps-2 pe-6"}>
                        <FieldSet className={"gap-4"}>
                            <FieldLegend>
                                Required info
                            </FieldLegend>
                            <FieldDescription>
                                {
                                    mode === "add"
                                        ? "The following fields are required to add a new item to your wardrobe."
                                        : "The following fields are required to update the item to your wardrobe."
                                }
                            </FieldDescription>
                            <FieldGroup className={"gap-6"}>
                                <Field className={"gap-2"}>
                                    <FieldLabel htmlFor="name">
                                        Item title:
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
                                        Image preview URL:
                                    </FieldLabel>
                                    <Input
                                        type="url"
                                        id="main-image"
                                        placeholder={"https://product-website/images/air-force-1.png"}
                                        value={itemImageUrl}
                                        onChange={
                                            (e) => {
                                                setItemImageUrl(e.target.value);
                                                setBrokenImageUrl(false);
                                            }
                                        }
                                    />
                                    <FieldDescription className={"text-xs mt-0 pt-0"}>
                                        Ensure you use images with permission from the source owner.
                                    </FieldDescription>
                                </Field>
                                <Field className={"gap-3"}>
                                    <FieldLabel htmlFor="category">
                                        Select item categories:
                                    </FieldLabel>
                                    <ToggleGroup
                                        type="multiple"
                                        variant="outline"
                                        spacing={1}
                                        size="sm"
                                        className={"flex flex-wrap gap-2"}
                                        value={itemCategory}
                                        onValueChange={(value: string[]) => setItemCategory(value)}
                                    >
                                        {
                                            formData.userWardrobe.categories.map((category) => {
                                                return (
                                                    <ToggleGroupItem
                                                        key={category.id}
                                                        value={category.id}
                                                        aria-label={"Toggle " + category + " bookmark"}
                                                        className="data-[state=off]:bg-stone-200 dark:data-[state=off]:bg-stone-900 data-[state=on]:bg-lime-100 dark:data-[state=on]:bg-lime-500 dark:data-[state=on]:text-lime-950 data-[state=off]:*:[svg]:hidden data-[state=on]:*:[svg]:block"
                                                    >
                                                        <CheckIcon className={"stroke-lime-500 dark:stroke-lime-800"} />
                                                        { category.name }
                                                    </ToggleGroupItem>
                                                )
                                            })
                                        }
                                    </ToggleGroup>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <FieldSeparator />
                        <FieldSet className={"gap-4 mb-8"}>
                            <FieldLegend>
                                Additional info
                            </FieldLegend>
                            <FieldDescription>
                                The following fields are optional, but useful to keep your wardrobe more organized.
                            </FieldDescription>
                            <FieldGroup className={"my-2"}>
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
                                            onValueChange={setItemCondition}
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
                                                            "⭐".repeat(Number.parseInt(necessity))
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
                                        placeholder="Size, tags, considerations..."
                                        value={itemInfo}
                                        onChange={(e) => setItemInfo(e.target.value)}
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </ScrollArea>
            </div>
            {
                mode === "add" ? (
                    <Field orientation="horizontal" className={"flex flex-col sm:flex-row justify-between mt-4 gap-2"}>
                        <Button
                            variant="outline"
                            type="reset"
                            onClick={() => resetFields()}
                        >
                            <RotateCcwIcon className={"mb-0.25"} />
                            Reset fields
                        </Button>
                        <div className={"w-full flex flex-col sm:flex-row justify-end gap-3 sm:gap-2"}>
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
                                <ShirtIcon className={"mb-0.5"} />
                                Add item
                            </Button>
                        </div>
                    </Field>
                ) : (
                    <Field orientation="horizontal" className={"flex flex-col sm:flex-row justify-between mt-4 gap-2"}>
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
                                <SquarePenIcon />
                                Apply changes
                            </Button>
                        </div>
                    </Field>
                )
            }
        </form>
    )
}