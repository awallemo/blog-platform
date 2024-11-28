import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { Post } from '../types';

export const usePost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, isLoading, error, refetch: fetchPost };
};