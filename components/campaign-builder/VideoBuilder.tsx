import { Input } from "../ui";
import { ChangeEvent } from "react";
import { SectionData } from "@/types/CampaignDocument";

interface VideoBuilderProps {
    section: SectionData;
    index: number;
    onChange: (index: number, key: keyof SectionData, value: any) => void;
}

const VideoBuilder = (props: VideoBuilderProps) => {
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
                type="text"
                placeholder="لینک ویدئو"
                value={props.section.content as string}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "content", e.target.value)
                }
                required
            />
        </>
    );
};

export default VideoBuilder;
