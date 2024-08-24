import { CampaignForm } from "@/components/forms";
import AdminNavbar from "@/components/navbar/AdminNavbar";

function AdminCampaignUpdatePage({ params }: { params: { slug: string } }) {
    return (
        <section className="flex flex-col items-center gap-8">
            <AdminNavbar
                title="کمپین ها"
                children="بازگشت"
                linkHref="/admin"
                linkVariant="outlined"
            />
            <CampaignForm slug={params.slug} />
        </section>
    );
}

export default AdminCampaignUpdatePage;
