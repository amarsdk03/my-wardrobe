import {Button} from "@/components/ui/button";
import {Columns2Icon, Columns3Icon, Columns4Icon} from "lucide-react";
import {gridSize} from "@/types/web-data";

export default function ZoomLevel(
    {
        gridSize,
        setGridSize,
    } : {
        gridSize: gridSize,
        setGridSize: (value: gridSize) => void,
    }
) {
    switch (gridSize) {
        case "S":
            return (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGridSize("M")}
                >
                    <Columns4Icon />
                </Button>
            )
        case "M":
            return (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGridSize("L")}
                >
                    <Columns3Icon />
                </Button>
            )
            break;
        case "L":
            return (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGridSize("S")}
                >
                    <Columns2Icon />
                </Button>
            )
    }
}