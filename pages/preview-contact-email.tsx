import React from "react"
import { render } from "@react-email/render"
import ContactFormEmail from "@/emails/contact-form-email"

const PreviewContactEmail = () => {
    const emailHtml = render(
        <ContactFormEmail
            name="Osememen Ogbe"
            email="oseogbe@test.com"
            message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis rem, ut tenetur perspiciatis nulla suscipit, aspernatur odio expedita quasi similique repudiandae exercitationem sunt mollitia fugit, minus necessitatibus impedit dolorem voluptas!"
        />
    )

    return (
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
    )
}

export default PreviewContactEmail
