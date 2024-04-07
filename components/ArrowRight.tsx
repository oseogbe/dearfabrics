"use client"

import { FaArrowRight } from 'react-icons/fa6'

interface ArrowRightProps {
    onClick: () => void
}

const ArrowRight: React.FC<ArrowRightProps> = ({
    onClick
}) => {
    return (
        <div onClick={onClick} className="w-6 h-6 md:w-9 md:h-9 xl:w-12 xl:h-12 bg-df-gray flex items-center justify-center rounded-full cursor-pointer">
            <FaArrowRight className="text-sm md:text-[18px] xl:text-[22px]" />
        </div>
    )
}

export default ArrowRight