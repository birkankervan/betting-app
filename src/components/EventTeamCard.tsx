import React from 'react';

interface EventTeamCardProps {
  label: string;
  value: string;
  className?: string;
}

const EventTeamCard: React.FC<EventTeamCardProps> = ({ label, value, className = '' }) => (
  <div className={`p-6 rounded-lg bg-white dark:bg-gray-800 shadow ${className}`}>
    <h3 className="text-lg font-semibold mb-4 text-[color:var(--color-primary)]">{label}</h3>
    <p className="text-xl text-gray-800 dark:text-gray-100">{value}</p>
  </div>
);

export default EventTeamCard;
