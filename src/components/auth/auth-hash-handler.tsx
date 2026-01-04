"use client";

import { useEffect, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AuthHashHandler() {
    const router = useRouter();
    const processingRef = useRef(false);

    useEffect(() => {
        const handleHash = async () => {
            // Prevent double execution in React Strict Mode (Dev)
            if (processingRef.current) return;

            const hash = window.location.hash;
            // Check if there is a hash in the URL (implicit flow)
            if (hash && hash.includes("access_token")) {
                processingRef.current = true;

                const supabase = createBrowserClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // Check for special flows (Invite or Password Recovery) from URL hash
                const isInviteOrRecovery = hash.includes("type=invite") || hash.includes("type=recovery");

                // Supabase client auto-detects the hash and sets the session
                const { data, error } = await supabase.auth.getSession();

                if (data?.session) {
                    // Remove the hash to clean up the URL
                    window.history.replaceState(null, "", window.location.pathname);

                    if (isInviteOrRecovery) {
                        if (hash.includes("type=invite")) {
                            // Invite flow: User needs to set name AND password
                            window.location.assign("/complete-profile");
                        } else {
                            // Recovery flow: User only needs to set password
                            window.location.assign("/update-password");
                        }
                    } else {
                        // Refresh to ensure server components get the cookie (Standard Login)
                        router.refresh();
                    }
                } else {
                    // Reset processing flag if session creation failed
                    processingRef.current = false;
                }
            }
        };

        handleHash();
    }, [router]);

    return null;
}
