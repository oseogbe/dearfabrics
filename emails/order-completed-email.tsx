import { CSSProperties } from "react"
import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Text,
    Preview,
} from "@react-email/components"

import { formatCurrency, formatDate } from "@/lib/utils"

interface OrderCompletedEmailProps {
    customerName: string
    orderId: string
    items: { name: string, size: string, quantity: number, price: number }[]
    shipping: number
    tax: number
    discount: number
    total: number
}

export const OrderCompletedEmail = ({
    customerName,
    orderId,
    items,
    shipping,
    tax,
    discount,
    total
}: OrderCompletedEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Your Order is Completed
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="https://dearfabrics.com/img/dfng-logo.png"
                    alt="dearfabrics logo"
                    width="150"
                    height="61"
                    style={logo}
                />
                <Text style={header}>Order Confirmation</Text>
                <Text style={paragraph}>Hi {customerName},</Text>
                <Text style={paragraph}>
                    Your order has been completed successfully. Here are the details:
                </Text>
                <Text style={paragraph}>
                    <strong>Order ID:</strong> {orderId}
                </Text>
                <Text style={paragraph}>
                    <strong>Order Date:</strong> {formatDate(new Date().toDateString())}
                </Text>
                <table style={table}>
                    <thead>
                        <tr>
                            <th style={tableHeader}>Item</th>
                            <th style={tableHeader}>Size</th>
                            <th style={tableHeader}>Unit Price</th>
                            <th style={tableHeader}>Quantity</th>
                            <th style={tableHeader}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td style={tableData}>{item.name}</td>
                                <td style={tableData}>{item.size}</td>
                                <td style={tableData}>{formatCurrency(item.price)}</td>
                                <td style={tableData}>{item.quantity}</td>
                                <td style={tableData}>{formatCurrency(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                        {shipping > 0 && <tr>
                            <td style={tableData}>Shipping Cost</td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}><strong>{formatCurrency(shipping)}</strong></td>
                        </tr>}
                        {tax > 0 && <tr>
                            <td style={tableData}>Tax</td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}><strong>{formatCurrency(tax)}</strong></td>
                        </tr>}
                        {discount > 0 && <tr>
                            <td style={tableData}>Discount</td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={{ ...tableData, ...{ textDecoration: 'line-through' } }}><strong>{formatCurrency(discount)}</strong></td>
                        </tr>}
                        <tr>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}></td>
                            <td style={tableData}><strong>{formatCurrency(total)}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <Text style={paragraph}>
                    Thank you for shopping with us!
                </Text>
                <Text style={paragraph}>
                    Regards,
                </Text>
                <Text style={paragraph}>
                    DearFabrics.ng Team
                </Text>
            </Container>
        </Body>
    </Html>
)

export default OrderCompletedEmail

const main = {
    backgroundColor: "#f4f4f4",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    padding: "20px",
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
}

const header: CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center" as "center",
}

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    margin: "10px 0",
}

const table: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
    marginTop: "20px",
}

const tableHeader = {
    borderBottom: "2px solid #dddddd",
    padding: "10px",
    textAlign: "left" as "left",
    fontSize: "16px",
    fontWeight: "bold",
}

const tableData = {
    borderBottom: "1px solid #dddddd",
    padding: "10px",
    fontSize: "16px",
}

const totalText = {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
}

const logo = {
    display: "block",
    margin: "0 auto 40px",
}
