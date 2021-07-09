import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

const Programs = () => {
  const width = useWindowSize().width

  const data = useStaticQuery(graphql`
    {
      wpcontent {
        programs {
          nodes {
            content
            id
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `)

  const programs = data.wpcontent.programs.nodes

  if (width > 800) {
    return (
      <Layout>
        <SEO title="Programs" />
        <div className="container-fluid p-0" id="program-hero">
          <div className="row h-100 align-items-center overlay m-0">
            <div className="col-12 text-center align-items-center">
              <p className="fw-bold hero-text">Programs</p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {programs.map(program => (
            <div className="row justify-content-center program my-5">
              <div className="col-7 col-lg-6 my-auto pb-5">
                <p style={{ "font-size": "1.5em" }} className="fw-bold">
                  {program.title}
                </p>
                <div
                  style={{ "font-size": "0.9em" }}
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              </div>
              <div className="col-4 col-lg-3 my-auto pb-5">
                <img
                  style={{ maxHeight: 250 }}
                  className="img-fluid"
                  src={program.featuredImage.node.sourceUrl}
                  alt="featured"
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
              <p className="fw-bold hero-text">Programs</p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          {programs.map(program => (
            <div className="row justify-content-center program my-4">
              <div className="col-8 pb-3 text-center">
                <img
                  className="img-fluid"
                  src={program.featuredImage.sourceUrl}
                  alt="featured"
                />
              </div>
              <div className="col-11">
                <p style={{ "font-size": "1.5em" }} className="fw-bold">
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
