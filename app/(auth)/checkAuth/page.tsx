"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function CheckAuth() {
    const router = useRouter();
    const { status } = useSession();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <button
                    className="border border-solid border-black rounded"
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/");
                        });
                    }}>
                    Sign Out
                </button>
            );
        } else if (status === "loading") {
            return <span className="text-[#888] text-sm mt-7">Loading...</span>;
        } else {
            return (
                <Link
                    href="/login"
                    className="border border-solid border-black rounded">
                    Sign In
                </Link>
            );
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-xl">Check User Auth</h1>
            {showSession()}
        </main>
    );
}

export default CheckAuth;
