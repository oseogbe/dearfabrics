"use client"

import React, { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import Container from "./Container"
import Announcement from "./navbar/Announcement"
import Logo from "./navbar/Logo"
import Search from "./navbar/Search"
import AccountMenu from "./navbar/AccountMenu"
import CartButton from "./navbar/CartButton"
import MobileMenu from "./navbar/MobileMenu"

interface NavbarProps {
    currentUser?: null
    menuItems: {
        name: string
        slug: string
    }[]
}

const navLinks = [
    {
        label: "Fabrics",
        children: [
            {
                label: "Lace",
                link: "/collections/fabrics/lace",
                info: ""
            },
            {
                label: "Aso-Oke",
                link: "/collections/fabrics/aso-oke",
                info: ""
            },
            {
                label: "Ankara",
                link: "/collections/fabrics/ankara",
                info: ""
            },
            {
                label: "Plain",
                link: "/collections/fabrics/plain",
                info: ""
            },
            {
                label: "Sample",
                link: "/collections/fabrics/sample",
                info: ""
            },
            {
                label: "Traditional",
                link: "/collections/fabrics/traditional",
                info: ""
            },
            {
                label: "Georgewrapper",
                link: "/collections/fabrics/georgewrapper",
                info: ""
            },
            {
                label: "Siffon/Silk",
                link: "/collections/fabrics/siffon-silk",
                info: ""
            },
            {
                label: "Cotton",
                link: "/collections/fabrics/cotton",
                info: ""
            },
        ]
    },
    {
        label: "Women",
        children: [
            {
                label: "Ready to Wear",
                link: "/collections/women/ready-to-wear",
                info: ""
            },
            {
                label: "Bags",
                link: "/collections/women/bags",
                info: ""
            },
            {
                label: "Skirts",
                link: "/collections/women/skirts",
                info: ""
            },
            {
                label: "Jeans",
                link: "/collections/women/jeans",
                info: ""
            },
            {
                label: "Perfumes",
                link: "/collections/women/perfumes",
                info: ""
            },
            {
                label: "Shoes",
                link: "/collections/women/shoes",
                info: ""
            },
            {
                label: "Slippers / Scandal",
                link: "/collections/women/slippers-scandal",
                info: ""
            },
            {
                label: "Belts",
                link: "/collections/women/belts",
                info: ""
            },
            {
                label: "Accessories",
                link: "/collections/women/accessories",
                info: ""
            },
        ]
    },
    {
        label: "Men",
        children: [
            {
                label: "Brocade",
                link: "/collections/men/brocade",
                info: ""
            },
            {
                label: "Shadda",
                link: "/collections/men/shadda",
                info: ""
            },
            {
                label: "Lace",
                link: "/collections/men/lace",
                info: ""
            },
            {
                label: "Cotton",
                link: "/collections/men/cotton",
                info: ""
            },
            {
                label: "T-Shirt",
                link: "/collections/men/t-shirt",
                info: ""
            },
            {
                label: "Trousers",
                link: "/collections/men/trousers",
                info: ""
            },
            {
                label: "Jeans",
                link: "/collections/men/jeans",
                info: ""
            },
        ]
    },
    {
        label: "Jewelry",
        children: [
            {
                label: "Necklaces",
                link: "/collections/jewelry/necklaces",
                info: ""
            },
            {
                label: "Bracelets",
                link: "/collections/jewelry/bracelets",
                info: ""
            },
            {
                label: "Earrings",
                link: "/collections/jewelry/earrings",
                info: ""
            },
            {
                label: "Rings",
                link: "/collections/jewelry/rings",
                info: ""
            },
            {
                label: "Complete Set",
                link: "/collections/jewelry/complete-set",
                info: ""
            },
        ]
    },
    {
        label: "Kids",
        link: "#"
    },
]

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    menuItems
}) => {
    const pathname = usePathname()

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="fixed top-0 w-full bg-white z-20 shadow-sm">
            <Announcement />
            <div className="py-4 border-b">
                <Container>
                    <div
                        className="flex flex-row items-center justify-between gap-3 md:gap-0"
                    >
                        {/* <ul className="hidden xl:flex gap-8">
                            {
                                menuItems.map(item => (
                                    <Link
                                        key={item.name}
                                        href={`/collections/${item.slug}`}
                                        className={cn(
                                            "text-sm cursor-pointer transition-all duration-300 hover:text-df-yellow",
                                            pathname === `/collections/${item.slug}` && 'text-df-yellow'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </ul> */}
                        <div className="flex items-center">
                            <div className="flex items-center mr-9">
                                <MobileMenu />
                                <Logo />
                            </div>
                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList>
                                    {navLinks.map((item) => (
                                        <NavigationMenuItem className="text-gray-900" key={item.label}>
                                            {item.link ? (
                                                <Link href={item.link} legacyBehavior passHref>
                                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                        {item.label}
                                                    </NavigationMenuLink>
                                                </Link>
                                            ) : (
                                                <>
                                                    <NavigationMenuTrigger>
                                                        {item.label}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                            {item.children &&
                                                                item.children.map((child) => (
                                                                    <ListItem
                                                                        key={child.label}
                                                                        title={child.label}
                                                                        href={child.link}
                                                                    >
                                                                        {child.info}
                                                                    </ListItem>
                                                                ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="flex flex-row items-center gap-3 xl:gap-9">
                            <Suspense>
                                <Search />
                            </Suspense>
                            <div className="flex flex-row gap-3">
                                <AccountMenu />
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

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"