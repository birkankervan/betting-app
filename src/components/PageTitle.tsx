import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => (
  <h1 className={`text-2xl sm:text-3xl font-bold mb-6 text-white text-center ${className}`}>
    {children}
  </h1>
);

export default PageTitle;
