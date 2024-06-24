import Image from "next/image"

import ClientOnly from "@/components/ClientOnly"
import Container from "@/components/Container"
import ContactForm from "./ContactForm"

const ContactPage = async () => {

    const contactInfo = [
        {
            imageSrc: "/img/assets/shop.svg",
            alt: "dearfabrics.ng location icon",
            name: "Address",
            value: "Suite C11,12, 2XL Mall, Plot 111, Christiana Ajayi Okunuga Street, Gwarinpa, Abuja"
        },
        {
            imageSrc: "/img/assets/call.svg",
            alt: "dearfabrics.ng phonenumber icon",
            name: "Call Us",
            value: "+234 902 052 4006"
        },
        {
            imageSrc: "/img/assets/mail.svg",
            alt: "dearfabrics.ng mail icon",
            name: "Email",
            value: "shop@dearfabrics.com"
        },
    ]

    return (
        <Container>
            <div className="pt-10 xl:pt-20">
                <div className="text-xl md:text-2xl xl:text-4xl font-extrabold text-center">
                    Contact Us
                </div>
                <div className="mt-8 xl:mt-11 flex flex-col md:flex-row gap-[14px] xl:gap-6">
                    {
                        contactInfo.map(({ imageSrc, alt, name, value }) => (
                            <div key={name} className="flex-1 p-5 xl:p-8 bg-[#F3F5F7] flex flex-col items-center justify-center">
                                <Image
                                    src={imageSrc}
                                    alt={alt}
                                    height={32}
                                    width={32}
                                    className="h-5 xl:h-8 aspect-square"
                                />
                                <div className="mt-2 xl:mt-4 text-[#807D7E] text-xs xl:text-lg font-extrabold">{name}</div>
                                <div className="mt-2 text-[#141718] text-xs xl:text-base font-medium text-center">{value}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-11 flex flex-col gap-8 md:gap-14 xl:flex-row xl:gap-7">
                    <div className="xl:flex-1">
                        <ContactForm />
                    </div>
                    <div className="xl:flex-1 h-[360px] md:h-[500px] xl:h-auto">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.6634360009048!2d7.407500876009651!3d9.094392387959843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e756c92298129%3A0xcfb8da32c7d8b992!2s2XL%20Mall!5e0!3m2!1sen!2sng!4v1713080459986!5m2!1sen!2sng" width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ContactPage