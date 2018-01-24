import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PT from 'prop-types'

const GET_ALL_POSTS = gql`
  {
    allPosts(orderBy: createdDate_DESC, first: 5) {
      title
      createdDate
      body
      updatedDate
      author {
        name
      }
      tags {
        name
      }
    }
  }
`

const Posts = ({ data }) => (
  <div>
    {!data.loading &&
      data.allPosts.map(post => (
        <div style={{ margin: '20px' }} key={post.id}>
          <div>Author: {post.author.name}</div>
          <h1>{post.title}</h1>
          <small>{post.createdDate}</small>
          <p>{post.body}</p>
          <div>Tags: {post.tags.map(tag => `${tag.name} `)}</div>
        </div>
      ))}
  </div>
)

Posts.propTypes = {
  data: PT.object,
}

export default graphql(GET_ALL_POSTS)(Posts)
