"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDebouncedCallback } from 'use-debounce'

import { IoSearch } from "react-icons/io5"

const Search = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div>
            <div className="hidden xl:block relative">
                <input
                    type="search"
                    className="w-80 ps-14 pe-5 py-3 bg-[#F6F6F6] text-[#807D7E] rounded-lg border-none focus:ring-0 focus-visible:outline-none"
                    placeholder="Search"
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
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