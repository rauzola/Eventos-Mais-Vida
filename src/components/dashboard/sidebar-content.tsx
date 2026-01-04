"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, LifeBuoy, LucideIcon, LogOut, LayoutDashboard, Ticket, Calendar, Users, Settings, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/app/auth/signout/actions";

interface SidebarContentProps {
    user: {
        fullName?: string;
        email?: string;
        role?: string;
        avatarUrl?: string;
    };
    className?: string;
}

export function SidebarContent({ user, className }: SidebarContentProps) {
    const pathname = usePathname();
    const role = user.role || 'USER';

    const initials = user.fullName
        ? user.fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    // Menu Definition moved to Client Side to avoid serialization issues with Icons
    const allGroups = [
        {
            title: "Plataforma",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    roles: ['USER', 'STAFF', 'COORD', 'CONCELHO', 'ADMIN']
                },
                {
                    label: "Meus Eventos",
                    href: "/dashboard/my-events",
                    icon: Ticket,
                    roles: ['USER', 'STAFF', 'COORD', 'CONCELHO', 'ADMIN']
                }
            ]
        },
        {
            title: "Administração",
            items: [
                {
                    label: "Gestão de Eventos",
                    href: "/admin/events",
                    icon: Calendar,
                    roles: ['COORD', 'CONCELHO', 'ADMIN']
                },
                {
                    label: "Usuários & Acessos",
                    href: "/admin/users",
                    icon: Users,
                    roles: ['ADMIN']
                },
                {
                    label: "Configurações",
                    href: "/admin/settings",
                    icon: Settings,
                    roles: ['ADMIN']
                }
            ]
        }
    ];

    const menuGroups = allGroups.map(group => ({
        ...group,
        items: group.items.filter(item => item.roles.includes(role))
    })).filter(group => group.items.length > 0);

    return (
        <div className={cn("flex h-full flex-col bg-[#F8FAFC] border-r border-gray-200/60 dark:bg-stone-900 dark:border-stone-800", className)}>
            {/* Mobile/Desktop Header consistent */}
            <div className="border-b border-blue-100 p-6 bg-white/90 backdrop-blur-sm shrink-0">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                        <Heart className="w-6 h-6 text-white fill-white/20" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 text-sm tracking-tight group-hover:text-blue-700 transition-colors">
                            Projeto Mais Vida
                        </h2>


                    </div>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
                            {group.title}
                        </h4>
                        <nav className="space-y-1">
                            {group.items.map((link, linkIndex) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={linkIndex}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all group relative",
                                            isActive
                                                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100"
                                                : "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
                                        )}
                                    >
                                        <link.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500")} />
                                        <span>{link.label}</span>
                                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-600" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                ))}

                {/* Support Link */}
                <div>
                    <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
                        Ajuda
                    </h4>
                    <nav className="space-y-1">
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:text-indigo-600 hover:shadow-sm group"
                        >
                            <LifeBuoy className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            <span>Suporte Técnico</span>
                        </Link>
                    </nav>
                </div>
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 group p-2 rounded-lg transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100">
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                            {user.fullName || 'Usuário'}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                            {user.role}
                        </p>
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md"
                        title="Sair"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
