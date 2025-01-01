import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import Logo from "./Logo"

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

const MobileMenu = () => {
    return (
        <label className="md:hidden relative z-40 cursor-pointer pr-3" htmlFor="mobile-menu">
            <input className="peer hidden" type="checkbox" id="mobile-menu" />
            <div
                className="relative z-50 block h-[2px] w-5 bg-black bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-black before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-black after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"
            >
            </div>
            <div
                className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block"
            >
                &nbsp;
            </div>
            <div
                className="fixed top-0 left-0 z-40 h-full w-full -translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0"
            >
                <div className="float-left min-h-full w-[75%] bg-white text-gray-900 px-4 pt-12 shadow-2xl">
                    <div className="mt-7 ml-6"><Logo /></div>
                    <Accordion type="single" collapsible className="w-full mt-12 pl-6">
                        {navLinks.map((item) => (
                            <AccordionItem key={item.label} value={item.label}>
                                <AccordionTrigger>{item.label}</AccordionTrigger>
                                <AccordionContent>
                                    <menu className="pl-6 space-y-4">
                                        {item.children?.map((child) => (
                                            <li key={child.label}>
                                                <Link href={child.link} className="text-sm font-medium leading-none">{child.label}</Link>
                                            </li>
                                        ))}
                                    </menu>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </label>
    )
}

export default MobileMenu