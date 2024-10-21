"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const PaymentCallbackPage = () => {
    const searchParams = useSearchParams()
    const reference = searchParams.get('reference')
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