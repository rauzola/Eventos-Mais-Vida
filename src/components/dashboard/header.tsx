import { UserNav } from "./user-nav";
import { getUserProfile } from "@/utils/supabase/server";
import { Bell, Calendar, LayoutDashboard, Settings, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";

export async function DashboardHeader() {
    const data = await getUserProfile();
    const profile = data?.profile;
    const role = profile?.role || 'USER';

    // Safe extraction of data with fallback
    const userDisplay = {
        email: data?.user?.email,
        fullName: profile?.full_name,
        avatarUrl: profile?.avatar_url,
        role: role
    }

    return (
        <div className="h-16 flex items-center justify-between px-4 md:px-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-200">
            <div className="flex items-center gap-4">
                <MobileSidebar user={userDisplay} />

                <div className="flex flex-col">
                    <span className="hidden md:block text-xs font-medium text-indigo-600 uppercase tracking-wider mb-0.5">Visão Geral</span>
                    <h2 className="text-sm font-bold text-slate-800">
                        Painel de Controle
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full h-8 w-8 transition-colors">
                    <Bell className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>
                <UserNav user={userDisplay} />
            </div>
        </div>
    );
}
