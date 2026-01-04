"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "./sidebar-content";
import { useState } from "react";

interface MobileSidebarProps {
    user: any;
}

export function MobileSidebar({ user }: MobileSidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-slate-500">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px] bg-[#F8FAFC] border-r border-gray-200">
                <SidebarContent user={user} />
            </SheetContent>
        </Sheet>
    );
}
