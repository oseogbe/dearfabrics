"use client"

import { useSearchParams } from "next/navigation"
import { IoSearch } from "react-icons/io5"

const Search = () => {
    const params = useSearchParams()

    return (
        <div>
            <div className="hidden xl:block relative">
                <input
                    type="search"
                    className="w-80 ps-14 pe-5 py-3 bg-[#F6F6F6] text-[#807D7E] rounded-lg focus-visible:outline-none"
                    placeholder="Search"
                />

                <IoSearch className="absolute top-3.5 left-5 w-5 h-5 text-[#807D7E]" />
            </div>
            <div
                className="xl:hidden p-3 bg-[#F6F6F6] rounded-lg cursor-pointer"
                onClick={() => { }}
            >
                <IoSearch className="w-4 h-4 text-[#807D7E]" />
            </div>
        </div>
    )
}

export default Search