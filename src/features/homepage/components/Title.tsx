'use client';

import TextPressure from "@/components/TextPressure";

export default function Title() {
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
                textColor="#000000"
                strokeColor="#ff0000"
                minFontSize={36}
            />
        </div>
    )
}