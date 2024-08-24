import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unauthorized",
};

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <section className="flex items-center justify-center w-full h-svh">
            {children}
        </section>
    );
};

export default AuthLayout;