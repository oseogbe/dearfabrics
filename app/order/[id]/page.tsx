import Image from "next/image"

import { formatAmount } from "@/lib/utils"
import Container from "@/components/Container"

const OrderSummaryPage = ({ params }: { params: { id: number } }) => {

    const orderNo = params.id

    const order = {
        from: "Christine",
        address: "718 Robbyn Meadow, Valwood Pkwy",
        delivery_time: "two days",
        delivery_date: "July 01, 2024",
        products: [
            {
                id: 'jkje-irr-84nr',
                name: "Damask Fabric 1",
                slug: 'damask-fabric-1',
                category: 'fabrics',
                price: 45000,
                quantity: 2,
                image: '/img/products/fabric-7.png',
                inStock: true,
            },
            {
                id: 'jg84-p90e-9je4',
                name: "Gold Necklace",
                slug: 'gold-necklace',
                category: 'accessories',
                price: 60000,
                quantity: 1,
                image: '/img/products/gold-necklace.png',
                shipsIn: '3-4 weeks'
            },
        ],
        subtotal: 150000,
        shipping: 5000,
        tax: 8000,
        discount: 3000,
        total: 160000
    }

    return (
        <Container>
            <section className="relative w-full max-w-7xl mx-auto py-24">
                <div className="px-4 md:px-5 lg-6">
                    <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
                        Your Order Confirmed
                    </h2>
                    <h6 className="font-medium text-xl leading-8 text-black mb-3">Hello, {order.from}</h6>
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                        Your order has been completed and will be delivered in only {order.delivery_time}.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Delivery Date</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">{order.delivery_date}</h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Order</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">#{orderNo}</h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Payment Method</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                                <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="#1F72CD" />
                                <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F3F4F6" />
                                <path fillRule="evenodd" clip-rule="evenodd"
                                    d="M8.1282 11.333L3.88672 20.9953H8.96437L9.59385 19.4548H11.0327L11.6622 20.9953H17.2512V19.8195L17.7493 20.9953H20.6404L21.1384 19.7947V20.9953H32.7621L34.1755 19.4948L35.4989 20.9953L41.4691 21.0078L37.2143 16.1911L41.4691 11.333H35.5915L34.2157 12.8058L32.9339 11.333H20.2888L19.203 13.8269L18.0917 11.333H13.0246V12.4688L12.461 11.333H8.1282ZM9.1107 12.7051H11.5858L14.3992 19.2571V12.7051H17.1105L19.2835 17.4029L21.2862 12.7051H23.984V19.6384H22.3424L22.329 14.2055L19.9358 19.6384H18.4674L16.0607 14.2055V19.6384H12.6837L12.0435 18.0841H8.58456L7.94566 19.6371H6.13627L9.1107 12.7051ZM32.1608 12.7051H25.4859V19.6343H32.0574L34.1755 17.3379L36.217 19.6343H38.3512L35.2493 16.1898L38.3512 12.7051H36.3096L34.2023 14.9752L32.1608 12.7051ZM10.3147 13.8782L9.17517 16.6471H11.453L10.3147 13.8782ZM27.1342 15.4063V14.1406V14.1394H31.2991L33.1165 16.1636L31.2186 18.1988H27.1342V16.817H30.7756V15.4063H27.1342Z"
                                    fill="white" />
                            </svg>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Address</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">{order.address}</h6>
                        </div>
                    </div>
                    {order.products.map(product => (
                        <div key={product.id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                            <div className="bg-df-gray col-span-7 min-[500px]:col-span-2 md:col-span-1">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={170}
                                    height={170}
                                    className="w-full p-4"
                                />
                            </div>
                            <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                                <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                    <div className="">
                                        <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-6">{product.name}</h5>
                                        <p className="font-normal text-xl leading-8 text-gray-500">
                                            Quantity : <span className="text-black font-semibold">{product.quantity}</span>
                                        </p>
                                    </div>
                                    <h5 className="font-manrope font-semibold text-3xl leading-10 text-black sm:text-right mt-3">
                                        N{formatAmount(product.price)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center sm:justify-end w-full my-6">
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Subtotal</p>
                                <p className="font-semibold text-xl leading-8 text-gray-900">N{formatAmount(order.subtotal)}</p>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Shipping Charge</p>
                                <p className="font-semibold text-xl leading-8 text-gray-900">N{formatAmount(order.shipping)}</p>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Taxes</p>
                                <p className="font-semibold text-xl leading-8 text-gray-900">N{formatAmount(order.tax)}</p>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Discount</p>
                                <p className="font-semibold text-xl leading-8 text-gray-900">N{formatAmount(order.discount)}</p>
                            </div>
                            <div className="flex items-center justify-between py-6 border-y border-gray-100">
                                <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">Total</p>
                                <p className="font-manrope font-bold text-2xl leading-9 text-df-yellow">N{formatAmount(order.total)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="data">
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                            We&apos;ll be sending a shipping confirmation email when the items are shipped successfully.
                        </p>
                        <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
                            Thank you for shopping with us!
                        </h6>
                        <Image
                            src="/img/dfng-logo.png"
                            alt="dearfabrics.ng logo"
                            height={100}
                            width={100}
                            className="cursor-pointer h-9 md:h-10 xl:h-12 w-auto mt-[40px]"
                        />
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default OrderSummaryPage