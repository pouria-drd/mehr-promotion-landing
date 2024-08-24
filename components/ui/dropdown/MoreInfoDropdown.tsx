"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UpIcon from "@/components/icons/UpIcon";

interface MoreInfoDropdownProps {
    title: string;
    content: string;
}

const MoreInfoDropdown = (props: MoreInfoDropdownProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    /**
     * Toggles the expanded state of the content.
     *
     * This function switches between showing a truncated version of the content
     * and showing the full content.
     */
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Determine the content to display based on the expanded state.
    const displayedContent = isExpanded
        ? props.content
        : props.content.slice(0, 92) + (props.content.length > 92 ? "..." : "");

    return (
        <div
            onClick={toggleExpand}
            className="flex flex-col gap-4 cursor-pointer">
            <div className="flex items-center justify-between">
                <button onClick={toggleExpand}>
                    <UpIcon
                        className={`transition-all text-ada-neutral-30 ${
                            isExpanded ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>
                <h2 className="text-ada-neutral-10 text-right font-bold">
                    {props.title}
                </h2>
            </div>
            <motion.div
                className="overflow-hidden"
                animate={{
                    height: isExpanded ? "auto" : "50px",
                }}>
                <p className="text-ada-neutral-40 text-justify r2l">
                    {displayedContent}
                </p>
            </motion.div>
        </div>
    );
};

export default MoreInfoDropdown;
