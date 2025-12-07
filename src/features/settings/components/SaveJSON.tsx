import {useWebDataStore} from "@/stores/web-data-store";
import {DownloadIcon} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function SaveJSON() {
    const {exportWardrobe} = useWebDataStore();

    function handleExport() {
        const data = exportWardrobe();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `myWardrobe-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <Button
            variant="outline"
            onClick={handleExport}
        >
            <DownloadIcon />
            Save as JSON
        </Button>
    );
}