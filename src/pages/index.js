import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.author.name
  const posts = data.allMarkdownRemark.nodes
  const defaultThumbnail = getImage(data.defaultThumbnail)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>No posts found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const thumbnail = getImage(post.frontmatter.thumbnail) || defaultThumbnail
          const hasCustomThumbnail = Boolean(post.frontmatter.thumbnail)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                {thumbnail && (
                  <Link
                    className="post-list-item-thumbnail"
                    to={post.fields.slug}
                    itemProp="url"
                    aria-label={`Read ${title}`}
                  >
                    <GatsbyImage
                      image={thumbnail}
                      alt={hasCustomThumbnail ? title : ""}
                    />
                  </Link>
                )}
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo />

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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          title
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 320
                height: 180
                placeholder: BLURRED
                transformOptions: { fit: COVER }
              )
            }
          }
        }
      }
    }
    defaultThumbnail: file(relativePath: { eq: "default-post-thumbnail.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          height: 180
          placeholder: BLURRED
          transformOptions: { fit: COVER }
        )
      }
    }
  }
`
