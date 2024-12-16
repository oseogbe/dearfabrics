import Container from "@/components/Container"
import { redirect } from "next/navigation"

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

            const orderId = data.data.metadata.order_id

            redirect(`/orders/${orderId}`)
        } else {
            verificationStatus = 'Payment failed'
        }
    }

    return (
        <Container>
            <h1 className='pt-5 lg:pt-10 text-[18px] md:text-[22px] lg:text-3xl text-[#3C4242] font-medium'>{verificationStatus}</h1>
        </Container>
    )
}

export default PaymentCallbackPage