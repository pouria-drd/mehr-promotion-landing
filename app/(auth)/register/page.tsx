"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthForm } from "@/components/forms";

function Register() {
    const router = useRouter();

    const { status, data: session } = useSession();

    const showSession = () => {
        if (status === "authenticated" && session.user.role === "admin") {
            return <AuthForm type="Register" />;
        } else if (status === "loading") {
            return <span className="text-[#888] text-sm mt-7">Loading...</span>;
        } else {
            return router.push("/");
        }
    };

    return <>{showSession()}</>;
}
export default Register;
