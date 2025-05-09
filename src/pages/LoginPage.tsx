import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { loginSchema, type LoginSchema } from '@/components/loginSchema';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signIn } from '@/store/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trophy } from 'lucide-react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      const resultAction = await dispatch(signIn(data));
      if (signIn.fulfilled.match(resultAction)) {
        navigate('/');
      }
    },
    [dispatch, navigate],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-primary,theme(colors.gray.100))]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl bg-white/95 shadow-lg p-8"
        autoComplete="off"
        aria-label="Login form"
      >
        <div className="flex flex-col items-center mb-6">
          <Trophy size={40} className="mb-2 text-[color:var(--color-primary)]" aria-hidden />
          <h2 className="text-2xl font-bold text-[color:var(--color-primary)] tracking-tight mb-1">
            Football Login
          </h2>
          <span className="text-sm text-gray-500">Sign in to your account</span>
        </div>
        <Input
          label="Email"
          type="email"
          autoComplete="username"
          {...register('email')}
          error={errors.email}
          autoFocus
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password}
        />
        {error && (
          <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="w-full mt-2"
          loading={loading}
          aria-busy={loading}
          aria-disabled={loading}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default React.memo(LoginPage);
