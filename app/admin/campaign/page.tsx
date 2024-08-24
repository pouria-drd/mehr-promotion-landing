import { CampaignForm } from "@/components/forms";
import AdminNavbar from "@/components/navbar/AdminNavbar";

function AdminCampaignPage() {
    return (
        <section className="flex flex-col items-center gap-8">
            <AdminNavbar
                title="کمپین ها"
                children="بازگشت"
                linkHref="/admin"
                linkVariant="outlined"
            />
            <CampaignForm />
        </section>
    );
}

export default AdminCampaignPage;
