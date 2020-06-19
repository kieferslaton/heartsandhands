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
      }
    }
  }
  `

const Page = ({data}) => {
    const page = data.wpgraphql.page
    return(
    <Layout>
      <SEO title={page.title} />
    <div>
        <div dangerouslySetInnerHTML={{__html: page.content}} />
    </div>
    </Layout>
    )
}

export default Page