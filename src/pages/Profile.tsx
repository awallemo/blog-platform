import React from 'react';
import { useAuthStore } from '../store/authStore';
import { usePosts } from '../hooks/usePosts';
import PostList from '../components/posts/PostList';

 const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const { posts, isLoading } = usePosts();

  const userPosts = posts.filter((post) => post.author.id === user?.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`}
            alt={user?.username}
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-gray-600">You haven't written any posts yet.</p>
        ) : (
          <PostList posts={userPosts} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Profile