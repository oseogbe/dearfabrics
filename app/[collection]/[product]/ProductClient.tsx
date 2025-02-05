"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useShoppingCart } from "use-shopping-cart"
import { toast } from "sonner"

import ProductStars from "@/components/product/ProductStars"
import Tabs from "@/components/Tabs"

import { urlFor } from "@/lib/sanity"
import { cn, formatCurrency, getProductPrices, setCartItem } from "@/lib/utils"

import { ProductType, ProductVariant } from "@/typings"

import { FaMinus, FaPlus } from "react-icons/fa6"
import { IoCartOutline } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"

const ProductClient = ({
    product
}: {
    product: ProductType
}) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0])
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.[0])
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
    const [quantity, setQuantity] = useState(1)

    const shoppingCart = useShoppingCart()

    const { minOldPrice, minPrice, maxOldPrice, maxPrice } = getProductPrices(product)

    const selectSize = (size: string) => {
        setSelectedSize(size)
        const variant = product.variants.find(variant => variant.options.some(option => option.name === 'sizes' && option.value === size))
        setSelectedVariant(variant!)
    }

    const handleAddItem = () => {
        if (!selectedVariant) {
            toast("Select a size", { duration: 1500 })
            return
        }
        if (!product.inStock) {
            toast("Sorry, item has sold out", { duration: 1500 })
            return
        }
        const { item, count } = setCartItem(product, selectedVariant, quantity)
        shoppingCart.addItem(item, { count })
        setQuantity(1)
        toast("Added to cart", { duration: 1500 })
    }

    const formattedDescription = product.description?.split("\n").map((item, index) => (
        <p key={index} className="mb-3">{item}</p>
    ))

    return (
        <>
            <div className="flex-1">
                <div className="flex flex-col-reverse md:flex-row h-auto md:h-[650px] xl:h-[700px] overflow-y-hidden">
                    <div className="w-full md:w-32 flex flex-row md:flex-col md:gap-y-4 overflow-x-scroll md:overflow-y-scroll scrollbar-hide">
                        {product.images?.map((image, i) => (
                            <div key={i} className="h-20 md:h-auto aspect-square border-2 border-df-gray cursor-pointer">
                                <Image
                                    src={urlFor(image).width(200).url()}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    className="object-cover"
                                    onClick={() => setSelectedImage(image)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 md:ml-4 xl:mx-8 border-2 border-df-gray cursor-pointer">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="h-full object-cover"
                        />
                    </div>
                </div>
                <div className="hidden xl:block mt-16">
                    <Tabs
                        tabsList={[
                            {
                                value: "description",
                                body: "Description"
                            },
                            {
                                value: "reviews",
                                body: "Reviews"
                            },
                        ]}
                        tabsContent={[
                            {
                                value: "description",
                                body: ""
                            },
                            {
                                value: "reviews",
                                body: ""
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="flex-1">
                <div className="mt-8">
                    <div className="text-xs xl:text-base text-[#807D7E] uppercase">{product.categories?.[0]}</div>
                    <div className="mt-4 md:mt-8 text-xl md:text-2xl xl:text-4xl text-[#3C4242] font-bold">{product.name}</div>
                    <div className="mt-3 md:mt-6 text-[18px] md:text-[22px] lg:text-3xl text-[#3C4242] font-medium">
                        {selectedVariant ? formatCurrency(selectedVariant.price) : (
                            <>
                                {product.variants.length == 1 && (
                                    <div>
                                        {`${formatCurrency(minPrice)}`}
                                        {minOldPrice > 0 && <span className="ml-3 text-[#848485] line-through" dangerouslySetInnerHTML={{ __html: `${formatCurrency(minOldPrice)}` }}></span>}
                                    </div>
                                )}
                                {product.variants.length > 1 && (
                                    `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-4 flex items-center">
                        <ProductStars
                            stars={product.stars}
                            ratings={product.ratings}
                        />
                        {product.inStock ? (
                            <div className="px-3 py-1 text-xs text-white bg-green-500 rounded-full">
                                In Stock
                            </div>
                        ) : (
                            <div className="px-3 py-1 text-xs text-white bg-red-500 rounded-full">
                                Sold Out
                            </div>
                        )}
                    </div>
                    <div className="mt-8 text-sm xl:text-base text-[#3C4242]">{formattedDescription}</div>
                    {product.colors && product.colors[0]?.length > 0 && (
                        <div className="mt-8">
                            <div><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Color</span> {selectedColor}</div>
                            <div className="mt-3 flex items-center gap-4">
                                {/* {product.colors.map(color => (
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
                            ))} */}
                                {product.colors?.[0].map(color => (
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
                    )}
                    <div className="mt-8">
                        {
                            product.sizes && product.sizes[0]?.length > 0 && (
                                <>
                                    <div><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Size</span> {selectedSize}</div>
                                    <div className="mt-3 flex items-center gap-4">
                                        {product.sizes?.[0].map(size => (
                                            <div
                                                key={size}
                                                className={cn(
                                                    "px-3 py-2 flex items-center justify-center text-sm text-[#3C4242] border rounded-md cursor-pointer",
                                                    selectedSize === size && 'bg-df-gray'
                                                )}
                                                onClick={() => selectSize(size)}
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
                                className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer text-gray-900"
                                onClick={() => {
                                    if (quantity > 1) {
                                        setQuantity(current => current - 1)
                                    }
                                }}
                            >
                                <FaMinus />
                            </div>
                            <div className="w-12 xl:w-14 h-10 xl:h-12 flex items-center justify-center border text-gray-900">
                                {quantity}
                            </div>
                            <div
                                className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer text-gray-900"
                                onClick={() => setQuantity(current => current + 1)}
                            >
                                <FaPlus />
                            </div>
                        </div>
                        <button
                            className="w-[210px] h-10 xl:h-12 flex items-center justify-center gap-4 bg-black text-white text-xs md:text-sm font-light uppercase"
                            onClick={handleAddItem}
                        >
                            Add to cart <IoCartOutline size={18} />
                        </button>
                        <button className="w-[50px] h-10 xl:h-12 flex items-center justify-center border text-gray-900" onClick={() => { }}>
                            <FaRegHeart size={24} />
                        </button>
                    </div>
                    <hr className="my-8 xl:my-10" />
                    <div className="flex items-center gap-6 xl:gap-14">
                        <div className="flex items-center">
                            <Image
                                src="/img/assets/secure-payment.svg"
                                alt="secure payment"
                                height={44}
                                width={44}
                            />
                            <span className="ml-2 md:ml-4 text-xs md:text-sm xl:text-lg font-medium text-[#3C4242]">Secure payment</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/img/assets/size-and-fit.svg"
                                alt="size and fit"
                                height={44}
                                width={44}
                            />
                            <span className="ml-2 md:ml-4 text-xs md:text-sm xl:text-lg font-medium text-[#3C4242]">Size & Fit</span>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/img/assets/fast-delivery.svg"
                                alt="fast delivery"
                                height={44}
                                width={44}
                            />
                            <span className="ml-2 md:ml-4 text-xs md:text-sm xl:text-lg font-medium text-[#3C4242]">Fast Delivery</span>
                        </div>
                    </div>
                    <div className="block xl:hidden mt-12 xl:mt-16">
                        <Tabs
                            tabsList={[
                                {
                                    value: "description",
                                    body: "Description"
                                },
                                {
                                    value: "reviews",
                                    body: "Reviews"
                                },
                            ]}
                            tabsContent={[
                                {
                                    value: "description",
                                    body: ""
                                },
                                {
                                    value: "reviews",
                                    body: ""
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductClient