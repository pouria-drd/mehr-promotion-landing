import { useEffect, useState } from "react";
import { getCampaigns, deleteCampaignBySlug } from "@/actions/campaigns";
import { CampaignCreationDocument } from "@/types/CampaignDocument";

interface UseAdminCampaignsProps {
    initialPage?: number;
    initialLimit?: number;
    initialSortField?: "name" | "slug" | "createdAt" | "updatedAt";
    initialSortOrder?: "asc" | "desc";
}

export default function useAdminCampaigns(props: UseAdminCampaignsProps) {
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number | null>(
        props.initialPage || 1
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
        props.initialSortOrder || "desc"
    );
    const [campaigns, setCampaigns] = useState<CampaignCreationDocument[]>([]);
    const [sortField, setSortField] = useState<
        "name" | "slug" | "createdAt" | "updatedAt"
    >(props.initialSortField || "createdAt");

    const fetchCampaigns = async () => {
        try {
            const result = await getCampaigns({
                order: sortOrder,
                sort: sortField,
                limit: props.initialLimit,
                page: currentPage || 1,
            });

            if (result.error) {
                setError(result.error);
                return;
            }

            if (result.data) {
                setCampaigns(result.data);
                setTotalPages(result.pagination?.totalPages || 1);
            }
        } catch (error) {
            setError("خطا در دریافت کمپین‌ها");
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [sortField, sortOrder, currentPage, props.initialLimit]);

    const handleDelete = async (slug: string) => {
        const canDelete = window.confirm(
            "Are you sure you want to delete this campaign?"
        );
        if (!canDelete) return;

        try {
            const result = await deleteCampaignBySlug(slug);

            if (result.error) {
                window.alert("Error deleting campaign");
                return;
            }

            fetchCampaigns();
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return {
        campaigns,
        error,
        totalPages,
        currentPage,
        sortField,
        sortOrder,
        setSortField,
        setSortOrder,
        handleDelete,
        handlePageChange,
    };
}
