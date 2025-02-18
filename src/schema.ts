export const typeDefs = `#graphql

  type Query {
    getMe: User
    users: [User]
    posts: [Post]
  }

  type Mutation {
    signUp(
      name: String!, 
      email: String!, 
      password: String!, 
      bio: String
    ): AuthPayload,

    signIn(
      email: String!, 
      password: String!
    ): AuthPayload

    addPost(
      title: String!, 
      content: String!, 
      published: Boolean
    ) : PostPayload
  }

  type AuthPayload {
    token: String
    errorMessage: String
  }

  type PostPayload {
    post: Post
    errorMessage: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String!
    published: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
    createdAt: String!
  }
`;

// 1. aikhane ja likha hosse seta data show korar jonno query likhte hobe
// 2. ! dile seta required field
// 3. [Post] dile array of posts
// 4. User! dile user object must be there
// 5. password: String! dile password must be there
// 6. Query meaning: Query is used to fetch data from the server and it is read-only operation, so it will not have any side effect. example: here getMe is a query which will return a user object and posts is a query which will return an array of posts
