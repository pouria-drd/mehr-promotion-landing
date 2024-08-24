import { Button } from "@/components/ui"; // Import your Button component

interface BannerSectionProps {
    sectionId?: string;
    imageUrl: string; // URL for the banner image
    buttons?: Array<{
        text: string;
        type: "filled" | "outlined";
        href: string; // URL for the button link
        onClick: () => void; // Function to handle button click
    }>;
}

const BannerSection = (props: BannerSectionProps) => {
    return (
        <section id={props.sectionId} className="relative">
            {/* Banner Image */}
            <img
                src={props.imageUrl}
                alt="Banner"
                className="size-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex gap-4">
                {props.buttons?.map((button, index) => (
                    <Button
                        key={index}
                        variant={button.type}
                        onClick={button.onClick}>
                        {button.text}
                    </Button>
                ))}
            </div>
        </section>
    );
};

export default BannerSection;
