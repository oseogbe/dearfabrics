"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectProps {
    options: string[]
}

const CustomSelect: React.FC<SelectProps> = ({
    options
}) => {
    return (
        <Select>
            <SelectTrigger className="w-28 md:w-[180px] h-8 md:h-10 text-gray-900 focus:ring-df-gray">
                <SelectValue placeholder="Default sorting" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CustomSelect