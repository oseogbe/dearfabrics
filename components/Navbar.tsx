"use client"

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
    const menuItems = [
        {
            label: "Fabrics",
            link: ""
        },
        {
            label: "Accessories",
            link: ""
        },
        {
            label: "Men Fashion",
            link: ""
        },
        {
            label: "Dresses",
            link: ""
        },
        {
            label: "Sunglasses",
            link: ""
        },
        {
            label: "Shoes",
            link: ""
        },
        {
            label: "Bags",
            link: ""
        },
        {
            label: "Kids",
            link: ""
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
                                    <li key={item.label} className="cursor-pointer transition-all duration-300 hover:text-df-yellow">{item.label}</li>
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