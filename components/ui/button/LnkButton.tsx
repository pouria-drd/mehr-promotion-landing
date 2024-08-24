import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    className?: string;
    variant?: "filled" | "outlined";
}

const LnkButton = ({
    variant = "filled",
    className,
    href,
    ...restProps
}: LinkProps) => {
    const baseClass =
        variant === "outlined"
            ? "outline outline-2 outline-ada-neutral-93 text-ada-primary hover:outline-none hover:text-ada-neutral-100 hover:bg-ada-primary"
            : "text-ada-neutral-100 bg-ada-primary hover:brightness-95";

    return (
        <Link
            href={href}
            className={cn(
                baseClass,
                "transition-all text-center flex items-center justify-center rounded-xl px-3 py-2 min-h-11 r2l",
                className
            )}
            {...restProps}
        />
    );
};

export default LnkButton;
