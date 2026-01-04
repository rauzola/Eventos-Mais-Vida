import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { getUserProfile } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Double check authentication here
    const data = await getUserProfile();
    if (!data?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar Desktop - Fixed & Full Height */}
            <aside className="hidden md:flex w-[280px] flex-col fixed inset-y-0 z-40 border-r border-gray-200 bg-[#F8FAFC]">
                <Sidebar />
            </aside>

            {/* Main Content Area - Pushed to the right */}
            <div className="flex flex-col md:pl-[280px] min-h-screen transition-all duration-300">
                <DashboardHeader />
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
