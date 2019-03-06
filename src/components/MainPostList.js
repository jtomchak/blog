import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props
    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-3">{title}</h1>
          </div>
          {posts.map(({ node: post }) => (
            <div
              className="content"
              style={{
                borderBottom: '1px solid #eaecee',
                paddingBottom: '30px',
              }}
              key={post.id}
            >
              <p>
                <span
                  className="has-text-primary is-size-3"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <br />
                <span> &bull; </span>
                <small>{post.date}</small>
              </p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
                <div style={{ marginTop: '10px' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment MainPostListFields on wordpress__POST {
    id
    title
    excerpt
    content
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    month: date(formatString: "MM")
    year: date(formatString: "YYYY")
    slug
  }
`
