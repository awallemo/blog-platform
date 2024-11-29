import { Post, User, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    createdAt: new Date(2024, 0, 1).toISOString()
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    createdAt: new Date(2024, 0, 2).toISOString()
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Great post! Really enjoyed reading this.',
    author: mockUsers[0],
    createdAt: new Date(2024, 1, 15).toISOString(),
    postId: '1'
  },
  {
    id: '2',
    content: 'Very insightful analysis. Thanks for sharing!',
    author: mockUsers[1],
    createdAt: new Date(2024, 1, 16).toISOString(),
    postId: '1'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: 'React and TypeScript are a powerful combination for building robust web applications...',
    author: mockUsers[0],
    createdAt: new Date(2024, 1, 15).toISOString(),
    updatedAt: new Date(2024, 1, 15).toISOString(),
    reactions: { likes: 42, hearts: 23 },
    comments: mockComments
  },
  {
    id: '2',
    title: 'Modern CSS Best Practices',
    content: 'Learn about the latest CSS features and how to use them effectively...',
    author: mockUsers[1],
    createdAt: new Date(2024, 1, 16).toISOString(),
    updatedAt: new Date(2024, 1, 16).toISOString(),
    reactions: { likes: 35, hearts: 18 },
    comments: []
  }
];