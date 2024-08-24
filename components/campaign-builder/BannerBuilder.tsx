"use client";

import { Input } from "../ui";
import { ChangeEvent, useState } from "react";
import { SectionData } from "@/types/CampaignDocument";

interface BannerBuilderProps {
    index: number;
    section: SectionData;
    onChange: (index: number, key: keyof SectionData, value: any) => void;
}

const BannerBuilder = (props: BannerBuilderProps) => {
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(props.section.content || null);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                props.onChange(props.index, "content", base64String);
            };

            reader.onerror = () => {
                setError("Error reading the image file");
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Input
                type="text"
                placeholder="سکشن ID"
                value={props.section.sectionId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "sectionId", e.target.value)
                }
            />
            <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={props.section.content ? false : true}
            />
            {error && <p className="text-red-500">{error}</p>}
            {imagePreview && (
                <img
                    className="aspect-auto"
                    src={imagePreview as string}
                    alt="Banner Preview"
                />
            )}
        </>
    );
};

export default BannerBuilder;
