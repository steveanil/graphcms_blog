// minimal graphql client
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (first = 6, after = null) => {
  const query = gql`
    query MyQuery($first: Int!, $after: String) {
      postsConnection(first: $first, after: $after, orderBy: updatedAt_DESC) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            updatedAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { first, after });
  return {
    posts: result.postsConnection.edges.map((edge) => edge.node),
    pageInfo: result.postsConnection.pageInfo,
  };
};

export const searchQuery = async () => {
  const query = gql`
    query searchQuery {
      posts {
        slug
        title
        excerpt
        content {
          text
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSearchPost = async (slug) => {
  const query = gql`
    query getSearchPost($slug: String!) {
      posts(orderBy: updatedAt_DESC, first: 50, where: { _search: $slug }) {
        slug
        excerpt
        title
        author {
          name
          photo {
            url
          }
        }
        updatedAt
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  // This is where we are fetching from
  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        updatedAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 2
      ) {
        title
        featuredImage {
          url
        }
        updatedAt
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getAdjacentPosts = async (updatedAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($updatedAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: updatedAt_DESC
        where: { slug_not: $slug, AND: { updatedAt_lte: $updatedAt } }
      ) {
        title
        featuredImage {
          url
        }
        updatedAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: updatedAt_ASC
        where: { slug_not: $slug, AND: { updatedAt_gte: $updatedAt } }
      ) {
        title
        featuredImage {
          url
        }
        updatedAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, updatedAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(
        where: { categories_some: { slug: $slug } }
        orderBy: updatedAt_DESC
        first: 50
      ) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            updatedAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        updatedAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: updatedAt_ASC
        last: 2
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        updatedAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
