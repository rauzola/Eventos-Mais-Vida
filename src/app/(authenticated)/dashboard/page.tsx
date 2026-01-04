import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProfile } from "@/utils/supabase/server";
import { Calendar, Users, Activity, ExternalLink, Ticket, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
    const data = await getUserProfile();
    const profile = data?.profile;

    const stats = [
        {
            title: "Inscrições Ativas",
            value: "0",
            subtitle: "Em eventos futuros",
            icon: Ticket,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Eventos Passados",
            value: "0",
            subtitle: "Histórico de participação",
            icon: Calendar,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    const adminStats = [
        {
            title: "Usuários Totais",
            value: "-",
            subtitle: "Base de cadastro",
            icon: Users,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Receita Pendente",
            value: "R$ 0,00",
            subtitle: "Aguardando confirmação",
            icon: Activity,
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];

    const allStats = (profile?.role === 'ADMIN' || profile?.role === 'COORD')
        ? [...stats, ...adminStats]
        : stats;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 shadow-xl text-white">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/20">
                                {profile?.role} Dashboard
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Bem-vindo de volta, {profile?.full_name?.split(' ')[0] || 'Visitante'}!
                        </h1>
                        <p className="text-indigo-100 max-w-xl text-lg">
                            Aqui você gerencia suas inscrições e acompanha as novidades do Projeto Mais Vida.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="bg-white text-indigo-700 hover:bg-indigo-50 border-none shadow-lg font-semibold h-11 px-6">
                            <Calendar className="mr-2 h-4 w-4" />
                            Ver Agenda
                        </Button>
                        <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white h-11 px-6 backdrop-blur-sm">
                            Suporte
                        </Button>
                    </div>
                </div>
                {/* Decoration Circles */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
            </div>

            {/* Quick Stats Grid */}
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-500" />
                    Visão Geral
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {allStats.map((stat, i) => (
                        <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon className={cn("h-16 w-16", stat.color)} />
                            </div>
                            <CardContent className="p-6">
                                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center mb-4 transition-colors", stat.bg, stat.color)}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                    <div className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</div>
                                    <p className="text-xs text-slate-400">{stat.subtitle}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="grid gap-6 md:grid-cols-7">
                {/* Main Feed / Events */}
                <div className="md:col-span-5 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Próximos Eventos</h3>
                        <Link href="/events" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            Ver todos <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    </div>

                    {/* Empty State Redesigned */}
                    <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50/50 flex flex-col items-center justify-center min-h-[300px]">
                        <div className="bg-white p-4 rounded-full shadow-sm mb-4 border border-gray-100 ring-4 ring-gray-50">
                            <Sparkles className="h-8 w-8 text-indigo-300" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Tudo calmo por aqui</h4>
                        <p className="text-slate-500 max-w-sm mx-auto mb-8">
                            Você não possui inscrições ativas no momento. Que tal explorar os próximos eventos do Mais Vida?
                        </p>
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 px-8 h-10 shadow-lg shadow-slate-200">
                            Explorar Eventos
                        </Button>
                    </div>
                </div>

                {/* Sidebar Widget (Optional) */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-indigo-900 border-none text-white shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-bl-full z-0" />
                        <CardContent className="p-6 relative z-10">
                            <h4 className="font-bold text-lg mb-2">Precisa de ajuda?</h4>
                            <p className="text-indigo-200 text-sm mb-6">
                                Nossa equipe de suporte está disponível para tirar suas dúvidas sobre inscrições.
                            </p>
                            <Button variant="secondary" className="w-full bg-white text-indigo-900 hover:bg-indigo-50">
                                Falar com Suporte
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
