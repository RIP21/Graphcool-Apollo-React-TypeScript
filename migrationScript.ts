import axios from "axios";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import gql from "graphql-tag";

type Author = {
  id;
  authorName;
};

type OldPost = {
  id: string;
  title: string;
  body: string;
  description: string;
  previewPic: string;
  author: Author;
  postdate: Date;
  editDate: Date;
  published: boolean;
};

class NewPost {
  id: String;
  createdDate: Date;
  title: string;
  body: string;
  description: string;
  published: Boolean;
  updatedDate: Date;
  url: string;
  postVerboseId: string;
  previewPic: string;

  constructor(
    title,
    body,
    description,
    published,
    createdDate,
    updatedDate,
    url,
    postVerboseId,
    previewPic
  ) {
    this.title = title;
    this.body = body;
    this.description = description;
    this.published = published;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.url = url;
    this.postVerboseId = postVerboseId;
    this.previewPic = previewPic;
  }
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjckqtb9k4a570187cy41x9at",
    fetch: fetch,
  }),
  cache: new InMemoryCache()
});

// axios
//   .get("http://ololos.space/api/posts?size=50")
//   .then(({ data }) => {
//     const posts: OldPost[] = data._embedded.posts;
//     posts.forEach(post => {
//       const newPost = new NewPost(
//         post.title,
//         post.body,
//         post.postdate,
//         post.postdate,
//         `/${post.id}`,
//         post.id,
//         post.previewPic
//       )
//       client
//         .mutate({
//           variables: {...newPost},
//           mutation: gql`
//             mutation(
//               $title: String!
//               $body: String!
//               $url: String!
//               $createdDate: DateTime!
//               $updatedDate: DateTime!
//               $postVerboseId: String!
//               $previewPic: String
//             ) {
//               createPost(
//                 title: $title
//                 body: $body
//                 url: $url
//                 createdDate: $createdDate
//                 updatedDate: $updatedDate
//                 postVerboseId: $postVerboseId
//                 previewPic: $previewPic
//               ) {
//                 title
//               }
//             }
//           `
//         })
//         .then(response => console.log(response.data.createPost.title))
//         .catch(console.log);
//     });
//   })
//   .catch(console.log);

axios.get("http://ololos.space/api/posts?size=50").then(({ data }) => {
  const posts: OldPost[] = data._embedded.posts;
  client
    .query({
      query: gql`
        query {
          allPosts {
            id
            description
            published
            postVerboseId
          }
        }
      `
    })
    .then((response: any) => {
      const newPosts = posts.map(post => {
        return new NewPost(
          post.title,
          post.body,
          post.description,
          post.published,
          post.postdate,
          post.postdate,
          `/${post.id}`,
          post.id,
          post.previewPic
        );
      });
      const updatedPosts = newPosts.map(newPost => {
        const [donorPost] = response.data.allPosts.filter(
          (currentPost: NewPost) =>
            newPost.postVerboseId === currentPost.postVerboseId
        );
        return { ...newPost, published: donorPost.published, id: donorPost.id };
      });
      updatedPosts.forEach(update);
    })
    .catch(console.log);
});

const update = newPost =>
  client
    .mutate({
      variables: { ...newPost },
      mutation: gql`
        mutation(
          $id: ID!
          $title: String!
          $body: String!
          $description: String!
          $published: Boolean!
          $url: String!
          $createdDate: DateTime!
          $updatedDate: DateTime!
          $postVerboseId: String!
          $previewPic: String
        ) {
          updatePost(
            id: $id
            title: $title
            body: $body
            description: $description
            published: $published
            url: $url
            createdDate: $createdDate
            updatedDate: $updatedDate
            postVerboseId: $postVerboseId
            previewPic: $previewPic
          ) {
            title
          }
        }
      `
    })
    .then(response => console.log(response.data.updatePost.title))
    .catch(console.log);
