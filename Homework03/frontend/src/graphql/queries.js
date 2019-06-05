import { gql } from "apollo-boost";

export const POSTS_QUERY = gql`
    query {
      users {
        name
        id
        posts {
          id
          title
          body
        }
      }
      posts {
        title
        body
        author {
          name
        }
        published
      }
    }
  `,
  USERS_QUERY = gql`
    query {
      users {
        id
        name
      }
    }
  `;

//gql可以產生你要的template
