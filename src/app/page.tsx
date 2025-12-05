import Title from "@/features/homepage/components/Title";
import Searchbar from "@/features/homepage/components/Searchbar";

export default function Home() {
    return (
        <div className={"w-full h-full"}>
            <div className="flex flex-col items-center justify-center">
                <div className={"home-hero"}>
                    <Title />
                    <Searchbar />
                </div>
            </div>
        </div>
    );
}
