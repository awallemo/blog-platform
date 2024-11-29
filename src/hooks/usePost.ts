import { useState, useEffect } from 'react';
import { postService } from '../services/api';
import { Post, ApiError } from '../types';

export const usePost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getById(postId);
      setPost(data);
    } catch (err) {
      setPost(null);
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch post');
      console.error('Error fetching post:', apiError);
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