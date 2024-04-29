"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Container from "./Container"
import Announcement from "./navbar/Announcement"
import Logo from "./navbar/Logo"
import Search from "./navbar/Search"
import AccountButton from "./navbar/AccountButton"
import CartButton from "./navbar/CartButton"

interface NavbarProps {
    currentUser?: null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    const pathname = usePathname()

    const menuItems = [
        {
            label: "Fabrics",
            link: "/collections/fabrics"
        },
        {
            label: "Accessories",
            link: "/collections/accessories"
        },
        {
            label: "Men Fashion",
            link: "/collections/men-fashion"
        },
        {
            label: "Dresses",
            link: "/collections/dresses"
        },
        {
            label: "Sunglasses",
            link: "/collections/sunglasses"
        },
        {
            label: "Shoes",
            link: "/collections/shoes"
        },
        {
            label: "Bags",
            link: "/collections/bags"
        },
        {
            label: "Kids",
            link: "/collections/kids"
        },
    ]

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
                                        key={item.label}
                                        href={item.link}
                                        className={`
                                            cursor-pointer 
                                            transition-all 
                                            duration-300 
                                            hover:text-df-yellow
                                            ${pathname === item.link ? 'text-df-yellow' : ''}
                                        `}
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            }
                        </ul>
                        <div className="flex flex-row items-center gap-3 xl:gap-9">
                            <Search />
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