import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquare } from 'lucide-react';
import PostList from '../components/posts/PostList';
import Button from '../components/ui/Button';
import { usePosts } from '../hooks/usePosts';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const { posts, isLoading, error } = usePosts();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
        {isAuthenticated && (
          <Link to="/create-post">
            <Button className="flex items-center space-x-2">
              <PenSquare size={20} />
              <span>Write a Post</span>
            </Button>
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <PostList posts={posts} isLoading={isLoading} />
    </div>
  );
};

export default Home;