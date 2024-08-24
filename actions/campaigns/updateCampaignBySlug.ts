"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { CampaignModel } from "@/models/Campaign";
import { SectionData } from "@/types/CampaignDocument";

interface UpdateCampaignData {
    name?: string;
    isActive?: boolean;
    sections?: SectionData[];
    backgroundColor?: string;
}

/**
 * Updates a campaign in the database by its slug.
 *
 * This server action requires the user to be authenticated and have admin privileges.
 *
 * @param {string} slug - The slug of the campaign to update.
 * @param {UpdateCampaignData} props.data - The updated data for the campaign.
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the updated campaign,
 * or an error message.
 *
 * @example
 * const result = await updateCampaignBySlug(slug: "my-campaign",{
 *   data: {
 *     name: "Updated Campaign",
 *     backgroundColor: "#F1F1F1",
 *     sections: [
 *       {
 *         title: "Introduction Update",
 *         type: "header",
 *         order: 1,
 *         content: "Welcome to our new campaign!"
 *       },
 *       {
 *         type: "banner",
 *         order: 2,
 *         content: "https://example.com/banner.jpg"
 *       }
 *     ],
 *     isActive: true
 *   }
 * });
 *
 * @throws {Error} If there is a failure in database connection or query execution.
 */
async function updateCampaignBySlug(_slug: string, _data: UpdateCampaignData) {
    // Get the session information to validate the user's authentication status and role.
    const session = await getServerSession(authOptions);
    // Check if the user is authenticated and is an admin. If not, return an "Unauthorized" error.
    if (!session || session.user.role !== "admin") {
        return {
            error: "فقط ادمین می‌تواند کمپین‌ها را به‌روزرسانی کنند",
        };
    }

    try {
        // Establish a connection to the MongoDB database.
        await connectDB();

        // Update the campaign in the database.
        const updatedCampaign = await CampaignModel.findOneAndUpdate(
            { slug: _slug },
            { $set: _data },
            { new: true, runValidators: true }
        );

        if (!updatedCampaign) {
            return {
                error: "کمپین یافت نشد",
            };
        }

        // Revalidate the "/admin" page to remove the deleted campaign from the list.
        revalidatePath("/admin", "page");

        // Return the updated campaign.
        return {
            data: JSON.parse(JSON.stringify(updatedCampaign)),
            message: "کمپین با موفقیت به‌روزرسانی شد",
        };
    } catch (error) {
        // Log the error for debugging purposes and return a generic error message.
        // console.error(error);
        return {
            error: "خط در به‌روزرسانی کمپین",
        };
    }
}
export default updateCampaignBySlug;
