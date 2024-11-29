export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  reactions: {
    likes: number;
    hearts: number;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  postId: string;
}

export interface ApiError {
  message: string;
  status?: number;
}