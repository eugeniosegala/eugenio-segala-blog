import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.author.name
  const { previous, next } = data
  const thumbnail = getImage(post.frontmatter.thumbnail) || getImage(data.defaultThumbnail)
  const hasCustomThumbnail = Boolean(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        {thumbnail && (
          <GatsbyImage
            className="blog-post-thumbnail"
            image={thumbnail}
            alt={hasCustomThumbnail ? post.frontmatter.title : ""}
          />
        )}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {"<"} Previous
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                Next {">"}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data }) => {
  const post = data.markdownRemark
  const image = post.frontmatter.thumbnail?.childImageSharp?.resize

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      image={image}
      type="article"
    />
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 960
              height: 540
              placeholder: BLURRED
              transformOptions: { fit: COVER }
            )
            resize(width: 1200, height: 630, fit: COVER, quality: 90) {
              src
              width
              height
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    defaultThumbnail: file(relativePath: { eq: "default-post-thumbnail.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 960
          height: 540
          placeholder: BLURRED
          transformOptions: { fit: COVER }
        )
      }
    }
  }
`
