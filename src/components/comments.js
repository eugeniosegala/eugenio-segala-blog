import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Comments = ({ pathname }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          comments {
            repo
            repoId
            category
            categoryId
            mapping
            strict
            reactionsEnabled
            inputPosition
            theme
            lang
          }
        }
      }
    }
  `)

  const commentsConfig = site.siteMetadata.comments
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      !commentsConfig?.repo ||
      !commentsConfig?.repoId ||
      !commentsConfig?.categoryId
    ) {
      return
    }

    const container = containerRef.current

    if (!container) {
      return
    }

    container.innerHTML = ``

    const script = document.createElement(`script`)
    script.src = `https://giscus.app/client.js`
    script.async = true
    script.crossOrigin = `anonymous`
    script.setAttribute(`data-repo`, commentsConfig.repo)
    script.setAttribute(`data-repo-id`, commentsConfig.repoId)
    script.setAttribute(`data-category`, commentsConfig.category || ``)
    script.setAttribute(`data-category-id`, commentsConfig.categoryId)
    script.setAttribute(`data-mapping`, commentsConfig.mapping || `pathname`)
    script.setAttribute(`data-strict`, commentsConfig.strict || `0`)
    script.setAttribute(
      `data-reactions-enabled`,
      commentsConfig.reactionsEnabled || `1`
    )
    script.setAttribute(`data-emit-metadata`, `0`)
    script.setAttribute(
      `data-input-position`,
      commentsConfig.inputPosition || `bottom`
    )
    script.setAttribute(`data-theme`, commentsConfig.theme || `dark_dimmed`)
    script.setAttribute(`data-lang`, commentsConfig.lang || `en`)
    script.setAttribute(`data-loading`, `lazy`)

    container.appendChild(script)

    return () => {
      container.innerHTML = ``
    }
  }, [commentsConfig, pathname])

  if (!commentsConfig?.repo || !commentsConfig?.repoId || !commentsConfig?.categoryId) {
    return null
  }

  return (
    <section className="blog-post-comments" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Comments</h2>
      <div className="giscus" ref={containerRef} />
      <noscript>
        Enable JavaScript to view the comments or join the discussion on{" "}
        <a href={`https://github.com/${commentsConfig.repo}/discussions`}>
          GitHub Discussions
        </a>
        .
      </noscript>
    </section>
  )
}

export default Comments
