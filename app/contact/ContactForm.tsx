"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { sendEmail } from "../_actions"

const ContactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Enter a valid email address.' }),
    message: z.string().min(20, { message: 'Message must be at least 20 characters.' })
})

export type ContactFormInputs = z.infer<typeof ContactFormSchema>

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(ContactFormSchema)
    })

    const processForm: SubmitHandler<ContactFormInputs> = async data => {
        const result = await sendEmail(data)

        if (result?.success) {
            // console.log({ data: result.data })
            toast.success('Your message has been delivered!')
            reset()
            return
        }

        console.log(result?.error)
        toast.error('Something went wrong!')
    }

    return (
        <form onSubmit={handleSubmit(processForm)} className="flex flex-col gap-6">
            <div>
                <label htmlFor="name" className="block uppercase text-[10px] xl:text-xs text-[#6C7275] font-bold">Full Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full mt-3 text-sm xl:text-base border border-[#CBCBCB] focus:outline-none focus:ring-transparent focus:border-[#CBCBCB] focus-visible:outline-[#6C7275] placeholder:text-[#6C7275] rounded-md px-4 py-3"
                    {...register('name')}
                />
                {errors.name?.message && (
                    <p className="ml-1 mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block uppercase text-[10px] xl:text-xs text-[#6C7275] font-bold">Email Address</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Your email"
                    className="w-full mt-3 text-sm xl:text-base border border-[#CBCBCB] focus:outline-none focus:ring-transparent focus:border-[#CBCBCB] focus-visible:outline-[#6C7275] placeholder:text-[#6C7275] rounded-md px-4 py-3"
                    {...register('email')}
                />
                {errors.email?.message && (
                    <p className="ml-1 mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="message" className="block uppercase text-[10px] xl:text-xs text-[#6C7275] font-bold">Message</label>
                <textarea
                    id="message"
                    placeholder="Your message"
                    rows={10}
                    className="w-full mt-3 text-sm xl:text-base border border-[#CBCBCB] focus:outline-none focus:ring-transparent focus:border-[#CBCBCB] focus-visible:outline-[#6C7275] placeholder:text-[#6C7275] rounded-md px-4 py-3"
                    {...register('message')}
                ></textarea>
                {errors.message?.message && (
                    <p className="ml-1 mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
            </div>
            <div>
                <button
                    className="bg-black w-full md:w-auto text-white text-xs md:text-sm font-light uppercase px-12 py-4 focus:outline-none focus:ring-transparent focus:border-[#CBCBCB] focus-visible:outline-[#6C7275] rounded-md"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    )
}

export default ContactForm