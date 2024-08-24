import { AddIcon, BinIcon } from "../icons";
import { ChangeEvent } from "react";
import { Button, Input } from "../ui";
import { useButtonsBuilder } from "@/hooks";
import { SectionData } from "@/types/CampaignDocument";
import { ButtonProps, ButtonType } from "@/hooks/useButtonsBuilder";

interface ButtonsBuilderProps {
    section: SectionData;
    index: number;
    onChange: (index: number, key: keyof SectionData, value: any) => void;
}

const ButtonsBuilder = (props: ButtonsBuilderProps) => {
    const {
        handleAddButton,
        handleRemoveButton,
        handleButtonTypeChange,
        handleBtnInputChange,
    } = useButtonsBuilder(props.section, props.index, props.onChange);

    return (
        <div className="flex flex-col gap-2 border p-2">
            <div className="flex items-center justify-between gap-4 w-full">
                {(props.section.content as ButtonProps[]).length < 2 && (
                    <Button
                        className="px-2.5"
                        type="button"
                        onClick={handleAddButton}>
                        <AddIcon />
                    </Button>
                )}
                <label className="text-right text-ada-neutral-40 r2l">
                    دکمه ها:
                </label>
            </div>

            <Input
                type="text"
                placeholder="سکشن ID"
                value={props.section.sectionId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.index, "sectionId", e.target.value)
                }
            />

            {Array.isArray(props.section.content) &&
                (props.section.content as ButtonProps[]).map(
                    (button, btnIndex) => (
                        <div
                            key={btnIndex}
                            className="flex flex-col items-center gap-2 
                            bg-slate-50 border p-4 rounded-md">
                            <div className="flex items-center justify-between gap-4 w-full">
                                <select
                                    className="border border-gray-300 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm p-2 w-full"
                                    value={button.type}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) =>
                                        handleButtonTypeChange(
                                            btnIndex,
                                            e.target.value as ButtonType
                                        )
                                    }>
                                    <option value="filled">Filled</option>
                                    <option value="outlined">Outlined</option>
                                </select>

                                <label className="text-sm text-right text-ada-neutral-40 r2l">
                                    نوع:
                                </label>

                                {/* Button to remove a button */}
                                <span
                                    onClick={() => handleRemoveButton(btnIndex)}
                                    className="bg-transparent text-red-500 hover:text-red-600 cursor-pointer">
                                    <BinIcon />
                                </span>
                            </div>

                            <Input
                                required
                                className="w-full"
                                type="text"
                                placeholder="نام دکمه"
                                value={button.name || ""}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleBtnInputChange(
                                        btnIndex,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                            <Input
                                required
                                className="w-full"
                                type="text"
                                placeholder="سکشن ID و یا blank:برای صفحه جدید"
                                value={button.action || ""}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleBtnInputChange(
                                        btnIndex,
                                        "action",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    )
                )}
        </div>
    );
};

export default ButtonsBuilder;
