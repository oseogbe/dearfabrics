"use client"

import { IconType } from "react-icons"
import clsx from "clsx"

interface ButtonProps {
    label: string
    type?: "primary" | "secondary" | "outline"
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    icon?: IconType
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    label,
    type = "primary",
    onClick,
    icon: Icon,
    disabled
}) => {
    return (
        <button
            className={
                clsx("w-full text-xs md:text-sm font-light uppercase p-4 flex items-center justify-center gap-4",
                    {
                        "bg-black text-white": type === "primary",
                        "bg-[#dddddd] text-black": type === "secondary",
                        "border border-black": type === "outline"
                    }
                )
            }
            onClick={onClick}
            disabled={disabled}
        >
            {label}
            {Icon && (
                <Icon
                    className="text-[12px] md:text-[16px]"
                />
            )}
        </button>
    )
}

export default Button