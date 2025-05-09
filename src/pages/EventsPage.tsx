import { useGetEventsBySportQuery } from '@/api/oddsApiService';
import BackButton from '@/components/BackButton';
import PageTitle from '@/components/PageTitle';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import React, { lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetailSection = lazy(() => import('@/components/EventDetailSection'));
const ErrorMessage = lazy(() => import('@/components/ErrorMessage'));

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

const EventsPage: React.FC = () => {
  const { sportKey, eventId } = useParams<{ sportKey?: string; eventId?: string }>();
  const navigate = useNavigate();
  const bySportResult = useGetEventsBySportQuery(sportKey || '', { skip: !sportKey });

  const { data: events = [], isLoading, isError, error, refetch } = bySportResult;

  const selectedEvent = eventId ? events.find((event) => event.id === eventId) : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
      </div>
    );
  }
  if (isError) {
    return (
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[200px]">
            <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
          </div>
        }
      >
        <ErrorMessage
          message={typeof error === 'string' ? error : 'Failed to load events.'}
          onRetry={refetch}
        />
      </Suspense>
    );
  }
  if (events.length === 0) {
    return <div className="flex justify-center items-center min-h-[200px] text-lg">No result</div>;
  }

  if (selectedEvent) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <BackButton onClick={() => navigate(-1)} className="mb-6">
          Back to events list
        </BackButton>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[200px]">
              <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
            </div>
          }
        >
          <EventDetailSection
            sportTitle={selectedEvent.sport_title}
            homeTeam={selectedEvent.home_team}
            awayTeam={selectedEvent.away_team}
            commenceTime={selectedEvent.commence_time}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-8 max-w-6xl">
      <BackButton onClick={() => navigate('/sports')} className="mb-6">
        Back to events list
      </BackButton>
      <PageTitle>Events</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
        <AnimatePresence>
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              className="group cursor-pointer"
              onClick={() =>
                navigate(
                  sportKey ? `/sports/${sportKey}/events/${event.id}` : `/events/${event.id}`,
                )
              }
            >
              <div className="rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 p-8 flex flex-col h-full transition-all duration-200 hover:shadow-2xl hover:scale-[1.025] hover:border-[color:var(--color-primary)]">
                <div className="flex flex-col flex-grow">
                  <span className="text-xs font-medium text-[color:var(--color-primary)] mb-2 uppercase tracking-wider">
                    {event.sport_title}
                  </span>
                  <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {event.home_team} vs {event.away_team}
                  </span>
                  <span className="text-base text-gray-600 dark:text-gray-300">
                    {new Date(event.commence_time).toLocaleString('tr-TR')}
                  </span>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="inline-flex items-center text-base font-medium text-[color:var(--color-primary)] group-hover:underline">
                    See Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsPage;
