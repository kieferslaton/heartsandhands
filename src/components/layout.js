/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FaFacebookF, FaEnvelope } from "react-icons/fa"

import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle="{data.site.siteMetadata.title}" />
      <main>{children}</main>
      <footer className="mt-5 mx-0 px-0">
        <div className="divider m-0 p-0"></div>
        <div className="container-fluid mx-0">
          <div
            style={{ fontSize: "1em", lineHeight: "1em" }}
            className="row justify-content-center"
          >
            <div className="col-12 col-md-6 my-md-4 mt-3 mb-2 text-center footer-address">
              <p className="font-weight-bold m-2">
                HEARTS AND HANDS OF BAYTOWN
              </p>
              <p className="m-2 font-weight-bold">
                A ministry of Iglesia Cristo Viene
              </p>
              <address className="m-3">
                307 Cedar Bayou Rd
                <br />
                Baytown, TX 77520
              </address>
              <p>
                Client Choice Fresh Market -{" "}
                <a className="footer-link" href="tel:8325978917">
                  832-597-8908
                </a>
              </p>
              <p>
                Food for Change Fresh market -{" "}
                <a className="footer-link" href="tel:3467152209">
                  346-715-2209
                </a>
              </p>
              <div className="row justify-content-center">
                <a href="https://www.facebook.com/Hearts-and-Hands-of-Baytown-1393938504192742/">
                  <FaFacebookF size={20} className="footer-icon" />
                </a>
                <a href="mailto:heartsandhandsofbaytown@gmail.com">
                  <FaEnvelope size={20} className="footer-icon" />
                </a>
              </div>
            </div>
            <div className="col-12 col-md-3 my-md-4 mb-4 text-center footer-donate">
              <p className="font-weight-bold pt-3 pt-md-0">DONATE</p>
              <p>Help us make a difference.</p>
              <Link to="/donate">
                <button className="btn btn-highlight">DONATE NOW</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p
                className="m-0 py-1"
                style={{ color: "white", fontSize: "0.7em" }}
              >
                &copy; Hearts and Hands of Baytown. Site by Kiefer Slaton
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
