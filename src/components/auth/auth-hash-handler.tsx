"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AuthHashHandler() {
    const router = useRouter();

    useEffect(() => {
        const handleHash = async () => {
            // Check if there is a hash in the URL (implicit flow)
            if (window.location.hash && window.location.hash.includes("access_token")) {
                const supabase = createBrowserClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // Supabase client auto-detects the hash and sets the session
                const { data, error } = await supabase.auth.getSession();

                if (data?.session) {
                    // Remove the hash to clean up the URL
                    window.history.replaceState(null, "", window.location.pathname);
                    // Refresh to ensure server components get the cookie
                    router.refresh();
                }
            }
        };

        handleHash();
    }, [router]);

    return null;
}
