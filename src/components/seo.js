/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, image, lang, meta, title, type }) => {
  const { defaultImage, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        defaultImage: file(relativePath: { eq: "default-post-thumbnail.jpg" }) {
          childImageSharp {
            resize(width: 1200, height: 630, fit: COVER, quality: 90) {
              src
              width
              height
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const resolvedTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const resolvedImage = image || defaultImage?.childImageSharp?.resize
  const imageUrl = resolvedImage
    ? new URL(resolvedImage.src, site.siteMetadata.siteUrl).toString()
    : null

  return (
    <>
      <html lang={lang} />
      <title>{resolvedTitle}</title>
      {[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: resolvedTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        imageUrl && {
          property: `og:image`,
          content: imageUrl,
        },
        imageUrl &&
          resolvedImage?.width && {
            property: `og:image:width`,
            content: String(resolvedImage.width),
          },
        imageUrl &&
          resolvedImage?.height && {
            property: `og:image:height`,
            content: String(resolvedImage.height),
          },
        {
          name: `twitter:card`,
          content: imageUrl ? `summary_large_image` : `summary`,
        },
        {
          name: `twitter:title`,
          content: resolvedTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        imageUrl && {
          name: `twitter:image`,
          content: imageUrl,
        },
      ]
        .filter(Boolean)
        .concat(meta)
        .map((tag, index) => (
          <meta
            key={`${tag.name || tag.property || `meta`}-${index}`}
            {...tag}
          />
        ))}
    </>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  image: null,
  type: `website`,
}

Seo.propTypes = {
  description: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  type: PropTypes.string,
}

export default Seo
