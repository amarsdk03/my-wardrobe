import React from "react";

import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";
import {useWebDataStore} from "@/stores/web-data-store";

export default function CustomizeAppearance() {
    const { formData, updateUserSettings } = useWebDataStore();
    const darkMode = formData.userSettings.darkMode;

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
        <div>
            <h4 className="text-xl font-medium mb-2">
                Customize appearance
            </h4>
            <h4 className="text-md font-medium mb-1">
                Theme
            </h4>
            <Button
                variant="outline"
                onClick={toggleMode}
            >
                {darkMode ? <MoonIcon /> : <SunIcon />}
                {darkMode ? "Dark Mode" : "Light Mode"}
            </Button>
            <p className="text-sm mt-2">
                More options coming soon...
            </p>
        </div>
    )
}