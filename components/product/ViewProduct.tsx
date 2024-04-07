"use client"

import { FaRegEye } from "react-icons/fa6"

interface ViewProductProps {

}

const ViewProduct: React.FC<ViewProductProps> = ({

}) => {
    return (
        <div className="bg-white p-4 rounded-full shadow-md cursor-pointer"><FaRegEye className="text-df-yellow" /></div>
    )
}

export default ViewProduct