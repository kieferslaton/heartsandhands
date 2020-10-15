import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import Layout from "../components/layout"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_API)

const DonateForm = props => {
  const [button, setButton] = useState("")
  const [recurring, setRecurring] = useState(false)

  const selectButton = e => {
    setButton(e.target.id)
    console.log(button)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    let priceUrl = ""
    let paymentMode = ""

    if (recurring) {
      paymentMode = "subscription"
      switch (button) {
        case "one":
          priceUrl = process.env.GATSBY_ONE_RECURRING_URL
        case "five":
          priceUrl = process.env.GATSBY_FIVE_RECURRING_URL
          break
        case "ten":
          priceUrl = process.env.GATSBY_TEN_RECURRING_URL
          break
        case "twenty":
          priceUrl = process.env.GATSBY_TWENTY_RECURRING_URL
          break
        case "fifty":
          priceUrl = process.env.GATSBY_FIFTY_RECURRING_URL
          break
        case "one-hundred":
          priceUrl = process.env.GATSBY_ONE_HUNDRED_RECURRING_URL
          break
        case "five-hundred":
          priceUrl = process.env.GATSBY_FIVE_HUNDRED_RECURRING_URL
          break
        case "one-thousand":
          priceUrl = process.env.GATSBY_ONE_THOUSAND_RECURRING_URL
      }
    } else {
      paymentMode = "payment"
      switch (button) {
        case "five":
          priceUrl = process.env.GATSBY_FIVE_ONCE_URL
          break
        case "ten":
          priceUrl = process.env.GATSBY_TEN_ONCE_URL
          break
        case "twenty":
          priceUrl = process.env.GATSBY_TWENTY_ONCE_URL
      }
    }

    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceUrl, quantity: 1 }],
      mode: paymentMode,
      successUrl: `${window.location.origin}/thank-you/`,
      cancelUrl: `${window.location.origin}/donate`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <div className="container-fluid p-0" id="donate-hero">
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p className="hero-text font-weight-bold">Donate</p>
            </div>
          </div>
        </div>
        <div className="container-fluid my-4">
          <div className="row justify-content-center my-1">
            <div className="col-10 col-md-6 text-center my-5">
              <p style={{ "font-size": 20 }}>
                <strong>Every donation</strong> you make helps us provide critical basic needs to struggling individuals and families, especially now that so many are suffering due to COVID19.
              </p>
              <br />
              <p style={{ "font-size": 20 }}>
                A portion of your gift also goes toward offsetting some of the costs of operating these programs, without which none of the good work we do would be possible.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 col-md-6 col-xl-4 text-center border border-dark py-4 rounded-lg">
              <p className="font-weight-bold m-1">Select a Donation Amount</p>
              <p className="m-1">
                You will be redirected to Stripe to finish payment processing.
              </p>
              <div className="my-2">
              <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "one" ? "donate-btn-active" : ""
                  }`}
                  id="one"
                  onClick={selectButton}
                >
                  $1
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "five" ? "donate-btn-active" : ""
                  }`}
                  id="five"
                  onClick={selectButton}
                >
                  $5
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "ten" ? "donate-btn-active" : ""
                  }`}
                  id="ten"
                  onClick={selectButton}
                >
                  $10
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "twenty" ? "donate-btn-active" : ""
                  }`}
                  id="twenty"
                  onClick={selectButton}
                >
                  $20
                </button>
                <br />
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "fifty" ? "donate-btn-active" : ""
                  }`}
                  id="fifty"
                  onClick={selectButton}
                >
                  $50
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "one-hundred" ? "donate-btn-active" : ""
                  }`}
                  id="one-hundred"
                  onClick={selectButton}
                >
                  $100
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "five-hundred" ? "donate-btn-active" : ""
                  }`}
                  id="five-hundred"
                  onClick={selectButton}
                >
                  $500
                </button>
                <button
                  className={`btn donate-btn m-1 m-sm-2 ${
                    button === "one-thousand" ? "donate-btn-active" : ""
                  }`}
                  id="one-thousand"
                  onClick={selectButton}
                >
                  $1000
                </button>
                <br />
                <br />
                <button
                  className={`btn toggle-btn rdl m-0 ${
                    recurring ? "" : "toggle-btn-active"
                  }`}
                  onClick={() => setRecurring(false)}
                >
                  One-Time
                </button>
                <button
                  className={`btn toggle-btn rdr m-0 ${
                    recurring ? "toggle-btn-active" : ""
                  }`}
                  onClick={() => setRecurring(true)}
                >
                  Monthly
                </button>
                <br />
                <br />
                <button className="btn w-50" onClick={handleSubmit}>
                  GO
                </button>
              </div>
            </div>
          </div>
        </div>
      </Elements>
    </Layout>
  )
}

export default DonateForm
