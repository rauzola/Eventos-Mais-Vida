import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Eventos Mais Vida</h1>

      {user ? (
        <div className="mt-8 text-center">
          <p className="text-xl">Bem-vindo, {user.email}!</p>
          <form action={signOut}>
            <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Sair
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8">
          <p className="mb-4 text-xl">Projeto em construção</p>
          <a href="/login" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Fazer Login
          </a>
        </div>
      )}
    </div>
  );
}

