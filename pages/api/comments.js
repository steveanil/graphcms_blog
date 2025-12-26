/**
 * API endpoint for creating comments
 * POST /api/comments
 */

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, comment, slug } = req.body;

  // Validate required fields
  if (!name || !email || !comment || !slug) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'email', 'comment', 'slug']
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphcmsToken}`,
      },
    });

    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { 
          id 
        }
      }
    `;

    const result = await graphQLClient.request(query, {
      name,
      email,
      comment,
      slug,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error creating comment:', error);

    // Check if it's a GraphQL error
    if (error.response?.errors) {
      return res.status(400).json({
        error: 'Failed to create comment',
        details: error.response.errors[0]?.message
      });
    }

    return res.status(500).json({
      error: 'Internal server error while creating comment'
    });
  }
}
