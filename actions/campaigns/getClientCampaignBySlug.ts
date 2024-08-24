"use server";

import connectDB from "@/lib/mongodb";
import { CampaignModel } from "@/models/Campaign";

/**
 * Retrieves a campaign from the database based on the provided slug.
 *
 * This function connects to the MongoDB database, searches for a campaign
 * by its slug, and returns the campaign data if found. If the campaign
 * is not found or an error occurs, an appropriate error message is returned.
 *
 * @param {string} _slug - The slug of the campaign to retrieve.
 *
 * @returns {Promise<object>} An object containing either the campaign data or an error message.
 *
 * @example
 * const result = await getClientCampaignBySlug('example-slug');
 * if (result.error) {
 *     console.error(result.error);
 * } else {
 *     console.log(result.data);
 * }
 */
export default async function getClientCampaignBySlug(_slug: string) {
    try {
        // Establish a connection to the MongoDB database.
        await connectDB();

        // Retrieve the campaign from the database using the provided slug.
        const campaign = await CampaignModel.findOne({ slug: _slug });

        // Check if the campaign was found.
        if (!campaign) {
            return {
                error: "کمپین یافت نشد", // "Campaign not found"
            };
        }

        // Return the retrieved campaign data in a JSON-serializable format.
        return {
            data: JSON.parse(JSON.stringify(campaign)),
            message: "کمپین با موفقیت دریافت شد", // "Campaign retrieved successfully"
        };
    } catch (e) {
        // Log the error for debugging purposes and return a generic error message.
        // console.log(e);
        return {
            error: "خط در دریافت کمپین", // "Error retrieving campaign"
        };
    }
}
