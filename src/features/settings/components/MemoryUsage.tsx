import React from "react";

import {estimateLocalStorageUsage} from "@/utils/localStorage";
import {Progress} from "@/components/ui/progress";

export default function MemoryUsage() {
    const memoryUsage = Number.parseFloat(estimateLocalStorageUsage().toFixed(8));
    const percentage = Number.parseFloat(((memoryUsage / 5) * 100).toFixed(4));

    return (
        <div>
            <h4 className="text-xl font-medium mb-1">
                Total memory usage
            </h4>
            <p className="text-sm my-2">
                You are using&nbsp;
                <span className={"font-medium"}>~{ memoryUsage } MB ({ percentage }%)</span> out of&nbsp;
                <span className={"font-medium"}>5MB</span> of local storage.
            </p>
            <Progress value={percentage} />
            <div className="text-sm text-muted-foreground mt-3">
                <span className={"font-medium"}>IMPORTANT:</span> ALL of your data is saved locally, so you can end up&nbsp;
                <span className={"font-medium"}>losing everything</span> if you clear the cache, reset your browser or
                uninstall it. This is why you get a weekly reminder from the app to backup your data on your own device,
                which you can also do manually down below.
            </div>
        </div>
    )
}