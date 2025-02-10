import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Text,
} from "@react-email/components"

import { ContactFormInputs } from "@/app/contact/ContactForm"

export const ContactFormEmail = ({
    name,
    email,
    message
}: ContactFormInputs) => (
    <Html>
        <Head />
        <Preview>
            ...fabrics and Jewelry brand
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
                <Text style={paragraph}>Hi DearFabrics.ng,</Text>
                <Text style={paragraph}>
                    {message}
                </Text>
                <Text style={paragraph}>
                    Regards,
                </Text>
                <Text style={paragraph}>
                    {name} ({email})
                </Text>
            </Container>
        </Body>
    </Html>
)

ContactFormEmail.PreviewProps = {
    name: "Osememen Ogbe",
    email: "oseogbe@test.com",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis rem, ut tenetur perspiciatis nulla suscipit, aspernatur odio expedita quasi similique repudiandae exercitationem sunt mollitia fugit, minus necessitatibus impedit dolorem voluptas!",
} as ContactFormInputs


export default ContactFormEmail

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

const logo = {
    display: "block",
    margin: "0 auto 40px",
}

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    margin: "10px 0",
}