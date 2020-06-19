import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'

const MainMenu = () => {
    const data = useStaticQuery(graphql`
    query {
        wpgraphql {
            generalSettings{
                title
                url
            }
          menu(id: "bmF2X21lbnU6Mg==") {
            menuItems{
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
        <nav className="navbar navbar-light navbar-expand-md">
            
        </nav>
    )
}

export default MainMenu