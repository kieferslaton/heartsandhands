import React from 'react'
import Layout from '../components/layout'
import {graphql} from 'gatsby'

import SEO from '../components/seo'

export const query = graphql`
query ($id: ID!) {
    wpgraphql {
      page(id: $id){
        title
        content
        featuredImage {
          sourceUrl
        }
      }
    }
  }
  `

const Page = ({data}) => {
    const page = data.wpgraphql.page
    return(
    <Layout>
      <SEO title={page.title} />
      <div className="container-fluid p-0 hero" style={{background: page.featuredImage ? `url(${page.featuredImage.sourceUrl})` : 'black'}}>
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p
                className="hero-text font-weight-bold"
              >
                {page.title}
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
        <div className="row justify-content-center">
    <div className="col-12 col-md-8">
        <div className="my-4 mx-2 content" dangerouslySetInnerHTML={{__html: page.content}} />
    </div>
    </div>
    </div>
    </Layout>
    )
}

export default Page