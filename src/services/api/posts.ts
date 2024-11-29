import { apiClient } from './config';
import { Post } from '../../types';

export const postService = {
  async getAll() {
    const { data } = await apiClient.get<Post[]>('/posts');
    return data;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<Post>(`/posts/${id}`);
    return data;
  },

  async create(postData: { title: string; content: string }) {
    const { data } = await apiClient.post<Post>('/posts', postData);
    return data;
  },

  async update(id: string, postData: Partial<Post>) {
    const { data } = await apiClient.put<Post>(`/posts/${id}`, postData);
    return data;
  },

  async delete(id: string) {
    await apiClient.delete(`/posts/${id}`);
  },

  async addComment(postId: string, content: string) {
    const { data } = await apiClient.post(`/posts/${postId}/comments`, { content });
    return data;
  },

  async addReaction(postId: string, type: 'like' | 'heart') {
    const { data } = await apiClient.post(`/posts/${postId}/reactions`, { type });
    return data;
  },
};