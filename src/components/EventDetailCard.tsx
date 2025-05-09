import React from 'react';

interface EventDetailCardProps {
  children: React.ReactNode;
  className?: string;
}

const EventDetailCard: React.FC<EventDetailCardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 ${className}`}
  >
    {children}
  </div>
);

export default EventDetailCard;
