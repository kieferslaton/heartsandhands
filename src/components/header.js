import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"

import logo from "../images/Logo.png"

const Header = props => {
  const data = useStaticQuery(graphql`
    {
      wp {
        generalSettings {
          title
          url
        }
      }
      wpMenu(id: { eq: "dGVybToxMg==" }) {
        id
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      }
    }
  `)
  const items = data.wpMenu.menuItems.nodes

  return (
    <>
      <nav className="navbar navbar-expand-md m-0 px-0 py-1">
        <Link to="/" className="navbar-brand text-center mx-1 mx-lg-5">
          <img className="m-0" style={{ height: 60 }} src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
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
                <Link
                  className="nav-link text-primary"
                  to={item.path}
                  key={item.id}
                >
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
