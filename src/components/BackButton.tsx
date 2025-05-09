import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, children = 'Back', className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 hover:underline text-white ${className}`}
  >
    <ArrowLeft className="h-5 w-5 text-white" />
    {children}
  </button>
);

export default BackButton;
