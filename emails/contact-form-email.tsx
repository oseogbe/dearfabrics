import {
    Body,
    Container,
    Head,
    Hr,
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
                    src="/img/dfng-logo.png"
                    alt="dearfabrics logo"
                    width="170"
                    height="50"
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
                <Hr style={hr} />
                <Text style={footer}>
                    Suite C11,12, 2XL Mall, Plot 111, Christiana Ajayi Okunuga Street, Gwarinpa, Abuja
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
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
}

const logo = {
    margin: "0 auto",
}

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
}

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
}

const footer = {
    color: "#8898aa",
    fontSize: "12px",
}