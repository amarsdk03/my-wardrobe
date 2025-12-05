import React from "react";
import {SettingsIcon} from "lucide-react";

import MemoryUsage from "@/features/settings/components/MemoryUsage";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {Button} from "@/components/ui/button";

export default function SettingsDialog() {
    const [showSettings, setShowSettings] = React.useState(false);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                aria-label="Filters"
                onClick={() => setShowSettings(!showSettings)}
            >
                <SettingsIcon />
            </Button>
            <AlertDialog
                open={showSettings}
                onOpenChange={setShowSettings}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Settings & info
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <MemoryUsage />
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Discard
                        </AlertDialogCancel>
                        <AlertDialogAction>
                            Save changes
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}