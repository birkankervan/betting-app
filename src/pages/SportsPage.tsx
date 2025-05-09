import { useGetSportsQuery } from '@/api/oddsApiService';
import Card from '@/components/Card';
import LinkButton from '@/components/LinkButton';
import PageTitle from '@/components/PageTitle';
import type { Sport } from '@/providers/types';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import React, { lazy, Suspense } from 'react';

// Framer Motion kart animasyonları için varyantlar
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: 'spring', stiffness: 80, damping: 15 },
  }),
};

const ErrorMessage = lazy(() => import('@/components/ErrorMessage'));

const SportsPage: React.FC = () => {
  const { data: sports = [], isLoading, isError, error, refetch } = useGetSportsQuery();

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
          <div className="text-red-500 text-center">
            <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
          </div>
        }
      >
        <ErrorMessage
          message={typeof error === 'string' ? error : 'Failed to load sports.'}
          onRetry={refetch}
        />
      </Suspense>
    );
  }
  if (sports.length === 0) {
    return <div className="flex justify-center items-center min-h-[200px] text-lg">No result</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-4 px-1 sm:px-2">
      <PageTitle>Sports</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <AnimatePresence>
          {sports.map((sport: Sport, i: number) => (
            <motion.div
              key={sport.key}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              className="min-h-0"
            >
              <Card className="group h-full p-3 sm:p-4 flex flex-col items-start hover:shadow-xl focus-within:ring-2 focus-within:ring-[color:var(--color-primary)]">
                <span className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-[color:var(--color-primary)] mb-0.5 truncate w-full">
                  {sport.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate w-full">
                  {sport.group}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 w-full">
                  {sport.description}
                </span>
                {sport.has_outrights && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded mt-2">
                    Outrights
                  </span>
                )}
                <div className="mt-auto flex gap-1 w-full">
                  <LinkButton
                    to={`/odds?sport=${sport.key}`}
                    variant="primary"
                    className="flex-1 text-xs py-1 px-2"
                    aria-label={`See odds for ${sport.title}`}
                  >
                    Odds
                  </LinkButton>
                  <LinkButton
                    to={`/scores?sport=${sport.key}`}
                    variant="secondary"
                    className="flex-1 text-xs py-1 px-2"
                    aria-label={`See scores for ${sport.title}`}
                  >
                    Scores
                  </LinkButton>
                  <LinkButton
                    to={`/sports/${sport.key}/events`}
                    variant="secondary"
                    className="flex-1 text-xs py-1 px-2"
                    aria-label={`See events for ${sport.title}`}
                  >
                    Events
                  </LinkButton>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SportsPage;
