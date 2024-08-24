import slugify from "slugify";
import { useRouter } from "next/navigation";
import { SectionData } from "@/types/CampaignDocument";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
    createCampaign,
    getCampaignBySlug,
    updateCampaignBySlug,
} from "@/actions/campaigns";

interface UseCampaignFormProps {
    slug?: string; // Optional slug for update mode
}

/**
 * A custom hook to manage the state and logic for a campaign form.
 *
 * This hook handles the creation and update of campaigns. It manages form state,
 * handles data fetching if a slug is provided (edit mode), and manages form submission logic.
 *
 * @param {UseCampaignFormProps} props - The properties for the hook.
 * @param {string} [props.slug] - Optional slug for editing an existing campaign.
 *
 * @returns {object} An object containing the form state and handlers for the campaign form.
 *
 * @example
 * const {
 *     isLoading,
 *     isSubmitting,
 *     error,
 *     name,
 *     setName,
 *     isActive,
 *     setIsActive,
 *     sections,
 *     currentSlug,
 *     handleSlugChange,
 *     handleAddSection,
 *     handleSectionChange,
 *     handleRemoveSection,
 *     handleMoveSection,
 *     handleSubmit,
 * } = useCampaignForm({ slug: 'example-slug' });
 */
const useCampaignForm = ({ slug }: UseCampaignFormProps) => {
    const router = useRouter();

    // State for tracking the loading status of the form.
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State for tracking the submission status of the form.
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // State for handling and displaying any errors that occur during the form process.
    const [error, setError] = useState<string | null | undefined>(null);

    // State for managing the campaign name.
    const [name, setName] = useState<string | null>();

    // State for managing the campaign background color.
    const [backgroundColor, setBackgroundColor] = useState<
        string | "#FFFFFF"
    >();

    // State for managing the activation status of the campaign.
    const [isActive, setIsActive] = useState<boolean>(true);

    // State for managing the sections of the campaign.
    const [sections, setSections] = useState<SectionData[]>([]);

    // State for managing the current slug (used in creation or edit mode).
    const [currentSlug, setCurrentSlug] = useState<string | null>();

    /**
     * Fetches the campaign data if a slug is provided.
     *
     * This effect is triggered when the `slug` changes, indicating either the component
     * is in edit mode, or the user navigated to a different campaign.
     */
    useEffect(() => {
        if (slug) {
            const fetchCampaign = async () => {
                setIsLoading(true);
                try {
                    const result = await getCampaignBySlug({ slug });

                    if (result.error) {
                        setError(result.error);
                        console.error(result.error);
                    } else if (result.data) {
                        // Populate the form with the fetched data.
                        setName(result.data.name);
                        setCurrentSlug(result.data.slug);
                        setSections(result.data.sections);
                        setIsActive(result.data.isActive);
                        setBackgroundColor(result.data.backgroundColor);
                    }
                } catch (error) {
                    setError("خطا در دریافت کمپین"); // "Error in fetching campaign"
                }
                setIsLoading(false);
            };
            fetchCampaign();
        }
    }, [slug]);

    /**
     * Generates a slug from the campaign name whenever the name changes.
     *
     * This effect only runs in creation mode (when `slug` is not provided).
     */
    useEffect(() => {
        if (!slug && name) {
            const generatedSlug = slugify(name, { lower: true, strict: true });
            setCurrentSlug(generatedSlug);
        }
    }, [name, slug]);

    /**
     * Handles the manual change of the slug by the user.
     *
     * This handler is only relevant in creation mode, where the slug can be modified.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The event triggered by the input change.
     */
    const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!slug) {
            setCurrentSlug(e.target.value);
        }
    };

    /**
     * Adds a new section to the campaign.
     *
     * Each section is added with a default type of "banner" and is appended to the end of the list.
     */
    const handleAddSection = () => {
        setSections([
            ...sections,
            {
                sectionId: "",
                title: "",
                type: "banner",
                order: sections.length + 1,
                content: "",
            },
        ]);
    };

    /**
     * Handles the update of a specific section.
     *
     * @param {number} index - The index of the section to update.
     * @param {keyof SectionData} key - The key of the section to update (e.g., type, content).
     * @param {any} value - The new value to assign to the section key.
     */
    const handleSectionChange = (
        index: number,
        key: keyof SectionData,
        value: any
    ) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], [key]: value };
        setSections(newSections);
    };

    /**
     * Removes a section from the campaign.
     *
     * @param {number} index - The index of the section to remove.
     */
    const handleRemoveSection = (index: number) => {
        const newSections = sections.filter((_, i) => i !== index);
        setSections(newSections);
    };

    /**
     * Moves a section up or down in the list.
     *
     * This handler swaps the section with its neighboring section, based on the direction.
     *
     * @param {number} index - The index of the section to move.
     * @param {"up" | "down"} direction - The direction to move the section ("up" or "down").
     */
    const handleMoveSection = (index: number, direction: "up" | "down") => {
        const newSections = [...sections];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        // Ensure the section cannot move out of bounds.
        if (targetIndex < 0 || targetIndex >= newSections.length) return;

        [newSections[index], newSections[targetIndex]] = [
            newSections[targetIndex],
            newSections[index],
        ];

        setSections(newSections);
    };

    /**
     * Resets the form to its initial state.
     *
     * This is typically called after a successful submission or to clear the form.
     */
    const resetForm = () => {
        setName(null);
        setSections([]);
        setCurrentSlug(null);
        setBackgroundColor("#FFFFFF");
    };

    /**
     * Handles errors that occur during form submission.
     *
     * The form is reset, and the error message is displayed to the user.
     *
     * @param {string} error - The error message to display.
     */
    const handleError = (error: string) => {
        resetForm();
        setError(error);
        setIsSubmitting(false);
    };

    /**
     * Handles the form submission.
     *
     * Depending on whether the `slug` is provided, it either creates a new campaign
     * or updates an existing one.
     *
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        // Validate the form input.
        if (!name || !currentSlug) {
            handleError("لطفا نام کمپین را وارد کنید"); // "Please enter the campaign name"
            return;
        }

        const campaignData = {
            name,
            sections,
            isActive,
            slug: currentSlug,
            backgroundColor,
        };

        try {
            const result = slug
                ? await updateCampaignBySlug(slug, campaignData)
                : await createCampaign(campaignData);

            if (result.error) {
                handleError(result.error);
                return;
            }

            resetForm();
            router.push("/admin");
        } catch (error) {
            handleError(slug ? "خطا در بروزرسانی کمپین" : "خطا در ایجاد کمپین"); // "Error updating campaign" or "Error creating campaign"
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isLoading,
        isSubmitting,
        error,
        name,
        isActive,
        sections,
        currentSlug,
        backgroundColor,
        setName,
        setIsActive,
        handleSubmit,
        handleSlugChange,
        handleAddSection,
        handleMoveSection,
        setBackgroundColor,
        handleSectionChange,
        handleRemoveSection,
    };
};

export default useCampaignForm;
