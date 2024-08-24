interface HeaderSectionProps {
    title: string;
    content: string;
    sectionId?: string;
}

const HeaderSection = (props: HeaderSectionProps) => {
    return (
        <section id={props.sectionId}>
            <h1 className="text-ada-neutral-10 text-lg text-right font-bold">
                {props.title}
            </h1>
            <p className="text-ada-neutral-40 text-base text-justify mt-4 r2l font-normal">
                {props.content}
            </p>
        </section>
    );
};

export default HeaderSection;
