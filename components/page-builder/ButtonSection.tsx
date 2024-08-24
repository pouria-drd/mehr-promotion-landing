import { LnkButton } from "../ui";
import { SectionData } from "@/types/CampaignDocument";

interface ButtonSectionProps {
    section: SectionData;
    campaignSlug: string;
}

const ButtonSection = ({ section, campaignSlug }: ButtonSectionProps) => {
    return (
        <section
            id={section.sectionId}
            className="flex flex-row-reverse items-center justify-between gap-4">
            {Array.isArray(section.content) &&
                section.content.map((button, btnIndex) => {
                    const link = button.action.startsWith("blank:")
                        ? button.action.replace("blank:", "")
                        : `/${campaignSlug}/#${button.action}`;

                    return (
                        <LnkButton
                            target={
                                button.action.startsWith("blank:")
                                    ? "_blank"
                                    : "_self"
                            }
                            href={link}
                            key={btnIndex}
                            className="w-full"
                            variant={
                                button.type === "filled" ? "filled" : "outlined"
                            }>
                            {button.name}
                        </LnkButton>
                    );
                })}
        </section>
    );
};

export default ButtonSection;
