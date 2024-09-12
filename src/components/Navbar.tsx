'use client'

import { Menu } from "lucide-react";
import { ThemeButton } from "./ThemeButton";
import { useContext } from "react";
import { ContextUI } from "@/context/ui/ContextUI";


export default function Navbar() {
    const { handleToggleSidebar } = useContext(ContextUI)
    return (
        <nav className="h-16 flex items-center justify-between px-4 text-[#ECDFCC] bg-[#697565]">
            <h3 className="font-bold text-3xl">Products</h3>
            <div className="flex items-center gap-4 ">
                <ThemeButton />
                <Menu className="lg:hidden text-[#ECDFCC] cursor-pointer" onClick={() => handleToggleSidebar()} />
            </div>
        </nav>
    )
}
