"use client";

import { Button } from "../../ui";
import { SectionData } from "@/types/CampaignDocument";
import { BinIcon, ChevronUpIcon } from "@/components/icons";
import {
    BannerBuilder,
    ButtonsBuilder,
    HeaderBuilder,
    MoreInfoBuilder,
    SectionSelector,
    VideoBuilder,
} from "@/components/campaign-builder";

interface CampaignSectionsProps {
    sections: SectionData[];
    handleMoveSection: (index: number, direction: "up" | "down") => void;
    handleRemoveSection: (index: number) => void;
    handleSectionChange: (
        index: number,
        key: keyof SectionData,
        value: any
    ) => void;
    handleAddSection: () => void;
    isEditing: boolean;
}

const CampaignSections = (props: CampaignSectionsProps) => {
    return (
        <div className="flex flex-col justify-between gap-4 h-full border p-4">
            <h3 className="text-right text-xl">سکشن‌ها</h3>
            <div className="flex flex-col gap-10 max-h-60 overflow-auto p-2">
                {props.sections.map((section, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 border even:bg-slate-50 odd:bg-neutral-50 rounded-lg p-2">
                        <div className="flex items-end justify-center gap-4">
                            <div className="flex flex-col items-end gap-2">
                                {props.isEditing &&
                                    props.sections.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    props.handleMoveSection(
                                                        index,
                                                        "up"
                                                    )
                                                }
                                                disabled={index === 0}
                                                className="text-ada-primary cursor-pointer">
                                                <ChevronUpIcon />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    props.handleMoveSection(
                                                        index,
                                                        "down"
                                                    )
                                                }
                                                disabled={
                                                    index ===
                                                    props.sections.length - 1
                                                }
                                                className="text-ada-primary cursor-pointer">
                                                <ChevronUpIcon className="rotate-180" />
                                            </button>
                                        </>
                                    )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        props.handleRemoveSection(index)
                                    }
                                    className="text-red-500 hover:text-red-600 transition-all">
                                    <BinIcon />
                                </button>
                            </div>
                            <SectionSelector
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        </div>
                        {section.type === "banner" && (
                            <BannerBuilder
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        )}
                        {section.type === "header" && (
                            <HeaderBuilder
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        )}
                        {section.type === "buttons" && (
                            <ButtonsBuilder
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        )}
                        {section.type === "moreInfo" && (
                            <MoreInfoBuilder
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        )}
                        {section.type === "video" && (
                            <VideoBuilder
                                section={section}
                                index={index}
                                onChange={props.handleSectionChange}
                            />
                        )}
                    </div>
                ))}
            </div>
            <Button
                type="button"
                onClick={props.handleAddSection}
                variant="outlined">
                افزودن سکشن
            </Button>
        </div>
    );
};

export default CampaignSections;
