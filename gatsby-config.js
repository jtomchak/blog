require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Jesse Tomchak',
    siteUrl: `https://jessetomchak.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'content.elementcasting.com/jessetomchak',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        auth: {
          // If you use "JWT Authentication for WP REST API" (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
          // plugin, you can specify user and password to obtain access token and use authenticated requests against wordpress REST API.
          jwt_user: process.env.JWT_USER,
          jwt_pass: process.env.JWT_PASSWORD,
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                    custom_elements: [{ 'content:encoded': edge.node.content }],
                  }
                )
              })
            },
            query: `
            {
              allWordpressPost(
                limit: 1000,
                sort: { order: DESC, fields: [date] }
                  filter:{status : {eq: "publish"} }
              ) {
                edges {
                  node {
                    content
                    slug
                    date
                    title
                    author {
                      id
                      name
                    }
                  }
                }
              }
            }
            `,
            output: 'feeds/rss.xml',
            title: 'Jesse Tomchak RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-purgecss',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
