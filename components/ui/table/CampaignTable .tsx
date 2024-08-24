"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge, Button, Table } from "..";
import { useAdminCampaigns } from "@/hooks";
import { BinIcon, EditIcon, EyeIcon } from "@/components/icons";
import { CampaignCreationDocument } from "@/types/CampaignDocument";

const CampaignTable = () => {
    const {
        campaigns,
        totalPages,
        currentPage,
        sortField,
        sortOrder,
        error,
        setSortField,
        setSortOrder,
        handleDelete,
        handlePageChange,
    } = useAdminCampaigns({
        initialPage: 1,
        initialLimit: 10,
        initialSortOrder: "desc",
    });

    const columns = [
        {
            header: "عملیات",
            accessor: (campaign: CampaignCreationDocument) => (
                <div className="flex items-center justify-center gap-3 transition-all">
                    <Link
                        href={`/${campaign.slug}`}
                        className="text-ada-primary">
                        <EyeIcon />
                    </Link>
                    <Link
                        href={`/admin/campaign/${campaign.slug}`}
                        className="text-blue-600 hover:text-blue-700">
                        <EditIcon />
                    </Link>
                    <button
                        onClick={() => handleDelete(campaign.slug)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                </div>
            ),
        },
        {
            header: "تاریخ  به‌روزرسانی",
            accessor: (campaign: CampaignCreationDocument) => (
                <p className="text-center ss02">
                    {formatDate(campaign.updatedAt, true)}
                </p>
            ),
        },
        {
            header: "تاریخ ایجاد",
            accessor: (campaign: CampaignCreationDocument) => (
                <p className="text-center ss02">
                    {formatDate(campaign.createdAt, true)}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: (campaign: CampaignCreationDocument) => (
                <div className="flex items-center justify-center">
                    {campaign.isActive ? (
                        <Badge status="active" />
                    ) : (
                        <Badge status="inactive" />
                    )}
                </div>
            ),
        },
        {
            header: "نام لینک",
            accessor: (campaign: CampaignCreationDocument) => (
                <p className="text-center">{campaign.slug}</p>
            ),
        },
        {
            header: "نام کمپین",
            accessor: (campaign: CampaignCreationDocument) => (
                <p className="text-center">{campaign.name}</p>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-between gap-4">
                    <select
                        value={sortField}
                        onChange={(e) =>
                            setSortField(
                                e.target.value as
                                    | "name"
                                    | "slug"
                                    | "createdAt"
                                    | "updatedAt"
                            )
                        }
                        className="p-2 border border-gray-300 rounded-md">
                        <option value="name">Name</option>
                        <option value="slug">Slug</option>
                        <option value="createdAt">Created At</option>
                        <option value="updatedAt">Updated At</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(e.target.value as "asc" | "desc")
                        }
                        className="p-2 border border-gray-300 rounded-md">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                {currentPage !== null && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="p-2 border border-gray-300 rounded-md">
                            قبلی
                        </Button>
                        <span className="flex items-center">
                            صفحه {currentPage} از {totalPages}
                        </span>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="p-2 border border-gray-300 rounded-md">
                            بعدی
                        </Button>
                    </div>
                )}
            </div>
            {error ? (
                <p className="text-red-500 r2l">{error}</p>
            ) : (
                <Table columns={columns} data={campaigns} showIndex />
            )}
        </div>
    );
};

export default CampaignTable;
