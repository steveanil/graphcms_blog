// GraphQL client for Hygraph CMS
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/**
 * Fetches paginated blog posts
 * @param {number} first - Number of posts to fetch (default: 6)
 * @param {string|null} after - Cursor for pagination
 * @returns {Promise<{posts: Array, pageInfo: Object, error: string|null}>}
 */
export const getPosts = async (first = 6, after = null) => {
  try {
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
      error: null,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pageInfo: { hasNextPage: false, endCursor: null },
      error: error.message,
    };
  }
};

/**
 * Fetches all posts for search indexing
 * @returns {Promise<Array>}
 */
export const searchQuery = async () => {
  try {
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
  } catch (error) {
    console.error('Error fetching search query:', error);
    return [];
  }
};

/**
 * Searches for posts matching a query string
 * @param {string} slug - Search query
 * @returns {Promise<Array>}
 */
export const getSearchPost = async (slug) => {
  try {
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
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};

/**
 * Fetches all categories
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
  try {
    const query = gql`
      query GetCategories {
        categories {
          name
          slug
        }
      }
    `;

    const result = await request(graphqlAPI, query);
    return result.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Fetches details for a specific post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>}
 */
export const getPostDetails = async (slug) => {
  try {
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
  } catch (error) {
    console.error('Error fetching post details:', error);
    return null;
  }
};

/**
 * Fetches similar posts based on categories
 * @param {Array<string>} categories - Array of category slugs
 * @param {string} slug - Current post slug to exclude
 * @returns {Promise<Array>}
 */
export const getSimilarPosts = async (categories, slug) => {
  try {
    const query = gql`
      query GetSimilarPosts($slug: String!, $categories: [String!]) {
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
  } catch (error) {
    console.error('Error fetching similar posts:', error);
    return [];
  }
};

/**
 * Fetches adjacent posts (next and previous)
 * @param {string} updatedAt - Current post's updatedAt timestamp
 * @param {string} slug - Current post slug
 * @returns {Promise<{next: Object|null, previous: Object|null}>}
 */
export const getAdjacentPosts = async (updatedAt, slug) => {
  try {
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

    return {
      next: result.next?.[0] || null,
      previous: result.previous?.[0] || null
    };
  } catch (error) {
    console.error('Error fetching adjacent posts:', error);
    return { next: null, previous: null };
  }
};

/**
 * Fetches posts by category
 * @param {string} slug - Category slug
 * @returns {Promise<Array>}
 */
export const getCategoryPost = async (slug) => {
  try {
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
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return [];
  }
};

/**
 * Submits a comment to the API
 * @param {Object} obj - Comment data
 * @returns {Promise<Object>}
 */
export const submitComment = async (obj) => {
  try {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!result.ok) {
      throw new Error(`Failed to submit comment: ${result.statusText}`);
    }

    return result.json();
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};

/**
 * Fetches comments for a specific post
 * @param {string} slug - Post slug
 * @returns {Promise<Array>}
 */
export const getComments = async (slug) => {
  try {
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
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

/**
 * Fetches recent posts
 * @returns {Promise<Array>}
 */
export const getRecentPosts = async () => {
  try {
    const query = gql`
      query GetRecentPosts {
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
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};
