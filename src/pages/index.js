import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import splash1 from "../images/splash1.jpg"
import splash2 from "../images/splash2.jpg"
import splash3 from "../images/splash3.jpg"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container-fluid p-0 m-0" id="hero">
      <div className="row align-items-center h-100 m-0 p-0 overlay">
        <div className="col-xl-6 col-lg-7 col-md-10 mx-auto mt-3 text-center">
          <p
            className="font-weight-bold hero-text"
          >
            No one should have to go hungry.
          </p>
          <p className="hero-sub">
            HHB Fresh Market provides food for families in a dignified and
            supportive manner.
          </p>
        </div>
      </div>
      </div>
      <div className="container-fluid p-0 m-0">
      <div className="row justify-content-center pt-5 pb-4">
        <div className="col-xl-4 col-lg-6 col-md-10 text-center mx-3">
          <p style={{ "font-size": 25 }}>
            Our mission is to share the love of Christ through the work of our
            hands in serving the church, community and beyond.
          </p>
        </div>
      </div>
      <div id="hero2">
        <div className="row justify-content-center overlay m-0">
          <div className="col-10 col-sm-7 col-md-3 col-xl-2 text-center p-0 pb-3 my-4 mx-2 splash">
            <img className="img-fluid w-100" src={splash1} alt="splash1" />
            <h2>GIVE</h2>
            <p className="mx-3">
              Make a lasting impact. Donate today to the fight against hunger.
            </p>
            <Link to="/donate"><button class="btn">LEARN MORE</button></Link>
          </div>
          <div className="col-10 col-sm-7 col-md-3 col-xl-2 text-center p-0 pb-3 my-4 mx-2 splash">
            <img className="img-fluid w-100" src={splash2} alt="splash2" />
            <h2>VOLUNTEER</h2>
            <p className="mx-3">
              Find out how you can help us get food to the people who need it.
            </p>
            <Link to="/programs"><button class="btn">LEARN MORE</button></Link>
          </div>
          <div className="col-10 col-sm-7 col-md-3 col-xl-2 text-center p-0 pb-3 my-4 mx-2 splash">
            <img className="img-fluid w-100" src={splash3} alt="splash3" />
            <h2>GET HELP</h2>
            <p className="mx-3">Need local assistance? We're here to help.</p>
            <Link to="/calendar"><button class="btn">LEARN MORE</button></Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
