import { mockPosts, mockUsers } from './mockData';
import { Post, User, ApiError } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const throwError = (message: string, status = 400): never => {
  const error: ApiError = { message, status };
  throw error;
};

export const mockApi = {
  posts: {
    async getAll(): Promise<Post[]> {
      await delay(500);
      return [...mockPosts];
    },

    async getById(id: string): Promise<Post> {
      await delay(300);
      const post = mockPosts.find(post => post.id === id);
      if (!post) {
        throwError('Post not found', 404);
      }
      return post;
    },

    async create(data: Partial<Post>): Promise<Post> {
      await delay(500);
      if (!data.title || !data.content) {
        throwError('Title and content are required');
      }

      const newPost: Post = {
        id: String(Date.now()),
        title: data.title,
        content: data.content,
        author: mockUsers[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reactions: { likes: 0, hearts: 0 },
        comments: []
      };
      mockPosts.unshift(newPost);
      return newPost;
    }
  },

  auth: {
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
      await delay(300);
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || password !== 'password123') {
        throwError('Invalid credentials', 401);
      }
      
      return {
        user,
        token: 'mock-jwt-token'
      };
    },

    async register(data: { username: string; email: string; password: string }): Promise<{ user: User; token: string }> {
      await delay(500);
      if (mockUsers.some(u => u.email === data.email)) {
        throwError('Email already exists', 409);
      }

      const newUser: User = {
        id: String(Date.now()),
        username: data.username,
        email: data.email,
        createdAt: new Date().toISOString()
      };
      mockUsers.push(newUser);
      return {
        user: newUser,
        token: 'mock-jwt-token'
      };
    }
  }
};