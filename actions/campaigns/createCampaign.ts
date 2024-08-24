"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { CampaignModel } from "@/models/Campaign";
import { SectionData } from "@/types/CampaignDocument";

interface createCampaignData {
    name: string;
    slug: string;
    isActive: boolean;
    sections?: SectionData[];
    backgroundColor?: string;
}

/**
 * Creates a new campaign in the database.
 *
 * This server action requires the user to be authenticated and have admin privileges.
 *
 * @param {createCampaignData} props - The properties required to create a new campaign.
 * @param {string} props.name - The name of the campaign.
 * @param {string} props.slug - A unique slug for the campaign.
 * @param {boolean} props.isActive - A flag indicating whether the campaign is active.
 * @param {SectionData[]} props.sections - An array of sections that define the campaign's structure.
 *@param {string} props.backgroundColor - The background color of the campaign.
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the newly created campaign's data or an error message.
 *
 * @example
 * const result = await createCampaign({
 *   name: "New Campaign",
 *   slug: "new-campaign",
 *   backgroundColor: "#FFFFFF",
 *   sections: [
 *     {
 *       title: "Introduction",
 *       type: "header",
 *       order: 1,
 *       content: "Welcome to our new campaign!"
 *     },
 *     {
 *       sectionId: "banner-1",
 *       type: "banner",
 *       order: 2,
 *       content: "https://example.com/banner.jpg"
 *     }
 *   ],
 *   isActive: true
 * });
 *
 * if ('error' in result) {
 *   console.error(result.error);
 * } else {
 *   console.log(result.data); // Newly created campaign data
 *   console.log(result.message); // "Campaign created successfully"
 * }
 *
 * @throws {Error} If there is a failure in database connection or query execution.
 */
export default async function createCampaign(props: createCampaignData) {
    try {
        // Get the session information to validate the user's authentication status and role.
        const session = await getServerSession(authOptions);

        // Check if the user is authenticated and is an admin. If not, return an "Unauthorized" error.
        if (!session || session.user.role !== "admin") {
            return {
                error: "فقط ادمین می‌تواند کمپین‌ها را ایجاد کنند",
            };
        }

        const user = session.user;

        const { name, slug, sections, isActive, backgroundColor } = props;

        // Establish a connection to the MongoDB database.
        await connectDB();

        // Check if a campaign with the same slug already exists.
        const campaign = await CampaignModel.findOne({ slug });

        if (campaign) {
            return {
                error: "کمپین با این لینک قبلا وجود دارد",
            };
        }

        // Create a new campaign with the provided details.
        const newCampaign = new CampaignModel({
            name,
            slug,
            sections,
            isActive,
            user: user.id,
            backgroundColor,
        });

        // Save the newly created campaign to the database.
        await newCampaign.save();

        // Revalidate the "/admin" page to display the newly created campaign.
        revalidatePath("/admin", "page");

        return {
            data: JSON.parse(JSON.stringify(newCampaign)),
            message: "کمپین با موفقیت ایجاد شد",
        };
    } catch (error) {
        // Log the error for debugging purposes and return a generic error message.
        console.error(error);
        return {
            error: "خطا در ایجاد کمپین",
        };
    }
}
