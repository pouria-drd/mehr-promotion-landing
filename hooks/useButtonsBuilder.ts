import { useCallback } from "react";
import { SectionData } from "@/types/CampaignDocument";

/**
 * Represents the possible types of a button.
 * - `filled`: A button with a filled background.
 * - `outlined`: A button with only an outline and no filled background.
 */
export type ButtonType = "filled" | "outlined";

/**
 * Interface representing the properties of a button in the ButtonsBuilder.
 */
export interface ButtonProps {
    /** The display name of the button */
    name: string;

    /** The action URL or handler associated with the button */
    action: string;

    /** The type of the button, either "filled" or "outlined" */
    type: ButtonType;
}

/**
 * A custom hook for managing and updating button data within a section.
 *
 * @param section - The current section data where the buttons are located.
 * @param index - The index of the section within the document.
 * @param onChange - A callback function to handle changes in the section data.
 * @returns An object containing handlers for adding, removing, and updating button properties.
 */
const useButtonsBuilder = (
    section: SectionData,
    index: number,
    onChange: (index: number, key: keyof SectionData, value: any) => void
) => {
    /**
     * Adds a new button to the section content if the number of buttons is less than 2.
     *
     * @advanced
     * The maximum number of buttons allowed is 2.
     */
    const handleAddButton = useCallback(() => {
        const currentButtons = section.content as ButtonProps[];

        if (currentButtons.length >= 2) {
            return; // Prevent adding more than 2 buttons
        }

        const updatedButtons = [
            ...currentButtons,
            { name: "", action: "", type: "filled" }, // Default button properties
        ];
        onChange(index, "content", updatedButtons);
    }, [section.content, index, onChange]);

    /**
     * Removes a button from the section content.
     *
     * @param btnIndex - The index of the button to remove.
     *
     * @advanced
     * This function is useful for dynamically removing a button from the UI.
     */
    const handleRemoveButton = useCallback(
        (btnIndex: number) => {
            const updatedButtons = (section.content as ButtonProps[]).filter(
                (_, i) => i !== btnIndex
            );
            onChange(index, "content", updatedButtons);
        },
        [section.content, index, onChange]
    );

    /**
     * Updates the type of a specific button in the section content.
     *
     * @param btnIndex - The index of the button to update.
     * @param type - The new type for the button, either "filled" or "outlined".
     */
    const handleButtonTypeChange = useCallback(
        (btnIndex: number, type: ButtonType) => {
            const updatedButtons = (section.content as ButtonProps[]).map(
                (button, i) => (i === btnIndex ? { ...button, type } : button)
            );
            onChange(index, "content", updatedButtons);
        },
        [section.content, index, onChange]
    );

    /**
     * Updates a specific property of a button in the section content.
     *
     * @param btnIndex - The index of the button to update.
     * @param key - The property of the button to update, either "name" or "action".
     * @param value - The new value to assign to the specified property.
     */
    const handleBtnInputChange = useCallback(
        (btnIndex: number, key: keyof ButtonProps, value: string) => {
            const updatedButtons = (section.content as ButtonProps[]).map(
                (button, i) =>
                    i === btnIndex ? { ...button, [key]: value } : button
            );
            onChange(index, "content", updatedButtons);
        },
        [section.content, index, onChange]
    );

    return {
        handleAddButton,
        handleRemoveButton,
        handleButtonTypeChange,
        handleBtnInputChange,
    };
};

export default useButtonsBuilder;
