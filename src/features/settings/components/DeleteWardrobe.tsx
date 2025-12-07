import {useState} from "react";
import {ShredderIcon} from "lucide-react";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function DeleteWardrobe() {
    const deletePassword = "confirm";

    const [confirmInput, setConfirmInput] = useState("");

    function handleDelete() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <ShredderIcon />
                    Delete Wardrobe
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Wardrobe</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone!
                        Type <span className={"font-mono font-bold"}> &#34;{deletePassword}&#34;</span> to confirm deletion:
                    </DialogDescription>
                </DialogHeader>
                <Input
                    type="text"
                    placeholder={deletePassword}
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={confirmInput !== deletePassword}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}