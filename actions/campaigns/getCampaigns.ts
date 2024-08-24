"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { CampaignModel } from "@/models/Campaign";

interface GetCampaignsProps {
    page?: number;
    limit?: number;
    search?: string;
    order?: "asc" | "desc";
    sort?: "name" | "slug" | "createdAt" | "updatedAt";
}

/**
 * Fetches a paginated list of campaigns from the database, applying sorting
 * and filtering based on the provided parameters.
 *
 * This server action requires the user to be authenticated and have admin privileges.
 *
 * @param {GetCampaignsProps} [props={}] - The parameters for fetching campaigns.
 * @param {number} [props.page=1] - The page number to retrieve. Defaults to 1.
 * @param {number} [props.limit=10] - The number of campaigns to retrieve per page. Defaults to 10.
 * @param {string} [props.search=""] - The search query to filter campaigns by. Defaults to empty string.
 * @param {string} [props.sort="createdAt"] - The field by which to sort the campaigns. Defaults to "createdAt".
 * @param {string} [props.order="asc"] - The order of sorting. Can be "asc" for ascending or "desc" for descending. Defaults to "asc".
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the fetched campaigns,
 * pagination metadata, or an error message.
 *
 * @example
 * const result = await getCampaigns({ page: 2, limit: 5, sort: "createdAt", order: "desc" });
 *
 * if ('error' in result) {
 *     console.error(result.error);
 * } else {
 *     console.log(result.data); // Array of campaigns
 *     console.log(result.pagination); // Pagination metadata
 * }
 *
 * @throws {Error} If there is a failure in database connection or query execution.
 */
export default async function getCampaigns(props: GetCampaignsProps = {}) {
    // Get the session information to validate the user's authentication status and role.
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and is an admin. If not, return an "Unauthorized" error.
    if (!session || session.user.role !== "admin") {
        return {
            error: "فقط ادمین می‌تواند کمپین‌ها را دریافت کنند",
        };
    }

    try {
        // Establish a connection to the MongoDB database.
        await connectDB();

        // Extract pagination and sorting parameters from the input or use default values.
        const _page = props.page || 1;
        const _limit = props.limit || 10;
        const _sort = props.sort || "createdAt"; // Default sorting field is 'createdAt'.
        const _order = props.order || "asc"; // Default order is ascending.
        const _search = props.search || ""; // Default search query is empty.

        const query: any = {};
        if (_search) {
            query.$text = { $search: _search }; // Full-text search if your database supports it
        }

        // Fetch campaigns from the database with the applied sorting and pagination.
        const campaigns = await CampaignModel.find(query)
            .sort({ [_sort]: _order === "asc" ? 1 : -1 }) // Apply sorting based on the provided field and order.
            .skip((_page - 1) * _limit) // Calculate the number of documents to skip based on the current page.
            .limit(_limit) // Limit the number of documents returned to the specified limit.
            .exec(); // Execute the query.

        // Get the total number of campaign documents for pagination purposes.
        const total = await CampaignModel.countDocuments(query);

        // Return the fetched campaigns and pagination metadata.
        return {
            data: JSON.parse(JSON.stringify(campaigns)),
            pagination: {
                total,
                page: _page,
                limit: _limit,
                totalPages: Math.ceil(total / _limit),
            },
        };
    } catch (e) {
        // Log the error for debugging purposes and return a generic error message.
        console.log(e);
        return {
            error: "خطا در دریافت کمپین‌ها",
        };
    }
}
