import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Text,
    Preview,
} from "@react-email/components"

interface OrderCompletedEmailProps {
    orderId: string
    reference: string
}

export const OrderCompletedEmail = ({
    orderId,
    reference
}: OrderCompletedEmailProps) => (
    <Html>
        <Head />
        <Preview>
            New Order Completed
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="/img/dfng-logo.png"
                    alt="dearfabrics logo"
                    width="170"
                    height="50"
                    style={logo}
                />
                <Text style={paragraph}>Hi DearFabrics.ng,</Text>
                <Text style={paragraph}>
                    A new order has been completed. Here are the details:
                </Text>
                <Text style={paragraph}>
                    <strong>Order ID:</strong> {orderId}
                </Text>
                <Text style={paragraph}>
                    <strong>Payment Reference:</strong> {reference}
                </Text>
                <Text style={paragraph}>
                    Please process this order as soon as possible.
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
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
}

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
}

const logo = {
    margin: "0 auto",
}
