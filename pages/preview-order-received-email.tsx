import React from "react"
import { render } from "@react-email/render"
import OrderReceivedEmail from "@/emails/order-received-email"

const PreviewOrderReceivedEmail = () => {
    const emailHtml = render(
        <OrderReceivedEmail
            orderId="12345"
            reference="abcde12345"
            customerName="John Doe"
            customerEmail="john.doe@example.com"
            customerPhone="08012345678"
            customerAddress="123, Some Street, Somewhere"
            items={[
                { name: "Fabric A", size: '1 piece', quantity: 2, price: 50000 },
                { name: "Fabric B", size: '1 piece', quantity: 1, price: 30000 }
            ]}
            shipping={5000}
            tax={0}
            discount={0}
            total={135000}
        />
    )

    return (
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
    )
}

export default PreviewOrderReceivedEmail
