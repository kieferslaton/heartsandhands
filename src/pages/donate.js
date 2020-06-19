import React, {useState} from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import axios from "axios"

import Layout from "../components/layout"

const stripePromise = loadStripe(
  "pk_test_51GvjsmGJc8kSpHFEbHieh4gp0n0NoORy1LLt9u7y5wJ4gFmLSmZALU0Qjyb88bYAN4dWtwHoY4YYVAcZtFqxpBsG00x3ZpbIdX"
)

const DonateForm = props => {
    const [button, setButton] = useState('')
    const [recurring, setRecurring] = useState(false)

    const selectButton = (e) => {
        setButton(e.target.id);
        console.log(button)
    }

  const handleSubmit = async e => {
    e.preventDefault();

    let priceUrl = ""
    let paymentMode = ""

    if(recurring){
        paymentMode = "subscription"
        switch(button) {
            case "five":
                priceUrl = "price_1GvmQvGJc8kSpHFEAy7oHKGz";
                break;
            case "ten":
                priceUrl = "price_1GvmSCGJc8kSpHFEkYUUdg0Z";
                break;
            case "twenty":
                priceUrl = "price_1GvmSdGJc8kSpHFEQCan7Nbu";
        }
    } else {
        paymentMode = "payment"
    switch(button) {
        case "five":
            priceUrl = "price_1GvlatGJc8kSpHFEWeGppmrw";
            break;
        case "ten":
            priceUrl = "price_1Gvlr8GJc8kSpHFEJSGWEvCW";
            break;
        case "twenty":
            priceUrl = "price_1GvlrjGJc8kSpHFEDHD5xe5f";
    }
    }

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceUrl, quantity: 1 }],
      mode: paymentMode,
      successUrl: `${window.location.origin}/page-2/`,
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
              <p
                className="font-weight-bold"
                style={{ color: "white", fontSize: 85, lineHeight: '70px' }}
              >
                Donate
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid my-4">
        <div className="row justify-content-center my-1">
              <div className="col-10 col-md-6 text-center my-5">
                <p style={{ "font-size": 25 }}>HHB runs completely on donations. Offer your help today.</p>
              </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 col-md-6 text-center border border-dark py-4 rounded-lg">
                <p className="font-weight-bold m-1">Select a Donation Amount</p>
                <p className="m-1">You will be redirected to Stripe to finish payment processing.</p>
                <div className="my-2">
              <button className={`btn donate-btn m-2 ${button === 'five' ? 'donate-btn-active' : ''}`} id="five" onClick={selectButton}>
                $5
              </button>
              <button className={`btn donate-btn m-2 ${button === 'ten' ? 'donate-btn-active' : ''}`} id="ten" onClick={selectButton}>
                $10
              </button>
              <button className={`btn donate-btn m-2 ${button === 'twenty' ? 'donate-btn-active' : ''}`} id="twenty" onClick={selectButton}>
                $20
              </button>
              <br />
              <br />
              <button className={`btn toggle-btn rdl border-right m-0 ${recurring ? '' : 'toggle-btn-active'}`} onClick={() => setRecurring(false)}>One-Time</button>
              <button className={`btn toggle-btn rdr m-0 ${recurring ? 'toggle-btn-active' : ''}`} onClick={() => setRecurring(true)}>Monthly</button>
              <br />
              <br />
              <button className="btn btn-dark w-50" onClick={handleSubmit}>
                  Go
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
