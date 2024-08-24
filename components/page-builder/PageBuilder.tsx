import SectionManager from "./SectionManager";
import { CampaignData } from "@/types/CampaignDocument";
import { MoreInfoSection } from "@/components/page-builder";

interface PageBuilderProps {
    campaign: CampaignData;
}

const PageBuilder = (props: PageBuilderProps) => {
    // Extract expandable-info sections
    const expandableSections = props.campaign.sections.filter(
        (section) => section.type === "moreInfo"
    );

    // Extract other sections
    const otherSections = props.campaign.sections.filter(
        (section) => section.type !== "moreInfo"
    );

    return (
        <main
            style={{ backgroundColor: props.campaign.backgroundColor }}
            className="flex flex-col gap-8 p-4">
            {/* Render other sections */}
            {otherSections.map((section, index) => (
                <SectionManager
                    campaignSlug={props.campaign.slug}
                    section={section}
                    key={index}
                />
            ))}

            {/* Render expandable-info sections with a single title */}
            {expandableSections.length > 0 && (
                <div className="flex flex-col gap-8">
                    <h2 className="text-ada-neutral-10 text-lg text-right font-bold">
                        سوالات متداول
                    </h2>

                    <MoreInfoSection items={expandableSections} />
                </div>
            )}
        </main>
    );
};

export default PageBuilder;
