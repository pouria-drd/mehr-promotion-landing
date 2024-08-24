import Link from "next/link";
import { BackIcon } from "@/components/icons";

interface NavbarProps {
    title: string;
    backLink: string;
}
const Navbar = (props: NavbarProps) => {
    return (
        <nav className="bg-white sticky top-0 flex items-center justify-center p-4 z-10">
            <Link
                href={props.backLink}
                className="absolute right-4 transition-colors text-ada-neutral-5 hover:text-ada-neutral-0">
                <BackIcon />
            </Link>

            <h3 className="text-center text-ada-neutral-10 font-bold mx-auto">
                {props.title}
            </h3>
        </nav>
    );
};

export default Navbar;
