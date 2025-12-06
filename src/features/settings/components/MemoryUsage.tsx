'use client';

import React from "react";

import {estimateLocalStorageUsage} from "@/utils/localStorage";
import {Progress} from "@/components/ui/progress";

export default function MemoryUsage() {
    const memoryUsage = Number.parseFloat(estimateLocalStorageUsage().toFixed(5));
    const percentage = Number.parseFloat(((memoryUsage / 5) * 100).toFixed(4));

    return (
        <div>
            <h4 className="text-xl font-medium mb-1">
                Total memory usage
            </h4>
            <p className="text-sm my-2">
                You are using&nbsp;
                <span className={"font-semibold"}>~{ memoryUsage } MB ({ percentage }%)</span> out of&nbsp;
                <span className={"font-semibold"}>5MB</span> of local storage.
            </p>
            <Progress value={percentage} />
            <div className="text-sm text-muted-foreground mt-3">
                <span className={"font-semibold"}>IMPORTANT:</span> all the website data is saved locally, so you can&nbsp;
                <span className={"font-semibold"}>lose everything</span> if you clear the cache, reset your browser or
                uninstall it.
            </div>
        </div>
    )
}