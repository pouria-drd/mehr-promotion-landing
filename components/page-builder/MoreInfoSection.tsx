import { MoreInfoDropdown } from "../ui";
import { SectionData } from "@/types/CampaignDocument";

interface InfoSectionProps {
    items: SectionData[];
}

const MoreInfoSection = (props: InfoSectionProps) => {
    return (
        <section className="flex flex-col gap-4">
            {props.items.map((item, index) => (
                <div key={index}>
                    <MoreInfoDropdown
                        title={item.title!}
                        content={item.content}
                    />
                    {index < props.items.length - 1 && (
                        <hr className="my-4 border-t border-ada-neutral-80" />
                    )}
                </div>
            ))}
        </section>
    );
};

export default MoreInfoSection;
