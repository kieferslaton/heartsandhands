import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"

import logo from "../images/Logo.png"

const Header = props => {
  const data = useStaticQuery(graphql`
    {
      wpgraphql {
        generalSettings {
          title
          url
        }
        menu(id: "bmF2X21lbnU6Mg==") {
          menuItems {
            nodes {
              id
              url
              label
            }
          }
        }
      }
    }
  `)
  const { title, url } = data.wpgraphql.generalSettings
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  return (
    <>
      <div id="covid-banner" className="bg-dark py-1 mb-1 text-center">
        <Link to="/covid-19-response">
          <button className="btn btn-dark w-100 text-uppercase py-0 px-1">
            Click here to see how we are responding to COVID-19.
          </button>
        </Link>
      </div>
      <nav className="navbar navbar-expand-md m-0 px-0 py-1">
        <Link to="/">
          <a href="#" className="navbar-brand text-center mx-1 mx-lg-5">
            <img className="m-0" style={{ height: 60 }} src={logo} alt="logo" />
          </a>
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="icon-bar top-bar"></span>
          <span className="icon-bar middle-bar"></span>
          <span className="icon-bar bottom-bar"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end mx-5"
          id="navbar"
        >
          <ul className="navbar-nav text-center mx-auto mx-md-0">
            {items.map(item => (
              <li key={item.id} className="nav-item my-0">
                <Link className="nav-link" to={item.url} key={item.id}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
