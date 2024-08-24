import { CampaignTable } from "@/components/ui";
import AdminNavbar from "@/components/navbar/AdminNavbar";

async function AdminPage() {
    return (
        <section className="flex flex-col items-center gap-8">
            <AdminNavbar
                title="کمپین ها"
                children="کمپین جدید"
                linkHref="/admin/campaign"
            />
            <CampaignTable />
        </section>
    );
}

export default AdminPage;
