"use client"

import { useEffect, useState } from 'react'

const PaymentCallbackPage = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const reference = searchParams.get('reference')
    console.log("ref", reference)
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null)

    useEffect(() => {
        if (reference) {
            const verifyPayment = async () => {
                const response = await fetch(`/api/paystack/verify?reference=${reference}`)
                const data = await response.json()

                if (data.status) {
                    setVerificationStatus('Payment successful')
                } else {
                    setVerificationStatus('Payment failed')
                }
            }

            verifyPayment()
        }
    }, [reference])

    return (
        <div>
            <h1 className='text-3xl font-bold'>{verificationStatus ? verificationStatus : 'Verifying payment...'}</h1>
        </div>
    )
}

export default PaymentCallbackPage