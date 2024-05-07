"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import ProductStars from "@/components/product/ProductStars"
import Tabs from "@/components/Tabs"

import { FaMinus, FaPlus } from "react-icons/fa6"
import { IoCartOutline } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"

interface ProductClientProps {
    product: {
        id: string
        name: string
        description: string
        category: string
        images: string[]
        discountPrice?: number
        price: number
        inStock: boolean
        colors: {
            name: string
            code: string
        }[]
        sizes: string[]
        stars: number
        ratings: number
        relatedProducts: any[]
    }
}

const ProductClient: React.FC<ProductClientProps> = ({
    product
}) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0])
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[0])
    const [quantity, setQuantity] = useState(0)

    const addToCart = useCallback((productId: string) => {
        // productId, quantity
        toast.success('Added to cart', {
            position: 'bottom-left',
        })
    }, [])

    return (
        <>
            <div className="flex-1">
                <div className="flex flex-col-reverse md:flex-row h-auto md:h-[650px] xl:h-[700px] overflow-y-hidden">
                    <div className="w-full md:w-32 flex flex-row md:flex-col md:gap-y-4 overflow-x-scroll md:overflow-y-scroll scrollbar-hide">
                        {product.images.map((image, i) => (
                            <div key={i} className="h-20 md:h-auto aspect-square border-2 border-df-gray cursor-pointer">
                                <Image
                                    src={image}
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
                                body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo vel ipsum repellat laboriosam sint impedit accusamus minus autem molestiae natus totam laudantium quidem mollitia obcaecati, temporibus consectetur? Qui, itaque quo."
                            },
                            {
                                value: "reviews",
                                body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, unde. Non quis, asperiores atque porro alias est eos saepe accusantium. Veniam aliquam blanditiis porro illum sunt itaque quas nihil placeat?"
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="flex-1">
                <div className="mt-8">
                    <div className="text-xs xl:text-base text-[#807D7E]">{product.category}</div>
                    <div className="mt-4 md:mt-8 text-xl md:text-2xl xl:text-4xl text-[#3C4242] font-bold">{product.name}</div>
                    <div className="mt-3 md:mt-6 text-[18px] md:text-[22px] text-3xl text-[#3C4242] font-medium">
                        {product.discountPrice ? (
                            <div>
                                {`₦${product.discountPrice}`}
                                <span className="ml-3 text-[#848485] line-through" dangerouslySetInnerHTML={{ __html: `₦${product.price}` }}></span>
                            </div>
                        ) : (
                            `₦${product.price}`
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
                    <div className="mt-8 text-sm xl:text-base text-[#3C4242]">{product.description}</div>
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
                        <div><span className="font-bold text-[#3C4242] text-sm md:text-base xl:text-lg">Size:</span> {selectedSize}</div>
                        <div className="mt-3 flex items-center gap-4">
                            {product.sizes.map(size => (
                                <div
                                    key={size}
                                    className={`
                                        h-8
                                        xl:h-10 
                                        aspect-square 
                                        flex 
                                        items-center 
                                        justify-center 
                                        text-sm 
                                        ${selectedSize === size ? 'bg-df-gray' : ''} 
                                        text-[#3C4242] 
                                        border 
                                        rounded-md 
                                        cursor-pointer
                                    `}
                                    onClick={() => setSelectedSize(size)}
                                >{size}</div>
                            ))}
                        </div>
                    </div>
                    <Link href="#" className="block mt-6 text-[#3C4242] text-sm md:text-base xl:text-lg underline">View Size Guide</Link>
                    <div className="mt-6 flex items-center gap-5">
                        <div className="flex">
                            <div className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer"
                                onClick={() => {
                                    if (quantity === 0) {
                                        return
                                    }
                                    setQuantity(current => current - 1)
                                }}>
                                <FaMinus />
                            </div>
                            <div className="w-12 xl:w-14 h-10 xl:h-12 flex items-center justify-center border">
                                {quantity}
                            </div>
                            <div className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center border cursor-pointer" onClick={() => setQuantity(current => current + 1)}>
                                <FaPlus />
                            </div>
                        </div>
                        <button
                            className="w-[210px] h-10 xl:h-12 flex items-center justify-center gap-4 bg-black text-white text-xs md:text-sm font-light uppercase"
                            onClick={() => addToCart(product.id)}
                        >
                            Add to cart <IoCartOutline size={18} />
                        </button>
                        <button className="w-[50px] h-10 xl:h-12 flex items-center justify-center border" onClick={() => { }}>
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
                                    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo vel ipsum repellat laboriosam sint impedit accusamus minus autem molestiae natus totam laudantium quidem mollitia obcaecati, temporibus consectetur? Qui, itaque quo."
                                },
                                {
                                    value: "reviews",
                                    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, unde. Non quis, asperiores atque porro alias est eos saepe accusantium. Veniam aliquam blanditiis porro illum sunt itaque quas nihil placeat?"
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