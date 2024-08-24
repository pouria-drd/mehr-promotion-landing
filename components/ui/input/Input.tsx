"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = ({ className, ...restProps }: InputProps) => {
    const baseClass =
        "border border-ada-neutral-93 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ada-primary placeholder:text-sm rounded-xl px-3 py-2 min-h-11";

    return <input className={cn(baseClass, className)} {...restProps} />;
};

export default Input;
