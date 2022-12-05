import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

import { SEO } from "../components/seo"

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`

const Page = ({ data }) => {
  const page = data.wpPage
  return (
    <Layout>
      <div
        className="container-fluid p-0 hero"
        style={{
          background: page.featuredImage
            ? `url(${page.featuredImage.node.sourceUrl})`
            : "black",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="row h-100 align-items-center overlay m-0">
          <div className="col-12 text-center align-items-center">
            <p className="hero-text fw-bold">{page.title}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div
              className="my-4 mx-2 content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const Head = () => <SEO />
