"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function forgotPassword(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/auth/callback?next=/update-password`,
    });

    if (error) {
        redirect("/forgot-password?error=" + encodeURIComponent(error.message));
    }

    redirect("/forgot-password?message=Verifique seu e-mail para redefinir a senha.");
}
