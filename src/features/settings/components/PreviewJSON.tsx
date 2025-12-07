import {useWebDataStore} from "@/stores/web-data-store";
import {ScanEyeIcon} from "lucide-react";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

export default function PreviewJSON() {
    const {formData} = useWebDataStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ScanEyeIcon />
                    Preview JSON
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Wardrobe Data Preview</DialogTitle>
                    <DialogDescription>
                        Current JSON representation of your wardrobe
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    value={JSON.stringify(formData, null, 2)}
                    readOnly
                    className="no-scrollbar-textarea font-mono text-xs h-[300px]"
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}