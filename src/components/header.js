import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import logo from '../images/Logo.png'

const Header = (props) => {
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
  const {title, url} = data.wpgraphql.generalSettings
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
      ...item,
      url: item.url.replace(url, "")
  }))

  return(
    <>
      <div id="covid-banner" className="bg-dark p-0 mb-1 text-center">
          <button class="btn btn-dark w-100 text-uppercase p-0">Click here to see how the food bank is responding to COVID-19.</button>
      </div>
      <nav className="navbar navbar-light navbar-expand-md m-0 px-0 py-1">
         <Link to="/"><a className="navbar-brand text-center mx-1 mx-lg-5"><img className="m-0" style={{'height': 60}} src={logo} /></a></Link>
         <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar">
           <span class="icon-bar top-bar"></span>
           <span class="icon-bar middle-bar"></span>
           <span class="icon-bar bottom-bar"></span>
         </button>
         <div className="collapse navbar-collapse justify-content-end mx-5" id="navbar">
           <ul className="navbar-nav text-center">
             {items.map(item => (
               <li className="nav-item my-0">
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


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
}

export default Header
