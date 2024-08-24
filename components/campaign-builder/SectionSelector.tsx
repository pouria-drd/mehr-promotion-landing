import { ChangeEvent } from "react";
import { SectionData, SectionType } from "@/types/CampaignDocument";

interface SectionSelectorProps {
    index: number;
    section: SectionData;
    onChange: (index: number, key: keyof SectionData, value: any) => void;
}

const SECTION_TYPE_LABELS: { [key in SectionType]: string } = {
    banner: "بنر",
    header: "سربرگ",
    buttons: "دکمه",
    video: "ویدیو",
    moreInfo: "اطلاعات بیشتر",
};

const SectionSelector = (props: SectionSelectorProps) => {
    return (
        <div className="flex flex-col gap-2 w-full r2l">
            <label className="block text-md font-medium text-gray-700">
                نوع:
            </label>
            <select
                value={props.section.type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    props.onChange(
                        props.index,
                        "type",
                        e.target.value as SectionType
                    )
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Object.keys(SECTION_TYPE_LABELS).map((type) => (
                    <option key={type} value={type}>
                        {SECTION_TYPE_LABELS[type as SectionType]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SectionSelector;
