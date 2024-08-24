import { SectionData } from "@/types/CampaignDocument";
import {
    BannerSection,
    ButtonSection,
    HeaderSection,
    VideoSection,
} from "@/components/page-builder";

interface SectionManagerProps {
    section: SectionData;
    campaignSlug: string;
}

const SectionManager = (props: SectionManagerProps) => {
    if (props.section.type === "banner") {
        return (
            <BannerSection
                sectionId={props.section.sectionId}
                imageUrl={props.section.content}
                buttons={props.section.content.buttons}
            />
        );
    }

    if (props.section.type === "header") {
        return (
            <HeaderSection
                sectionId={props.section.sectionId}
                title={props.section.title!}
                content={props.section.content}
            />
        );
    }

    if (props.section.type === "buttons") {
        return (
            <ButtonSection
                section={props.section}
                campaignSlug={props.campaignSlug}
            />
        );
    }

    if (props.section.type === "video") {
        return (
            <VideoSection
                src={props.section.content}
                sectionId={props.section.sectionId}
            />
        );
    }
};

export default SectionManager;
