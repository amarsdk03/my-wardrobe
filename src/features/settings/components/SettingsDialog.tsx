import React from "react";

import {useWebDataStore} from "@/stores/web-data-store";
import {estimateLocalStorageUsage} from "@/utils/localStorage";
import {MoonIcon, SettingsIcon, SunIcon, TagIcon} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {ScrollArea} from "@/components/ui/scroll-area";

import SaveJSON from "@/features/settings/components/SaveJSON";
import LoadJSON from "@/features/settings/components/LoadJSON";
import PreviewJSON from "@/features/settings/components/PreviewJSON";
import DeleteWardrobe from "@/features/settings/components/DeleteWardrobe";

export default function SettingsDialog() {
    const { formData, updateUserSettings } = useWebDataStore();
    const darkMode = formData.userSettings.darkMode;
    const [showSettings, setShowSettings] = React.useState(false);

    const memoryUsage = Number.parseFloat(estimateLocalStorageUsage().toFixed(5));
    const percentage = Number.parseFloat(((memoryUsage / 5) * 100).toFixed(4));

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    function toggleMode() {
        updateUserSettings({ darkMode: !darkMode });
    }

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
                <AlertDialogContent className={"p-0"} aria-describedby={"settings-dialog"}>
                    <AlertDialogHeader className={"px-8 pt-8"}>
                        <AlertDialogTitle>
                            Settings & info
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <ScrollArea className="max-h-[75vh]">
                        <div className="px-8">
                            <div className={"grid grid-cols-1 gap-6 mb-4"}>
                                <div>
                                    <h4 className="text-xl font-medium mb-2">
                                        Customize myWardrobe
                                    </h4>
                                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className={"w-full"}>
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        className={"w-full"}
                                                        disabled
                                                    >
                                                        <TagIcon />
                                                        Manage categories
                                                    </Button>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p><i>Coming soon...</i></p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={toggleMode}
                                        >
                                            {darkMode ? <MoonIcon /> : <SunIcon />}
                                            {darkMode ? "Theme: Dark Mode" : "Theme: Light Mode"}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium mb-3">
                                        Total memory usage
                                    </h4>
                                    <p className="text-sm mb-2">
                                        You are using&nbsp;
                                        <span className={"font-semibold"}>~{ memoryUsage } MB ({ percentage }%)</span> out of&nbsp;
                                        <span className={"font-semibold"}>5MB</span> of local storage.
                                    </p>
                                    <Progress value={percentage} />
                                    <div className="text-xs text-muted-foreground mt-3">
                                        <span className={"font-semibold"}>IMPORTANT:</span> all the website data is saved locally, so you can&nbsp;
                                        <span className={"font-semibold"}>lose everything</span> if you clear the cache, reset your browser or
                                        uninstall it.
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        It is recommended you manually save a backup of your wardrobe every once in a while,
                                        which you can do by clicking the&nbsp;
                                        <span className={"font-semibold"}>&#34;Save as JSON&#34;</span> button down below.
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium mb-3">
                                        Manage your Wardrobe
                                    </h4>
                                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
                                        <SaveJSON />
                                        <LoadJSON />
                                        <PreviewJSON />
                                        <DeleteWardrobe />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <AlertDialogFooter className={"px-8 pb-6"}>
                        <AlertDialogAction>
                            Save and close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}