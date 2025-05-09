import { cn } from '@/utils/cn';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div
    className={cn(
      'rounded-xl shadow bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 p-6 flex flex-col min-h-[220px] transition-all duration-200 text-white',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
