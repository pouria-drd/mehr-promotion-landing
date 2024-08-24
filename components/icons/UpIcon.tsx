import { IconProps } from ".";
import { cn } from "@/lib/utils";

const UpIcon = (props: IconProps) => {
    return (
        <svg
            viewBox="0 0 12 8"
            fill="none"
            className={cn("w-3 h-2", props.className)}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6 0L0 6L1.41 7.41L6 2.83L10.59 7.41L12 6L6 0Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default UpIcon;
