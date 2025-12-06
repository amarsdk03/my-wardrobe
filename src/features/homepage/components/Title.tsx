'use client';

import TextPressure from "@/components/TextPressure";
import {useWebDataStore} from "@/stores/web-data-store";
import React from "react";

export default function Title() {
    const { formData } = useWebDataStore();
    const [textColor, setTextColor] = React.useState("#000000");

    React.useEffect(() => {
        if (formData.userSettings.darkMode) {
            setTextColor("#ffcf1f");
        } else {
            setTextColor("#000000");
        }
    }, [formData.userSettings.darkMode]);

    return (
        <div>
            <TextPressure
                text="myWardrobe"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor={textColor}
                minFontSize={36}
            />
        </div>
    )
}