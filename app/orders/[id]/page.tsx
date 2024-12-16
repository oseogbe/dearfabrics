import Container from "@/components/Container"
import Client from "./Client"

import { getOrder } from "@/lib/sanity"

const OrderSummaryPage = async ({ params }: { params: { id: number } }) => {
    const order = await getOrder(String(params.id))

    return (
        <Container>
            <Client order={order} />
        </Container>
    )
}

export default OrderSummaryPage