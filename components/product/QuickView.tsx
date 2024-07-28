"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useShoppingCart } from "use-shopping-cart"
import { toast } from "sonner"

import { ProductType } from "@/typings"
import { cn, formatCurrency } from "@/lib/utils"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
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
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "")
    const [quantity, setQuantity] = useState(1)

    const shoppingCart = useShoppingCart()

    const handleAddItem = () => {
        shoppingCart.addItem(
            product,
            {
                count: quantity,
                product_metadata: {
                    color: selectedColor,
                    size: selectedSize
                }
            })
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
            <DialogContent className="max-w-[95%] px-3 md:max-w-[560px] lg:max-w-[992px] max-h-[90%] overflow-y-scroll scrollbar-hide rounded-md">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1">
                        <div className="flex flex-col-reverse md:flex-row h-auto md:h-[650px] xl:h-[700px] overflow-y-hidden">
                            <div className="flex-1 lg:ml-4 xl:mx-8 border-2 border-df-gray cursor-pointer">
                                <Image
                                    src={selectedImage}
                                    alt={product.name}
                                    width={1000}
                                    height={1000}
                                    className="h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mt-8">
                            {/* <div className="text-xs xl:text-base text-[#807D7E]">{product.category}</div> */}
                            <div className="mt-4 md:mt-8 text-xl md:text-2xl xl:text-4xl text-[#3C4242] font-bold">{product.name}</div>
                            <div className="mt-3 md:mt-6 text-[18px] md:text-[22px] text-3xl text-[#3C4242] font-medium">
                                {product.oldPrice ? (
                                    <div>
                                        {`${formatCurrency(product.price)}`}
                                        <span className="ml-3 text-[#848485] line-through" dangerouslySetInnerHTML={{ __html: `${formatCurrency(product.oldPrice)}` }}></span>
                                    </div>
                                ) : (
                                    `${formatCurrency(product.price)}`
                                )}
                            </div>
                            <div className="mt-4 flex items-center">
                                <ProductStars
                                    stars={product.stars}
                                    ratings={product.ratings}
                                />
                                <div className="h-4 w-[1px] bg-black mx-3"></div>
                                {product.inStock ? (
                                    <div className="text-xs xl:text-green-500">In Stock</div>
                                ) : (
                                    <div className="text-xs xl:text-red-500">Out of Stock</div>
                                )}
                            </div>
                            <div className="hidden lg:block mt-8 text-sm xl:text-base text-[#3C4242]">{product.description}</div>
                            <div className="mt-8">
                                <div><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Color:</span> {selectedColor.name}</div>
                                <div className="mt-3 flex items-center gap-4">
                                    {product.colors.map(color => (
                                        <div
                                            key={color.code}
                                            className="w-5 h-5 xl:h-6 xl:w-6 rounded-full cursor-pointer"
                                            style={{
                                                backgroundColor: color.code,
                                                borderWidth: '2px',
                                                boxShadow: selectedColor.code === color.code ? `0 0 0 1px ${color.code}` : '',
                                            }}
                                            onClick={() => setSelectedColor(color)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8">
                                {
                                    product.sizes && (
                                        <>
                                            <div><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Size:</span> {selectedSize}</div>
                                            <div className="mt-3 flex items-center gap-4">
                                                {product.sizes.map(size => (
                                                    <div
                                                        key={size}
                                                        className={cn(
                                                            "h-8 xl:h-10 aspect-square flex items-center justify-center text-sm text-[#3C4242] border rounded-md cursor-pointer",
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
                            <Link href="#" className="block mt-6 text-[#3C4242] text-sm md:text-base xl:text-lg underline">View Size Guide</Link>
                            <div className="mt-6 flex items-center gap-5">
                                <div className="flex">
                                    <div
                                        className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer"
                                        onClick={() => {
                                            if (quantity > 1) {
                                                setQuantity(current => current - 1)
                                            }
                                        }}
                                    >
                                        <FaMinus />
                                    </div>
                                    <div className="w-12 xl:w-14 h-10 xl:h-12 flex items-center justify-center border">
                                        {quantity}
                                    </div>
                                    <div
                                        className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer"
                                        onClick={() => setQuantity(current => current + 1)}
                                    >
                                        <FaPlus />
                                    </div>
                                </div>
                                <button
                                    className="w-full md:w-[210px] h-10 xl:h-12 flex items-center justify-center gap-4 bg-black text-white text-xs md:text-sm font-light uppercase"
                                    onClick={handleAddItem}
                                    disabled={!quantity}
                                >
                                    Add to cart <IoCartOutline size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QuickView