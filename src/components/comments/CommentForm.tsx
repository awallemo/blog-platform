import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment is too long'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  onSubmit: (data: CommentFormData) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const handleFormSubmit = async (data: CommentFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <textarea
          {...register('content')}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Write a comment..."
        />
        {errors.content && (
          <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" isLoading={isSubmitting}>
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;