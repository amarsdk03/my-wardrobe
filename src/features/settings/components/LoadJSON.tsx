import React, {useState} from "react";

import {getSanitizedWardrobeData} from "@/stores/validation";
import {useWebDataStore} from "@/stores/web-data-store";
import {TriangleAlertIcon, UploadIcon} from "lucide-react";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function LoadJSON() {
    const {importWardrobe} = useWebDataStore();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState("");

    function handleImport() {
        try {
            const parsed = JSON.parse(jsonInput);

            // Validate and sanitize the data
            const sanitized = getSanitizedWardrobeData(parsed);

            if (!sanitized) {
                setError("Invalid wardrobe data detected. Please check your file.");
                return;
            }

            // Import the sanitized data
            importWardrobe(sanitized.userWardrobe);
            setJsonInput("");
            setError("");
            setDialogOpen(false);

            window.location.reload();
        } catch (err) {
            if (err instanceof SyntaxError) {
                setError("Invalid JSON format. Please check your data.");
            } else {
                setError("An error occurred while importing. Please try again.");
            }
        }
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.name.endsWith('.json')) {
            setError("Please upload a JSON file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File too large. Maximum size is 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setJsonInput(content);
            setError("");
        };
        reader.onerror = () => {
            setError("Failed to read file");
        };
        reader.readAsText(file);
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UploadIcon />
                    Load from JSON
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
                <DialogHeader className={"p-8 pb-2"}>
                    <DialogTitle>Load Wardrobe from JSON</DialogTitle>
                    <DialogDescription>
                        Paste your JSON data or upload a JSON file
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] px-8">
                    <Alert variant="destructive" className={"bg-red-100 dark:bg-transparent"}>
                        <AlertTitle className={"flex items-center gap-1 font-bold text-lg mb-1"}>
                            <TriangleAlertIcon />
                            ATTENTION!
                        </AlertTitle>
                        <AlertDescription>
                            <p>
                                Only import files you have previously exported or from trusted sources.
                                Malicious files could contain harmful data: use at your own risk!
                            </p>
                            <p>
                                Note that this will also <span className={"font-semibold"}>replace your current wardrobe.</span>
                            </p>
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-4 mt-8">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="file-upload">Upload JSON File</Label>
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".json"
                                onChange={handleFileUpload}
                                className="mb-2"
                            />
                        </div>
                        <Textarea
                            value={jsonInput}
                            onChange={(e) => {
                                setJsonInput(e.target.value);
                                setError("");
                            }}
                            placeholder="Paste JSON here..."
                            className="font-mono text-xs h-[200px] break-all"
                        />
                        {
                            error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )
                        }
                    </div>
                </ScrollArea>
                <DialogFooter className={"pb-8 px-8"}>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => {
                            setJsonInput("");
                            setError("");
                        }}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleImport} disabled={!jsonInput}>
                        Import
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}