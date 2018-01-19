import * as React from "react";
import { graphql } from "react-apollo";
import * as gql from "graphql-tag";

const GET_ALL_POSTS = gql`
  query {
    allPosts {
      title
      createdAt
      content
      updatedAt
      author {
        name
      }
      tags {
        name
      }
    }
  }
`;

type Author = {
  id: string;
  name: string;
};

type Tag = {
  name: string;
};

type Post = {
  id: string;
  content: string;
  title: string;
  postVerboseId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  tags: Tag[];
};

const Posts = ({ data }) => {
  return (
    <div>
      {!data.loading &&
        data.allPosts.map((post: Post) => {
          return (
            <div style={{ margin: "20px" }} key={post.id}>
              <div>Author: {post.author.name}</div>
              <h1>{post.title}</h1><small>{post.createdAt}</small>
              <p>{post.content}</p>
              <div>Tags: {post.tags.map((tag: Tag) => tag.name)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default graphql(GET_ALL_POSTS)(Posts);
