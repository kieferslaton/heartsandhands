import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import ReCAPTCHA from "react-google-recaptcha"

import Layout from "../components/layout"
import { SEO } from "../components/seo"

console.log(process.env.GATSBY_STRIPE_API)

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_API)

const DonateForm = props => {
  const [button, setButton] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [isHuman, setIsHuman] = useState(false)
  const [isHumanError, setIsHumanError] = useState("")

  const selectButton = e => {
    setButton(e.target.id)
    console.log(button)
  }

  const handleRecChange = e => {
    if (e.length) {
      setIsHuman(e)
      setIsHumanError("")
    }
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
          break
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
        case "one":
          priceUrl = process.env.GATSBY_ONE_ONCE_URL
          break
        case "five":
          priceUrl = process.env.GATSBY_FIVE_ONCE_URL
          break
        case "ten":
          priceUrl = process.env.GATSBY_TEN_ONCE_URL
          break
        case "twenty":
          priceUrl = process.env.GATSBY_TWENTY_ONCE_URL
          break
        case "fifty":
          priceUrl = process.env.GATSBY_FIFTY_ONCE_URL
          break
        case "one-hundred":
          priceUrl = process.env.GATSBY_ONE_HUNDRED_ONCE_URL
          break
        case "five-hundred":
          priceUrl = process.env.GATSBY_FIVE_HUNDRED_ONCE_URL
          break
        case "one-thousand":
          priceUrl = process.env.GATSBY_ONE_THOUSAND_ONCE_URL
      }
    }

    if (isHuman) {
      setIsHumanError("")

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
    } else {
      setIsHumanError("Please verify that you're human.")
    }
  }

  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <div className="container-fluid p-0" id="donate-hero">
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p className="hero-text fw-bold">Donate</p>
            </div>
          </div>
        </div>
        <div className="container-fluid my-4">
          <div className="row justify-content-center my-1">
            <div className="col-10 col-md-6 text-center my-5">
              <p style={{ "font-size": 20 }}>
                <strong>Every donation</strong> you make helps us provide
                critical basic needs to struggling individuals and families,
                especially now that so many are suffering due to COVID19.
              </p>
              <br />
              <p style={{ "font-size": 20 }}>
                A portion of your gift also goes toward offsetting some of the
                costs of operating these programs, without which none of the
                good work we do would be possible.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 col-md-6 col-xl-4 text-center border border-dark py-4 rounded-lg">
              <p className="fw-bold m-1">Select a Donation Amount</p>
              <p className="m-1">
                You will be redirected to Stripe to finish payment processing.
              </p>
              <div className="my-2">
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "five" ? "donate-btn-active btn-primary" : ""
                  }`}
                  id="five"
                  onClick={selectButton}
                >
                  $5
                </button>
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "ten" ? "donate-btn-active btn-primary" : ""
                  }`}
                  id="ten"
                  onClick={selectButton}
                >
                  $10
                </button>
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "twenty" ? "donate-btn-active btn-primary" : ""
                  }`}
                  id="twenty"
                  onClick={selectButton}
                >
                  $20
                </button>
                <br />
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "fifty" ? "donate-btn-active btn-primary" : ""
                  }`}
                  id="fifty"
                  onClick={selectButton}
                >
                  $50
                </button>
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "one-hundred"
                      ? "donate-btn-active btn-primary"
                      : ""
                  }`}
                  id="one-hundred"
                  onClick={selectButton}
                >
                  $100
                </button>
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "five-hundred"
                      ? "donate-btn-active btn-primary"
                      : ""
                  }`}
                  id="five-hundred"
                  onClick={selectButton}
                >
                  $500
                </button>
                <button
                  className={`btn btn-outline-primary rounded-circle donate-btn m-1 m-sm-2 ${
                    button === "one-thousand"
                      ? "donate-btn-active btn-primary"
                      : ""
                  }`}
                  id="one-thousand"
                  onClick={selectButton}
                >
                  $1000
                </button>
                <br />
                <br />
                <button
                  className={`btn btn-outline-primary rounded-left m-0 ${
                    recurring ? "" : "toggle-btn-active btn-primary"
                  }`}
                  onClick={() => setRecurring(false)}
                >
                  One-Time
                </button>
                <button
                  className={`btn btn-outline-primary rounded-right m-0 ${
                    recurring ? "toggle-btn-active btn-primary" : ""
                  }`}
                  onClick={() => setRecurring(true)}
                >
                  Monthly
                </button>
                <br />
                <br />
                <div className="flex-full">
                  <ReCAPTCHA
                    sitekey="6LdcGWgaAAAAANt_RNlRdu-0k9KMVun4HQ67h1jD"
                    onChange={handleRecChange}
                    className="captcha"
                  />
                  <small style={{ color: "#ED4337" }}>{isHumanError}</small>
                </div>
                <button
                  className="btn w-50 btn-outline-primary"
                  onClick={handleSubmit}
                >
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

export const Head = () => <SEO />
