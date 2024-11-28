import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { usePost } from '../hooks/usePost';
import { useAuthStore } from '../store/authStore';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import api from '../lib/axios';

const PostDetail = () => {
  const { id = '' } = useParams();
  const { post, isLoading, error, refetch } = usePost(id);
  const { isAuthenticated } = useAuthStore();

  const handleCommentSubmit = async (data: { content: string }) => {
    try {
      await api.post(`/posts/${id}/comments`, data);
      refetch();
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error || 'Post not found'}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}`}
              alt={post.author.username}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <p className="font-medium text-gray-900">{post.author.username}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="prose max-w-none mb-6">{post.content}</div>

          <div className="flex items-center justify-between text-gray-500 border-t pt-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-red-500">
                <Heart size={20} />
                <span>{post.reactions.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle size={20} />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </article>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        {isAuthenticated ? (
          <div className="mb-8">
            <CommentForm postId={id} onSubmit={handleCommentSubmit} />
          </div>
        ) : (
          <p className="text-gray-600 mb-8">Please log in to leave a comment.</p>
        )}
        <CommentList comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetail;