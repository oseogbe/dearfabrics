"use client"

import { useEffect, useState } from "react"

import { SubmitHandler, useForm } from "react-hook-form"
import { useShoppingCart } from "use-shopping-cart"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Country, IState, State } from "country-state-city"

import Container from "@/components/Container"
import { Switch } from "@/components/ui/switch"
import Loader from "@/components/Loader"

import { fetchRates } from "@/lib/sanity"
import { formatCurrency, generateOrderId } from "@/lib/utils"

const countries = Country.getAllCountries()
const country = "NG"
const states = State.getStatesOfCountry(country)
const state = states[1].isoCode

const CheckoutPage = () => {
    const { cartDetails, totalPrice } = useShoppingCart()
    const [selectedCountry, setSelectedCountry] = useState(country)
    const [countryStates, setCountryStates] = useState<IState[]>(states)
    const [selectedState, setSelectedState] = useState(state)
    const [showPhonecodeDropdown, setShowPhonecodeDropdown] = useState(false)
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("+234")
    const [showBillingAddress, setShowBillingAddress] = useState(false)
    const [selectedBillingCountry, setSelectedBillingCountry] = useState(country)
    const [selectedBillingState, setSelectedBillingState] = useState(state)

    const [shippingRate, setShippingRate] = useState(0)
    const [taxRate, setTaxRate] = useState(0)
    const [discount] = useState(0)
    const grandTotal = totalPrice as number + shippingRate + taxRate + discount

    const CheckoutSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        streetAddress: z.string().min(2),
        city: z.string().min(2),
        countryCode: z.string(),
        stateCode: z.string(),
        zipCode: z.coerce.number().optional(),
        phoneCode: z.string().optional(),
        phoneNo: z.coerce.number().min(8),
        billingStreetAddress: showBillingAddress ? z.string().min(2) : z.string().optional(),
        billingCity: showBillingAddress ? z.string().min(2) : z.string().optional(),
        billingCountryCode: showBillingAddress ? z.string() : z.string().optional(),
        billingStateCode: showBillingAddress ? z.string() : z.string().optional(),
        billingZipCode: showBillingAddress ? z.coerce.number().optional() : z.string().optional(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<CheckoutSchemaType>({
        resolver: zodResolver(CheckoutSchema),
    })

    type CheckoutSchemaType = z.infer<typeof CheckoutSchema>

    setValue('phoneCode', selectedPhoneCode)

    useEffect(() => {
        const fetchStates = () => {
            const fetchedStates = State.getStatesOfCountry(selectedCountry)
            setCountryStates(fetchedStates)
            setSelectedState(fetchedStates[0].isoCode)
        }

        fetchStates()
    }, [selectedCountry])

    useEffect(() => {
        const fetchDeliveryRates = async () => {
            const state = State.getStateByCodeAndCountry(selectedState, selectedCountry)
            if (state) {
                const rate = await fetchRates(state.name)
                setShippingRate(rate.shippingRate)
                setTaxRate(rate.taxRate / 100 * rate.shippingRate)
            }
        }

        fetchDeliveryRates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState])

    const handlePhoneCodeSelect = (code: string) => {
        setSelectedPhoneCode(code)
        setValue('phoneCode', code)
        setShowPhonecodeDropdown(false)
    }

    const onSubmit: SubmitHandler<CheckoutSchemaType> = async (values) => {
        const formData = {
            ...values,
            country: Country.getCountryByCode(values.countryCode)?.name,
            state: State.getStateByCodeAndCountry(values.stateCode, values.countryCode)?.name,
            billingCountry: values.billingCountryCode ? Country.getCountryByCode(values.billingCountryCode)?.name : null,
            billingState: values.billingStateCode && values.billingCountryCode ? State.getStateByCodeAndCountry(values.billingStateCode, values.billingCountryCode)?.name : null,
        }

        try {
            const orderId = generateOrderId()

            const response = await fetch('/api/paystack/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    amount: Math.round(grandTotal * 100),
                    order_id: orderId
                })
            })

            const data = await response.json()

            if (data.status) {
                if (!cartDetails) return
                const line_items = Object.values(cartDetails).flatMap(
                    product => ({
                        productId: product.id,
                        size: product.size,
                        color: product.color,
                        quantity: product.quantity,
                        price: product.price
                    })
                )

                const orderData = {
                    id: orderId,
                    customerName: formData.name,
                    email: formData.email,
                    billingAddress: formData.billingStreetAddress ? `${formData.billingStreetAddress}, ${formData.billingCity}, ${formData.billingState} ${formData.billingZipCode}, ${formData.billingCountry}` : `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
                    shippingAddress: `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
                    phone: `${formData.phoneCode}${formData.phoneNo}`,
                    items: line_items,
                    subtotal: totalPrice,
                    shipping: shippingRate,
                    tax: taxRate,
                    discount,
                    total: grandTotal,
                }

                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.error || 'Something went wrong')
                }

                window.location.href = data.data.authorization_url
            } else {
                alert('Payment initialization failed. Try again.')
            }
        } catch (error) {
            console.error(error)
        }

        // reset()
    }

    return (
        <Container>
            <div className="relative w-full max-w-7xl mx-auto lg:py-24 px-4 md:px-5 lg-6">
                <h2 className="font-bold text-2xl lg:text-3xl leading-10 text-black mb-11">
                    Checkout
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900"> Your name* </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.name && 'border-red-500'}`}
                                            placeholder=""
                                            {...register('name')}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900"> Your email* </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.email && 'border-red-500'}`}
                                            placeholder=""
                                            {...register('email')}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="street-address" className="mb-2 block text-sm font-medium text-gray-900"> Street address* </label>
                                        <input
                                            type="text"
                                            id="street-address"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.streetAddress && 'border-red-500'}`}
                                            placeholder=""
                                            {...register('streetAddress')}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900"> Town / City* </label>
                                        <input
                                            type="text"
                                            id="city"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.city && 'border-red-500'}`}
                                            placeholder=""
                                            {...register('city')}
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-country" className="block text-sm font-medium text-gray-900"> Country* </label>
                                        </div>
                                        <select
                                            id="select-country"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.countryCode && 'border-red-500'}`}
                                            defaultValue={selectedCountry}
                                            disabled
                                        >
                                            {
                                                countries.map(country => (
                                                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                                ))
                                            }
                                        </select>
                                        <input type="hidden" {...register('countryCode')} value={selectedCountry} />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-state" className="block text-sm font-medium text-gray-900"> State* </label>
                                        </div>
                                        <select
                                            id="select-state"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.stateCode && 'border-red-500'}`}
                                            {...register('stateCode')}
                                            defaultValue={selectedState}
                                            onChange={(e) => setSelectedState(e.target.value)}
                                            required
                                        >
                                            {
                                                countryStates.map(state => (
                                                    <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="zip_code" className="mb-2 block text-sm font-medium text-gray-900"> Zip / Postal code </label>
                                        <input
                                            type="text"
                                            id="zip_code"
                                            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.zipCode && 'border-red-500'}`}
                                            placeholder=""
                                            {...register('zipCode')}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900"> Phone Number </label>
                                        <div className="flex items-center relative">
                                            <button
                                                id="dropdown-phone-button"
                                                data-dropdown-toggle="dropdown-phone"
                                                className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                                                type="button"
                                                onClick={() => setShowPhonecodeDropdown(currentVal => !currentVal)}
                                            >
                                                {selectedPhoneCode}
                                                <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {
                                                showPhonecodeDropdown && (
                                                    <div id="dropdown-phone" className="absolute top-12 z-10 w-56 divide-y divide-gray-100 rounded-lg bg-white shadow">
                                                        <ul className="p-2 text-sm font-medium text-gray-700" aria-labelledby="dropdown-phone-button-2">
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+234')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        Nigeria (+234)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+1')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        United States (+1)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+44')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        United Kingdom (+44)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+61')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        Australia (+61)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+49')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        Germany (+49)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={() => handlePhoneCodeSelect('+33')}
                                                                >
                                                                    <span className="inline-flex items-center">
                                                                        France (+33)
                                                                    </span>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    id="phone-input"
                                                    className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                                                    placeholder=""
                                                    {...register('phoneNo')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        !showBillingAddress && (
                                            <div className="sm:col-span-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowBillingAddress(true)}
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                                                >
                                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                                    </svg>
                                                    Use a different billing address
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        showBillingAddress && (
                                            <div className="flex items-center gap-x-4">
                                                <Switch checked={showBillingAddress} onCheckedChange={() => setShowBillingAddress(false)} /> Remove different billing address?
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                showBillingAddress && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Billing Address</h2>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="billing-street-address" className="mb-2 block text-sm font-medium text-gray-900"> Street address* </label>
                                                <input
                                                    type="text"
                                                    id="billing-street-address"
                                                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.billingStreetAddress && 'border-red-500'}`}
                                                    placeholder=""
                                                    {...register('billingStreetAddress')}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="billing-city" className="mb-2 block text-sm font-medium text-gray-900"> Town / City* </label>
                                                <input
                                                    type="text"
                                                    id="billing-city"
                                                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.billingCity && 'border-red-500'}`}
                                                    placeholder=""
                                                    {...register('billingCity')}
                                                />
                                            </div>

                                            <div>
                                                <div className="mb-2 flex items-center gap-2">
                                                    <label htmlFor="select-billing-country" className="block text-sm font-medium text-gray-900"> Country* </label>
                                                </div>
                                                <select
                                                    id="select-billing-country"
                                                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.billingCountryCode && 'border-red-500'}`}
                                                    {...register('billingCountryCode')}
                                                    defaultValue={selectedBillingCountry}
                                                    onChange={(e) => setSelectedBillingCountry(e.target.value)}
                                                    disabled
                                                    required
                                                >
                                                    {
                                                        countries.map(country => (
                                                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <div className="mb-2 flex items-center gap-2">
                                                    <label htmlFor="select-billing-state" className="block text-sm font-medium text-gray-900"> State* </label>
                                                </div>
                                                <select
                                                    id="select-billing-state"
                                                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.billingStateCode && 'border-red-500'}`}
                                                    {...register('billingStateCode')}
                                                    defaultValue={selectedBillingState}
                                                    onChange={(e) => setSelectedBillingState(e.target.value)}
                                                    required
                                                >
                                                    {
                                                        countryStates.map(state => (
                                                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="billing_zip_code" className="mb-2 block text-sm font-medium text-gray-900"> Zip / Postal code </label>
                                                <input
                                                    type="text"
                                                    id="billing_zip_code"
                                                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black ${errors.billingZipCode && 'border-red-500'}`}
                                                    placeholder=""
                                                    {...register('billingZipCode')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="credit-card"
                                                    aria-describedby="credit-card-text"
                                                    type="radio"
                                                    name="payment-method"
                                                    value="credit-card"
                                                    className="h-4 w-4 border-gray-300 bg-white text-df-yellow focus:ring-2 focus:ring-df-yellow"
                                                    defaultChecked
                                                />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 cursor-pointer"> Credit / Debit Card </label>
                                                <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500">Pay with your credit card or debit card</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200"></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Edit</button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="pay-on-delivery"
                                                    aria-describedby="pay-on-delivery-text"
                                                    type="radio"
                                                    name="payment-method"
                                                    value="pay-on-delivery"
                                                    className="h-4 w-4 border-gray-300 bg-white text-df-yellow focus:ring-2 focus:ring-df-yellow"
                                                />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 cursor-pointer"> Bank Transfer </label>
                                                <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500">Pay to a virtual bank account</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200"></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Delivery Methods</h3>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-df-yellow focus:ring-2 focus:ring-df-yellow" defaultChecked />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor="dhl" className="font-medium leading-none text-gray-900 cursor-pointer"> $15 - DHL Fast Delivery </label>
                                                    <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500">Get it by Tommorow</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-df-yellow focus:ring-2 focus:ring-df-yellow" />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor="fedex" className="font-medium leading-none text-gray-900 cursor-pointer"> Free Delivery - FedEx </label>
                                                    <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500">Get it by Friday, 13 Dec 2023</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-df-yellow focus:ring-2 focus:ring-df-yellow" />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor="express" className="font-medium leading-none text-gray-900 cursor-pointer"> $49 - Express Delivery </label>
                                                    <p id="express-text" className="mt-1 text-xs font-normal text-gray-500">Get it today</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900">{formatCurrency(totalPrice ?? 0)}</dd>
                                    </dl>

                                    {shippingRate > 0 && (<dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500">Shipping</dt>
                                        <dd className="text-base font-medium text-gray-900">{formatCurrency(shippingRate)}</dd>
                                    </dl>)}

                                    {taxRate > 0 && (<dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900">{formatCurrency(taxRate)}</dd>
                                    </dl>)}

                                    {discount > 0 && (<dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500">Discount</dt>
                                        <dd className="text-base font-medium text-gray-900">{formatCurrency(discount)}</dd>
                                    </dl>)}

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">{formatCurrency(grandTotal)}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-df-yellow px-5 py-2.5 text-sm font-medium text-white hover:bg-df-yellow/80 focus:outline-none focus:ring-4 focus:ring-df-yellow/30"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex-center">
                                            <Loader />
                                        </div>
                                    ) : "Proceed to Payment"}
                                </button>

                                <p className="text-sm font-normal text-gray-500">One or more items in your cart require an account.
                                    <a href="#" title="" className="font-medium text-df-yellow/80 underline hover:no-underline ml-1">
                                        Sign in or create an account now.
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default CheckoutPage