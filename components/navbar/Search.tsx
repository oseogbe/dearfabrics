"use client"

import { useCallback, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useOnClickOutside from "use-onclickoutside"

import { IoSearch } from "react-icons/io5"

const Search = () => {
    const searchParams = useSearchParams()
    // const pathname = usePathname()
    const { replace } = useRouter()

    // const handleSearch = useDebouncedCallback((term) => {
    //     const params = new URLSearchParams(searchParams)
    //     if (term) {
    //         params.set('query', term)
    //     } else {
    //         params.delete('query')
    //     }
    //     replace(`${pathname}?${params.toString()}`)
    // }, 300)

    const handleChange = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const term = e.currentTarget.value;
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`/search-results?${params.toString()}`);
        }
    }

    return (
        <div>
            <div className="hidden xl:block relative">
                <input
                    type="search"
                    className="w-80 ps-14 pe-5 py-3 bg-[#F6F6F6] text-[#807D7E] rounded-lg border-none focus:ring-0 focus-visible:outline-none"
                    placeholder="Search"
                    onChange={(e) => {
                        handleChange(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    defaultValue={searchParams.get('query')?.toString()}
                />

                <IoSearch className="absolute top-3.5 left-5 w-5 h-5 text-[#807D7E]" />
            </div>
            <MobileSearch />
        </div>
    )
}

const MobileSearch = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    useOnClickOutside(ref, () => setIsOpen(false))

    const handleChange = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const term = e.currentTarget.value;
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`/search-results?${params.toString()}`);
        }
    }

    return (
        <div ref={ref} className="">
            <div
                className="xl:hidden p-3 bg-[#F6F6F6] rounded-lg cursor-pointer"
                onClick={toggleOpen}
            >
                <IoSearch className="w-4 h-4 text-[#807D7E]" />
            </div>
            {isOpen && (
                <div
                    className="
                        bg-white 
                        text-sm
                        absolute
                        top-32
                        left-1/2
                        -translate-x-1/2
                        w-[90%]
                        rounded-xl 
                        shadow-md 
                        overflow-hidden 
                    "
                >
                    <div className="">
                        <div className="relative">
                            <IoSearch className="absolute top-3.5 left-3.5 h-5 w-5 text-gray-900" />
                            <input
                                type="search"
                                className="w-full py-3 px-4 pl-10 text-gray-900 rounded-lg border-none focus:ring-0 focus-visible:outline-none"
                                placeholder="What are you looking for?"
                                onChange={(e) => {
                                    handleChange(e.target.value)
                                }}
                                onKeyDown={handleKeyDown}
                                defaultValue={searchParams.get('query')?.toString()}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search