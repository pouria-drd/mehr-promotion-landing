"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { CampaignModel } from "@/models/Campaign";

interface GetCampaignBySlugProps {
    slug: string;
}

/**
 * Retrieves a campaign from the database by its slug.
 *
 * This server action requires the user to be authenticated and have admin privileges.
 *
 * @param {GetCampaignBySlugProps} props - The properties for retrieving a campaign.
 * @param {string} props.slug - The slug of the campaign to retrieve.
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the retrieved campaign,
 * or an error message.
 *
 * @example
 * const result = await getCampaignBySlug({ slug: "my-campaign" });
 *
 * if ('error' in result) {
 *     console.error(result.error);
 * } else {
 *     console.log(result.data); // The retrieved campaign
 * }
 *
 * @throws {Error} If there is a failure in database connection or query execution.
 */
export default async function getCampaignBySlug(props: GetCampaignBySlugProps) {
    // Get the session information to validate the user's authentication status and role.
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and is an admin. If not, return an "Unauthorized" error.
    if (!session || session.user.role !== "admin") {
        return {
            error: "فقط ادمین می‌تواند کمپین‌ها را مشاهده کنند",
        };
    }

    try {
        // Establish a connection to the MongoDB database.
        await connectDB();

        // Retrieve the campaign from the database.
        const campaign = await CampaignModel.findOne({ slug: props.slug });

        if (!campaign) {
            return {
                error: "کمپین یافت نشد",
            };
        }

        // Return the retrieved campaign.
        return {
            data: JSON.parse(JSON.stringify(campaign)),
            message: "کمپین با موفقیت دریافت شد",
        };
    } catch (e) {
        // Log the error for debugging purposes and return a generic error message.
        // console.log(e);
        return {
            error: "خط در دریافت کمپین",
        };
    }
}
