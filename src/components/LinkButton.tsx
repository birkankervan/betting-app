import { cn } from '@/utils/cn';
import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  return (
    <Link
      className={cn(
        'inline-block px-3 py-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2',
        variant === 'primary'
          ? 'bg-[color:var(--color-primary)] text-white shadow hover:bg-[color:var(--color-primary-hover)] focus:ring-[color:var(--color-primary)]'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-[color:var(--color-primary)]',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
