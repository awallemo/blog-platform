import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-2">
            <img
              src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.username}`}
              alt={comment.author.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-2">
              <p className="font-medium text-gray-900">{comment.author.username}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;