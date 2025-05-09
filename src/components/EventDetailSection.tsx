import EventDetailCard from '@/components/EventDetailCard';
import EventTeamCard from '@/components/EventTeamCard';
import React from 'react';

interface EventDetailSectionProps {
  sportTitle: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string | Date;
}

const EventDetailSection: React.FC<EventDetailSectionProps> = ({
  sportTitle,
  homeTeam,
  awayTeam,
  commenceTime,
}) => (
  <EventDetailCard>
    <div className="flex flex-col items-center text-center mb-8">
      <h1 className="text-3xl font-bold mb-4 text-[color:var(--color-primary)]">{sportTitle}</h1>
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {homeTeam} vs {awayTeam}
      </div>
      <div className="text-lg text-gray-600 dark:text-gray-300">
        {new Date(commenceTime).toLocaleString('tr-TR')}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EventTeamCard label="Home Team" value={homeTeam} />
      <EventTeamCard label="Away Team" value={awayTeam} />
    </div>
  </EventDetailCard>
);

export default EventDetailSection;
