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
import CustomizeAppearance from "@/features/settings/components/CustomizeAppearance";

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
                <AlertDialogContent aria-describedby={"settings-dialog"}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Settings & info
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className={"mt-2"}>
                        <h4 className="text-xl font-medium mb-1">
                            User settings
                        </h4>
                        <p className="text-sm">
                            Coming soon...
                        </p>
                    </div>
                    <CustomizeAppearance />
                    <MemoryUsage />
                    <div className={"mt-2"}>
                        <h4 className="text-xl font-medium mb-1">
                            Backup/Load
                        </h4>
                        <p className="text-sm">
                            Coming soon...
                        </p>
                    </div>
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