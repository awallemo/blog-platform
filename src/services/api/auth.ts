import { apiClient } from './config';
import { User } from '../../types';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string) {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  async updateProfile(userData: Partial<User>) {
    const { data } = await apiClient.put<User>('/auth/profile', userData);
    return data;
  },
};