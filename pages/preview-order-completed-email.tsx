import React from "react"
import { render } from "@react-email/render"
import OrderCompletedEmail from "@/emails/order-completed-email"

const PreviewOrderCompletedEmail = () => {
    const emailHtml = render(
        <OrderCompletedEmail
            customerName="Osememen Ogbe"
            orderId="123456"
            items={[
                { name: "Fabric A", size: '5 yards', quantity: 2, price: 20000 },
                { name: "Fabric B", size: '6 yards', quantity: 1, price: 15000 }
            ]}
            shipping={5000}
            tax={0}
            discount={0}
            total={60000}
        />
    )

    return (
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
    )
}

export default PreviewOrderCompletedEmail
