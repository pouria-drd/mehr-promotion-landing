"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { CampaignModel } from "@/models/Campaign";

/**
 * Deletes a campaign from the database by its slug.
 *
 * This server action requires the user to be authenticated and have admin privileges.
 *
 * @param {string} props.slug - The slug of the campaign to delete.
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the deleted campaign,
 * or an error message.
 *
 * @example
 * const result = await deleteCampaign({ slug: "my-campaign" });
 *
 * if ('error' in result) {
 *     console.error(result.error);
 * } else {
 *     console.log(result.data); // The deleted campaign
 * }
 *
 * @throws {Error} If there is a failure in database connection or query execution.
 */
export default async function deleteCampaignBySlug(_slug: string) {
    // Get the session information to validate the user's authentication status and role.
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and is an admin. If not, return an "Unauthorized" error.
    if (!session || session.user.role !== "admin") {
        return {
            error: "فقط ادمین می‌تواند کمپین‌ها را حذف کنند",
        };
    }

    try {
        // Establish a connection to the MongoDB database.
        await connectDB();

        // Delete the campaign from the database.

        const deletedCampaign = await CampaignModel.findOneAndDelete({
            slug: _slug,
        });

        if (!deletedCampaign) {
            return {
                error: "کمپین یافت نشد",
            };
        }

        // Revalidate the "/admin" page to remove the deleted campaign from the list.
        revalidatePath("/admin", "page");

        // Return a success message.
        return {
            data: {
                message: "کمپین با موقثیت حدف شد",
            },
        };
    } catch (e) {
        // Log the error for debugging purposes and return a generic error message.
        // console.log(e);
        return {
            error: "خط در حذف کمپین",
        };
    }
}
