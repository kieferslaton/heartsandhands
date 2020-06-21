import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const useWindowSize = () => {
  const isClient = typeof window === "object"
  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize.width
}

const Programs = () => {
  const width = useWindowSize()

  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        programs {
          nodes {
            content
            id
            title
            featuredImage {
              sourceUrl
            }
          }
        }
      }
    }
  `)

  const programs = data.wpgraphql.programs.nodes

  if (width > 800) {
    return (
      <Layout>
        <SEO title="Programs" />
        <div className="container-fluid p-0" id="program-hero">
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p
                className="font-weight-bold hero-text"
              >
                Programs
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {programs.map(program => (
            <div className="row justify-content-center program my-4">
              <div className="col-7 col-lg-6 my-auto">
                <p
                  style={{ "font-size": "1.5em" }}
                  className="font-weight-bold"
                >
                  {program.title}
                </p>
                <div
                  style={{ "font-size": "0.9em" }}
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              </div>
              <div className="col-4 col-lg-3 my-auto">
                <img
                  className="img-fluid"
                  src={program.featuredImage.sourceUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <SEO title="Programs" />
        <div className="container-fluid p-0" id="program-hero">
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p
                className="font-weight-bold hero-text"
              >
                Programs
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {programs.map(program => (
            <div className="row justify-content-center program my-4">
              <div className="col-8">
                <img
                  className="img-fluid"
                  src={program.featuredImage.sourceUrl}
                />
              </div>
              <div className="col-11">
                <p
                  style={{ "font-size": "1.5em" }}
                  className="font-weight-bold"
                >
                  {program.title}
                </p>
                <div
                  style={{ "font-size": "0.9em" }}
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default Programs
