"use client";

import { Button, Input } from "../../ui";
import { useCampaignForm } from "@/hooks";
import CampaignSections from "./CampaignSections";

interface CampaignFormProps {
    slug?: string;
}

const CampaignForm = (props: CampaignFormProps) => {
    const {
        isLoading,
        isSubmitting,
        error,
        name,
        setName,
        isActive,
        setIsActive,
        sections,
        backgroundColor,
        setBackgroundColor,
        currentSlug,
        handleSubmit,
        handleSlugChange,
        handleAddSection,
        handleMoveSection,
        handleSectionChange,
        handleRemoveSection,
    } = useCampaignForm({ slug: props.slug });

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-full">
                Loading...
            </div>
        );

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg shadow-xl container border
            grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 sm:h-[450px]">
            <CampaignSections
                sections={sections}
                isEditing={!props.slug}
                handleMoveSection={handleMoveSection}
                handleRemoveSection={handleRemoveSection}
                handleSectionChange={handleSectionChange}
                handleAddSection={handleAddSection}
            />
            <div className="flex flex-col items-center justify-between gap-4 border p-4">
                <h1 className="text-right text-xl r2l w-full">
                    {props.slug ? `ویرایش ${name}` : "کمپین جدید"}
                </h1>

                <div className="flex flex-col items-center justify-between gap-8 w-full">
                    {error && (
                        <p className="text-red-500 text-center text-sm">
                            {error}
                        </p>
                    )}
                    <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex itce items-center justify-between gap-2 w-full">
                            <Input
                                type="color"
                                id="backgroundColor"
                                name="backgroundColor"
                                className="w-full"
                                value={backgroundColor || "#FFFFFF"}
                                onChange={(e) =>
                                    setBackgroundColor(e.target.value)
                                }
                            />

                            <label
                                className="text-center w-full cursor-pointer"
                                htmlFor="backgroundColor">
                                رنگ پس زمینه
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <input
                                id="isActive"
                                type="checkbox"
                                className="size-4 cursor-pointer"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                            <label
                                htmlFor="isActive"
                                className="cursor-pointer text-lg r2l">
                                فعال:
                            </label>
                        </div>
                    </div>
                    <Input
                        required
                        type="text"
                        value={name || ""}
                        className="r2l w-full"
                        placeholder="نام کمپین"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        required
                        type="text"
                        className="w-full"
                        placeholder="نام لینک"
                        disabled={!!props.slug}
                        value={currentSlug || ""}
                        onChange={handleSlugChange}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full">
                    {isSubmitting
                        ? "لطفا صبر کنید..."
                        : props.slug
                        ? "بروزرسانی"
                        : "ایجاد"}
                </Button>
            </div>
        </form>
    );
};

export default CampaignForm;
