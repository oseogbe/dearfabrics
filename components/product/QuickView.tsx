"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useShoppingCart } from "use-shopping-cart"
import { toast } from "sonner"

import { ProductType } from "@/typings"
import { cn, formatCurrency, setCartItem } from "@/lib/utils"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import ProductStars from "./ProductStars"

import { ExpandIcon } from "lucide-react"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { IoCartOutline } from "react-icons/io5"

const QuickView = ({
    product
}: {
    product: ProductType
}) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0])
    const [selectedColor, setSelectedColor] = useState(product.colors[0][0])
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0][0])
    const [quantity, setQuantity] = useState(1)

    const shoppingCart = useShoppingCart()

    const handleAddItem = () => {
        const { item, count } = setCartItem(product, selectedColor, selectedSize, quantity)
        shoppingCart.addItem(item, { count })
        setQuantity(1)
        toast("Added to cart", { duration: 1500 })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="bg-white p-3 rounded-full shadow-md cursor-pointer"
                >
                    <ExpandIcon size={24} className="text-black" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95%] md:max-w-[560px] lg:max-w-[992px] min-h-[calc(100dvh-100px)] lg:min-h-fit px-3 lg:px-0 overflow-y-scroll scrollbar-hide rounded-md">
                <DialogHeader className="hidden">
                    <DialogTitle>
                        {product.name}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col lg:flex-row lg:gap-x-8">
                    <div className="flex-1 w-full relative -my-6">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 lg:pb-12">
                        <div className="flex flex-col gap-y-6 lg:gap-y-12">
                            <Link href={`/collections/${product.categories[0]}`} className="text-xs lg:text-sm text-df-yellow capitalize">{product.categories[0]}</Link>
                            <Link href={`/${product.categories[0]}/${product.slug}`} className="text-lg lg:text-xl text-[#3C4242] font-bold pr-3">{product.name}</Link>
                        </div>
                        <div className="mt-3 lg:mt-4 text-[18px] md:text-xl text-[#3C4242] font-medium">
                            {product.oldPrice ? (
                                <div>
                                    {`${formatCurrency(product.price)}`}
                                    <span className="ml-3 text-[#848485] line-through" dangerouslySetInnerHTML={{ __html: `${formatCurrency(product.oldPrice)}` }}></span>
                                </div>
                            ) : (
                                `${formatCurrency(product.price)}`
                            )}
                        </div>
                        <div className="hidden lg:block mt-6 text-sm xl:text-base text-[#3C4242] pr-3">{product.description}</div>
                        <div className="mt-6">
                            <div className="hidden lg:block">
                                <span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Color:</span> {selectedColor}
                            </div>
                            <div className="mt-3 flex items-center gap-4">
                                {product.colors[0].map(color => (
                                    <div
                                        key={color}
                                        className="w-5 h-5 xl:h-6 xl:w-6 rounded-full cursor-pointer"
                                        style={{
                                            backgroundColor: color,
                                            borderWidth: '2px',
                                            boxShadow: selectedColor === color ? `0 0 0 1px ${color}` : '',
                                        }}
                                        onClick={() => setSelectedColor(color)}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            {
                                product.sizes && (
                                    <>
                                        <div className="hidden lg:block"><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Size:</span> {selectedSize}</div>
                                        <div className="mt-3 flex items-center gap-4">
                                            {product.sizes[0].map(size => (
                                                <div
                                                    key={size}
                                                    className={cn(
                                                        "px-3 py-2 flex items-center justify-center text-sm text-[#3C4242] border rounded-md cursor-pointer",
                                                        selectedSize === size && 'bg-df-gray'
                                                    )}
                                                    onClick={() => setSelectedSize(size)}
                                                >{size}</div>
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="mt-6 flex items-center gap-5">
                            <div className="flex">
                                <div
                                    className="w-10 h-10 flex items-center justify-center border cursor-pointer"
                                    onClick={() => {
                                        if (quantity > 1) {
                                            setQuantity(current => current - 1)
                                        }
                                    }}
                                >
                                    <FaMinus />
                                </div>
                                <div className="w-12 h-10 flex items-center justify-center border">
                                    {quantity}
                                </div>
                                <div
                                    className="w-10 h-10 flex items-center justify-center border cursor-pointer"
                                    onClick={() => setQuantity(current => current + 1)}
                                >
                                    <FaPlus />
                                </div>
                            </div>
                            <button
                                className="w-full md:w-[210px] h-10 flex items-center justify-center gap-4 bg-black text-white text-xs md:text-sm font-light uppercase"
                                onClick={handleAddItem}
                                disabled={!quantity}
                            >
                                Add to cart <IoCartOutline size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QuickView