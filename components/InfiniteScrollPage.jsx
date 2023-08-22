import { useState, useEffect } from 'react';
import { getPosts } from '../services';
import PostCard from './PostCard';

const InfiniteScrollPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true); // Add this state

  const fetchItems = async (afterCursor) => {
    try {
      const newItems = await getPosts(afterCursor);
      setPosts((prevItems) => [...prevItems, ...newItems]);
      setEndCursor(newItems[newItems.length - 1]?.cursor || null);
      setHasNextPage(newItems[newItems.length - 1]?.hasNextPage || true); // Update hasNextPage
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(endCursor);
  }, []);

  const handleScroll = () => {
    if (hasNextPage && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      fetchItems(endCursor);
    }
  };

  useEffect(
    () =>
    // window.addEventListener('scroll', handleScroll);
      () => {
        window.removeEventListener('scroll', handleScroll);
      },
    [endCursor],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {posts.map((post, index) => <PostCard post={post.node} key={index} />)}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollPage;
