import { Input } from "../ui";
import { ChangeEvent } from "react";
import { SectionData } from "@/types/CampaignDocument";

interface HeaderBuilderProps {
    section: SectionData;
    index: number;
    onChange: (index: number, key: keyof SectionData, value: any) => void;
}

const HeaderBuilder = (props: HeaderBuilderProps) => {
    return (
        <div className="flex flex-col gap-2 r2l">
            <Input
                type="text"
                placeholder="سکشن ID"
                value={props.section.sectionId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "sectionId", e.target.value)
                }
            />

            <Input
                required
                type="text"
                placeholder="تیتر"
                value={props.section.title || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "title", e.target.value)
                }
            />

            <Input
                required
                type="text"
                placeholder="محتوا"
                value={props.section.content as string}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "content", e.target.value)
                }
            />
        </div>
    );
};

export default HeaderBuilder;
