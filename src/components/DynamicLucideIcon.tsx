import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

import {FC} from "react";

export default function DynamicLucideIcon({ iconName, className }: {iconName?: string; className?: string }) {
    if (!iconName) {
        return null;
    }

    const Icon = (Icons as unknown as Record<string, FC<LucideProps>>)[iconName];

    if (!Icon) {
        return null;
    }

    return (
        <Icon className={className} />
    );
}