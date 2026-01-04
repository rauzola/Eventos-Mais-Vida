"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function completeProfile(formData: FormData) {
    const supabase = await createClient();

    const fullName = formData.get("fullName") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        redirect("/complete-profile?error=Senhas não coincidem");
    }

    // 1. Update Password (Auth)
    const { error: authError } = await supabase.auth.updateUser({
        password: password,
    });

    if (authError) {
        redirect("/complete-profile?error=" + encodeURIComponent(authError.message));
    }

    // 2. Update Profile Data (Database)
    // We need to get the user ID first
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ full_name: fullName })
            .eq('id', user.id);

        if (profileError) {
            // Log error but don't stop flow if password worked, 
            // though ideally we check. For now redirect with warning or just proceed.
            console.error("Error updating profile:", profileError);
        }
    }

    revalidatePath("/", "layout");
    redirect("/");
}
