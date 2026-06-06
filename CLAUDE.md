# CLAUDE.md

## Project overview

Personal blog for Eugenio Segala — built with Gatsby 5, React 19, and Markdown. Deployed on Netlify at https://eugeniosegala.dev/.

## Tech stack

- **Framework**: Gatsby 5
- **UI**: React 19, vanilla CSS (`src/style.css`, `src/normalize.css`)
- **Content**: Markdown with YAML frontmatter, processed by `gatsby-transformer-remark`
- **Comments**: Giscus (GitHub Discussions-based)
- **Code highlighting**: PrismJS
- **Formatting**: Prettier
- **Node**: 22.x (managed via Volta)
- **Hosting**: Netlify

## Common commands

```sh
npm run develop   # Start dev server (gatsby develop)
npm run build     # Production build (gatsby build)
npm run serve     # Serve production build locally
npm run clean     # Clear Gatsby cache
npm run format    # Run Prettier on all files
```

## Project structure

```
content/blog/         # Blog posts — each post is a folder with index.md + assets
src/
  components/         # Reusable components (bio, layout, seo, comments)
  pages/              # Route pages (index, 404)
  templates/          # Page templates (blog-post)
  images/             # Static images (profile pic, site icon)
  style.css           # Global styles
  normalize.css       # CSS reset
gatsby-config.js      # Site metadata, plugin configuration
gatsby-node.js        # Programmatic page creation
gatsby-browser.js     # Browser-side Gatsby APIs
netlify.toml          # Netlify deploy configuration
```

## Blog post conventions

- Each post lives in `content/blog/<slug>/index.md`
- Frontmatter fields: `title`, `date`, `description`
- Images go alongside `index.md` in the same folder
- External links open in new tab with `nofollow` (via `gatsby-remark-external-links`)
