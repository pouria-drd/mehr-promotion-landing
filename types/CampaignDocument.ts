import { Document, Types } from "mongoose";

export enum SectionTypeEnum {
    video = "video",
    banner = "banner",
    header = "header",
    buttons = "buttons",
    moreInfo = "moreInfo",
}
export type SectionType = keyof typeof SectionTypeEnum;

export interface Button {
    name: string;
    action: string;
}

export interface SectionData {
    sectionId?: string;
    title?: string;
    type: SectionType;
    order: number;
    content?:
        | { name: string; action: string; type: "filled" | "outlined" }[]
        | string
        | ArrayBuffer
        | any;
}

export interface CampaignData {
    name: string;
    slug: string;
    backgroundColor: string;
    sections: SectionData[];
}

export interface CampaignCreationDocument extends Document {
    name: string;
    slug: string;
    backgroundColor: string;
    sections: SectionData[];
    user: Types.ObjectId; // Reference to the User model's ObjectId
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
