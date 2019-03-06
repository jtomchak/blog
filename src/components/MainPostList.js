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
            <div className="content" key={post.id}>
              <p>
                <span
                  className="has-text-primary is-size-3"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
                <div style={{ marginTop: '10px' }} />
                <Link
                  className="button is-text is-small is-outlined"
                  to={`${post.year}/${post.month}/${post.slug}`}
                >
                  {post.date}
                </Link>
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
    date(formatString: "MMMM YYYY")
    month: date(formatString: "MM")
    year: date(formatString: "YYYY")
    slug
  }
`
