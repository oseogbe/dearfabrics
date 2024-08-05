"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import Container from "./Container"
import Announcement from "./navbar/Announcement"
import Logo from "./navbar/Logo"
import Search from "./navbar/Search"
import AccountButton from "./navbar/AccountButton"
import CartButton from "./navbar/CartButton"

interface NavbarProps {
    currentUser?: null
    menuItems: {
        name: string
        slug: string
    }[]
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    menuItems
}) => {
    const pathname = usePathname()

    return (
        <div className="fixed top-0 w-full bg-white z-20 shadow-sm">
            <Announcement />
            <div className="py-4 border-b">
                <Container>
                    <div
                        className="flex flex-row items-center justify-between gap-3 md:gap-0"
                    >
                        <Logo />
                        <ul className="hidden xl:flex gap-8">
                            {
                                menuItems.map(item => (
                                    <Link
                                        key={item.name}
                                        href={`/collections/${item.slug}`}
                                        className={cn(
                                            "cursor-pointer transition-all duration-300 hover:text-df-yellow",
                                            pathname === `/collections/${item.slug}` && 'text-df-yellow'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </ul>
                        <div className="flex flex-row items-center gap-3 xl:gap-9">
                            <Suspense>
                                <Search />
                            </Suspense>
                            <div className="flex flex-row gap-3">
                                <AccountButton />
                                <CartButton />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar