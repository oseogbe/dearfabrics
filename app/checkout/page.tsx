import { Country, State } from "country-state-city"

import Container from "@/components/Container"
import CheckoutClient from "./CheckoutClient"

const CheckoutPage = () => {
    const countries = Country.getAllCountries()
    const country = "NG"
    const states = State.getStatesOfCountry(country)
    const state = states[0].isoCode

    const subtotal = 150000
    const shipping = 5000
    const tax = 8000
    const discount = 3000
    const total = 160000

    return (
        <Container>
            <CheckoutClient
                countries={countries}
                country={country}
                states={states}
                state={state}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
            />
        </Container>
    )
}

export default CheckoutPage