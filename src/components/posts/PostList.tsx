import React from 'react';
import PostCard from './PostCard';
import { Post } from '../../types';

interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="ml-3">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-16 mt-2" />
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;