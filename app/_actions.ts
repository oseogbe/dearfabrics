"use server"

import fs from "fs"
import path from "path"
import { Resend } from "resend"
import * as z from "zod"

import { ContactFormInputs } from "./contact/ContactForm"
import ContactFormEmail from "@/emails/contact-form-email"

const ContactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Enter a valid email address.' }),
    message: z.string().min(20, { message: 'Message must be at least 20 characters.' })
})

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (data: ContactFormInputs) => {
    const result = ContactFormSchema.safeParse(data)

    if (result.success) {
        const { name, email, message } = result.data
        try {
            const data = await resend.emails.send({
                from: `DearFabrics.ng Website <${process.env.RESEND_FROM_EMAIL}>`,
                to: ["osememen.ogbe@gmail.com"],
                subject: "DearFabrics.ng Contact Form",
                // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                react: ContactFormEmail({ name, email, message })
            })
            return { success: true, data }
        } catch (error) {
            return { success: false, error }
        }
    }

    if (result.error) {
        return { success: false, error: result.error.format() }
    }
}

const filePath = path.resolve('waitinglist.txt')
// const filePath = path.join(process.cwd(), 'waitinglist.txt')

const doesEmailExist = async (email: string) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const emailExists = fileContent.split('\n').map(e => e.trim()).filter(Boolean).includes(email)
    return emailExists
}

const addToWaitingList = async (email: string) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, `${email}\n`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve('Successfully subscribed!')
            }
        })
    })
}

export {
    sendEmail,
    doesEmailExist,
    addToWaitingList
}