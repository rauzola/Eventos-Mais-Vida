import { getUserProfile } from "@/utils/supabase/server";
import { SidebarContent } from "./sidebar-content";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    Ticket
} from "lucide-react";

export async function Sidebar() {
    const data = await getUserProfile();
    const profile = data?.profile;
    const role = profile?.role || 'USER';

    const userData = {
        fullName: profile?.full_name || 'Usuário',
        email: data?.user?.email,
        role: role,
        avatarUrl: profile?.avatar_url || undefined
    };

    return <SidebarContent user={userData} />;
}
