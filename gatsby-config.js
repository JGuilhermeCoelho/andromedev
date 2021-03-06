require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Andromedev`,
    description: `Andromedev OpendevUFCG 2020.`,
    author: `OpenDevUFCG`,
    url: "https://andromedev.opendevufcg.org/",
    twitterUsername: "@OpenDevUFCG",
    image: "https://i.imgur.com/mYBvYiQ.png",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layouts/layout.js"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Andromedev OpenDevUFCG`,
        short_name: `andromedev`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            subsets: [`latin`, `latin-ext`],
            variants: [`400`, `400i`, `700`, `700i`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon: `<svg fill="#451464" aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            },
          },
          "gatsby-remark-relative-links",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "UA-173131386-1",
        head: false,
        anonymize: true,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `${process.env.PRISMIC_PROJECT}`,
        accessToken: `${process.env.PRISMIC_KEY}`,
        linkResolver: ({ field, value, node}) => doc => {
          if (doc.type === 'organization')
            return `organization/${doc.uid}`
          return `/${doc.uid}`
        },
        schemas: {
          organization: require('./src/schemas/org.json'),
          project: require('./src/schemas/project.json')
        },
      },
    },
  ],
};
