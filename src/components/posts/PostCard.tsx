import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.username}`}
            alt={post.author.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900">{post.author.username}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-red-500">
              <Heart size={20} />
              <span>{post.reactions.likes}</span>
            </button>
            <Link to={`/posts/${post.id}#comments`} className="flex items-center space-x-1 hover:text-blue-500">
              <MessageCircle size={20} />
              <span>{post.comments.length}</span>
            </Link>
          </div>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;