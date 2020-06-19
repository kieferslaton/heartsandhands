/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import MainMenu from './main-menu'
import "./layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <Header siteTitle="{data.site.siteMetadata.title}" />
        <main>{children}</main>
      <footer>
        <div className="container-fluid border-top border-dark">
          <div style={{'font-size': '0.9em','line-height': '1em'}} className="row justify-content-center py-5">
            <div className="col-6 col-md-3 text-center border-right border-dark">
              <p className="font-weight-bold m-2">HEARTS AND HANDS OF BAYTOWN</p>
              <p className="m-2">A ministry of Iglesia Cristo Viene</p>
              <address className="m-2">
                307 Cedar Bayou Rd<br />
                Baytown, TX 77520
              </address>
            </div>
            <div className="col-6 col-md-3 text-center">
              <p className="font-weight-bold">DONATE</p>
              <p>Every $1 donated provides enough food for 4 meals.</p>
              <button class="btn btn-dark">DONATE NOW</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center bg-dark">
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
