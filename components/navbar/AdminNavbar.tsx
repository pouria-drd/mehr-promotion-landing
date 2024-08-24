import { LnkButton } from "@/components/ui";

interface AdminNavbarProps {
    title: string;
    linkHref: string;
    children?: React.ReactNode;
    linkVariant?: "outlined" | "filled";
}

const HeaderWithButton = (props: AdminNavbarProps) => {
    return (
        <nav className="relative flex items-center justify-center w-full p-8 shadow-md">
            <h1 className="text-2xl sm:text-3xl">{props.title}</h1>
            <LnkButton
                href={props.linkHref}
                variant={props.linkVariant}
                className="absolute right-4 min-h-fit sm:right-8 text-xs sm:text-sm">
                {props.children}
            </LnkButton>
        </nav>
    );
};

export default HeaderWithButton;
