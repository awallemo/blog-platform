import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginSchema } from '../lib/validation';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../services/api';

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data.email, data.password);
      login(response.user, response.token);
      navigate('/');
    } catch (error: any) {
      setError('root', {
        message: error.message || 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          {errors.root && (
            <p className="text-sm text-red-600 text-center">
              {errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;