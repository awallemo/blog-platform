import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import RichTextEditor from '../components/editor/RichTextEditor';
import api from '../lib/axios';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      const response = await api.post('/posts', data);
      navigate(`/posts/${response.data.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter your post title..."
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <RichTextEditor
            content=""
            onChange={(content) => setValue('content', content)}
          />
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;