"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "filled" | "outlined";
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { variant = "filled", className, ...restProps } = props;

    const baseClass =
        variant === "outlined"
            ? "outline outline-2 outline-ada-neutral-93 text-ada-primary hover:outline-none hover:text-ada-neutral-100 hover:bg-ada-primary"
            : "text-ada-neutral-100 bg-ada-primary hover:brightness-95";

    return (
        <button
            className={cn(
                baseClass,
                "disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all rounded-xl px-3 py-2 min-h-11 r2l",
                className
            )}
            {...restProps}
        />
    );
};

export default Button;
