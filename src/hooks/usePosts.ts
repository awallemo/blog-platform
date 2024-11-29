import { useState, useEffect } from 'react';
import { postService } from '../services/api';
import { Post, ApiError } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getAll();
      setPosts(data);
    } catch (err) {
      setPosts([]);
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch posts');
      console.error('Error fetching posts:', apiError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts
  };
};