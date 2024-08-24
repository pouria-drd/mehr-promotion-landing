"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { CampaignData } from "@/types/CampaignDocument";
import { getClientCampaignBySlug } from "@/actions/campaigns";
import { PageBuilder } from "../../../components/page-builder";

const CampaignPage = ({ params }: { params: { slug: string } }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [campaign, setCampaign] = useState<CampaignData | null>(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const result = await getClientCampaignBySlug(params.slug);

                if (result.error) {
                    setError(result.error);
                    setLoading(false);
                    return;
                } else if (result.data) {
                    setCampaign(result.data);
                    setLoading(false);
                    return;
                }
            } catch (error: any) {
                setError("خطا در دریافت کمپین");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-svh r2l">
                <p>لطفا صبر کنید...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-svh r2l">
                <p>{error}</p>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center h-svh r2l">
                <p>کمپین یافت نشد</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col gap-1 w-full sm:w-96 mx-auto">
            <Navbar title={campaign.name} backLink="" />

            <PageBuilder campaign={campaign} />
        </main>
    );
};

export default CampaignPage;
