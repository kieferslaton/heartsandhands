import React, { useEffect } from "react"
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

  useEffect(() => {
    var accordionItems = [...document.querySelectorAll(".accordion-item")]
    accordionItems.forEach((item, index) => {
      console.log(item)
      var header = item.querySelector("h5")
      var headerText = header.innerText
      var checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.id = headerText.replaceAll(" ", "_").toLowerCase()
      checkbox.checked = false
      var label = document.createElement("label")
      label.htmlFor = checkbox.id
      label.innerText = headerText
      item
        .querySelector(".wp-block-group__inner-container")
        .insertBefore(label, header)
      item
        .querySelector(".wp-block-group__inner-container")
        .insertBefore(checkbox, label)
      item.querySelector(".wp-block-group__inner-container").removeChild(header)
    })
  }, [])

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
