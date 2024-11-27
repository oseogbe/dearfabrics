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
import AccountButton from "./navbar/AccountButton"
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
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Aso-Oke",
                link: "/collections/fabrics/aso-oke",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Ankara",
                link: "/collections/fabrics/ankara",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Plain",
                link: "/collections/fabrics/plain",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
        ]
    },
    {
        label: "Men",
        children: [
            {
                label: "T-Shirt",
                link: "/collections/men/t-shirt",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Jeans",
                link: "/collections/men/jeans",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Shoes",
                link: "/collections/men/shoes",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Bags",
                link: "/collections/bags",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
        ]
    },
    {
        label: "Women",
        children: [
            {
                label: "Dresses",
                link: "/collections/women/dresses",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Tops",
                link: "/collections/women/tops",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Skirts",
                link: "/collections/women/skirts",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Perfumes",
                link: "/collections/women/perfumes",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Accessories",
                link: "/collections/women/accessories",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
        ]
    },
    {
        label: "Jewelries",
        children: [
            {
                label: "Necklaces",
                link: "/collections/jewelries/necklaces",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
            },
            {
                label: "Bracelets",
                link: "/collections/jewelries/bracelets",
                info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit nulla doloremque consequatur quae, odit voluptatem minus mollitia illum tenetur aliquam quaerat esse, omnis at quibusdam unde, inventore totam rerum."
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
                                    {
                                        navLinks.map(item => (
                                            <NavigationMenuItem key={item.label}>
                                                {
                                                    item.link ?
                                                        (
                                                            <NavigationMenuItem>
                                                                <Link href={item.link} legacyBehavior passHref>
                                                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                                        {item.label}
                                                                    </NavigationMenuLink>
                                                                </Link>
                                                            </NavigationMenuItem>
                                                        ) : (
                                                            <>
                                                                <NavigationMenuTrigger>
                                                                    {item.label}
                                                                </NavigationMenuTrigger>
                                                                <NavigationMenuContent>
                                                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                                        {
                                                                            item.children && item.children.map(child => (
                                                                                <ListItem
                                                                                    key={child.label}
                                                                                    title={child.label}
                                                                                    href={child.link}
                                                                                >
                                                                                    {child.info}
                                                                                </ListItem>
                                                                            ))
                                                                        }

                                                                    </ul>
                                                                </NavigationMenuContent>
                                                            </>
                                                        )
                                                }
                                            </NavigationMenuItem>
                                        ))
                                    }
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

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
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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