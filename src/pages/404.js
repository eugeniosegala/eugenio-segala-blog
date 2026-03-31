import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.author.name

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found 🤖</h1>
      <p>You just reached a page that does not exist...</p>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <Seo title="404: Not Found" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`
