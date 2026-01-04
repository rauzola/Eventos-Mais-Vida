import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Shield, Calendar, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-indigo-200 shadow-md">
            <Shield className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Mais Vida
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Entrar
          </Link>
          <Link href="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-200">
              Começar Agora
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
            Novo Sistema 2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Gestão de Eventos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Simples e Eficiente
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A plataforma completa para gerenciar inscrições, organizar acampamentos e conectar pessoas no Projeto Mais Vida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl shadow-slate-200 transition-all hover:scale-105">
                Acessar Plataforma <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left w-full px-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Agenda Organizada</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Visualize e gerencie todos os eventos e acampamentos em um só lugar.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gestão de Equipes</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Controle total sobre inscrições, staffs e participantes por evento.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Check-in Digital</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Facilite a entrada e tenha dados em tempo real sobre a presença.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400 border-t border-slate-100 bg-slate-50/50 mt-12">
        <p>&copy; {new Date().getFullYear()} Projeto Mais Vida. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
