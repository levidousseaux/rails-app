import MobileSidebar from "./mobile-sidebar";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/components/providers/theme-provider";
import {Button} from "@/components/ui/button";

export default function Navbar() {
    return (
        <div className="flex items-center p-4 border-b h-[72px]">
            <MobileSidebar/>
            <div className="flex w-full justify-end">
                <ModeToggle/>
            </div>
        </div>
    );
}

export function ModeToggle() {
    const {setTheme, theme} = useTheme();

    return (
        <Button
            variant="link"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? <Moon/> : <Sun/>}
        </Button>
    );
}