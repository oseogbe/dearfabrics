"use client"

import { useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import useOnClickOutside from "use-onclickoutside"

import MenuItem from "./MenuItem"

import { FiUser } from "react-icons/fi"

const AccountButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const currentUser = false

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    useOnClickOutside(ref, toggleOpen)

    return (
        <div className="relative">
            <div
                className="p-3 xl:p-4 bg-[#F6F6F6] rounded-lg cursor-pointer"
                onClick={toggleOpen}
            >
                <FiUser className="w-4 h-4 xl:w-5 xl:h-5 text-[#807D7E]" />
            </div>

            {isOpen &&
                <div
                    ref={ref}
                    className="
                        bg-white 
                        w-[200px]
                        text-sm
                        absolute
                        right-0 
                        top-14 
                        rounded-xl 
                        shadow-md 
                        overflow-hidden 
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="Orders"
                                    onClick={() => router.push('/orders')}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="Wishlist"
                                    onClick={() => router.push('/wishlist')}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="Account"
                                    onClick={() => router.push('/account')}
                                    className="font-semibold"
                                />
                                <hr />
                                <MenuItem
                                    label="Help Center"
                                    onClick={() => { }}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => { }}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={() => router.push('/login')}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={() => router.push('/signup')}
                                />
                            </>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountButton