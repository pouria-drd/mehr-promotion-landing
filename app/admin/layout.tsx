import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel",
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return <main>{children}</main>;
};

export default AdminLayout;
