const PaymentCallbackPage = async ({
    searchParams
}: {
    searchParams: {
        reference: string
    }
}) => {
    const reference = searchParams.reference

    let verificationStatus = 'Verifying payment...'

    if (reference) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paystack/verify?reference=${reference}`, { cache: 'no-store' })
        const data = await response.json()

        if (data.status) {
            verificationStatus = 'Payment successful'
        } else {
            verificationStatus = 'Payment failed'
        }
    }

    return (
        <div>
            <h1 className='text-3xl font-bold'>{verificationStatus}</h1>
        </div>
    )
}

export default PaymentCallbackPage