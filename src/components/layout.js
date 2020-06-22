/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import MainMenu from './main-menu'
import "./layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <Header siteTitle="{data.site.siteMetadata.title}" />
        <main>{children}</main>
      <footer className="mt-5 mx-0 px-0">
      <div className="divider m-0 p-0">
          </div>
        <div className="container-fluid mx-0">
          <div style={{'font-size': '1em','line-height': '1em'}} className="row justify-content-center">
            <div className="col-12 col-md-3 my-md-4 mt-3 mb-2 text-center footer-address">
              <p className="font-weight-bold m-2">HEARTS AND HANDS OF BAYTOWN</p>
              <p className="m-2">A ministry of Iglesia Cristo Viene</p>
              <address className="m-2">
                307 Cedar Bayou Rd<br />
                Baytown, TX 77520
              </address>
            </div>
            <div className="col-12 col-md-3 my-md-4 mb-4 text-center footer-donate">
              <p className="font-weight-bold pt-3 pt-md-0">DONATE</p>
              <p>Every $1 donated provides enough food for 4 meals.</p>
              <Link to="/donate"><button class="btn">DONATE NOW</button></Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="m-0 py-1" style={{'color':'white', 'font-size':'0.7em'}}>&copy; Hearts and Hands of Baytown. Site by Kiefer Slaton</p>
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
