import type { LucideIcon } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import React, { type ButtonHTMLAttributes, type ReactNode, useMemo } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gray';
  icon?: LucideIcon;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed';
const variantClasses: Record<string, string> = {
  primary:
    '[--btn-bg:var(--color-primary)] [--btn-hover:var(--color-primary-hover)] text-white bg-[color:var(--btn-bg)] hover:bg-[color:var(--btn-hover)] focus:ring-[color:var(--btn-bg)]',
  secondary: 'bg-secondary text-gray-900 hover:bg-secondary-dark focus:ring-secondary',
  gray: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-600',
};

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    variant = 'primary',
    icon: Icon,
    children,
    className = '',
    type = 'button',
    loading = false,
    disabled,
    ...props
  }) => {
    const isDisabled = disabled || loading;
    const classes = useMemo(
      () => [baseClass, variantClasses[variant] || variantClasses.primary, className].join(' '),
      [variant, className],
    );

    return (
      <button type={type} className={classes} disabled={isDisabled} {...props}>
        {loading ? (
          <LoaderCircle size={18} className="animate-spin -ml-1" aria-hidden />
        ) : (
          Icon && <Icon size={18} className="-ml-1" aria-hidden />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
