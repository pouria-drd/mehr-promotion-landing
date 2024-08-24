import mongoose, { Schema } from "mongoose";
import {
    CampaignCreationDocument,
    SectionTypeEnum,
} from "@/types/CampaignDocument";

const CampaignSchema = new Schema<CampaignCreationDocument>(
    {
        name: { type: String, required: true },

        slug: {
            type: String,
            unique: true,
        },
        sections: [
            {
                sectionId: { type: String, required: false },
                title: { type: String, required: false },
                type: {
                    type: String,
                    enum: SectionTypeEnum,
                    required: true,
                },
                order: { type: Number, required: true },
                content: { type: mongoose.Schema.Types.Mixed, required: false },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        backgroundColor: {
            type: String,
            default: "#FFFFFF",
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

CampaignSchema.index({ name: "text", slug: "text" }); // Add this line for text indexing

export const CampaignModel =
    mongoose.models.CampaignModel ||
    mongoose.model("CampaignModel", CampaignSchema);
