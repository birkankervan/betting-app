import { useGetOddsQuery } from '@/api/oddsApiService';
import BackButton from '@/components/BackButton';
import PageTitle from '@/components/PageTitle';
import type { EventWithOdds } from '@/providers/types';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import React, { lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const OddsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sportKey = searchParams.get('sport') || '';
  const navigate = useNavigate();
  const regions = 'us';
  const markets = 'h2h';
  const oddsFormat = 'decimal';

  const {
    data: oddsList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOddsQuery({ sportKey, regions, markets, oddsFormat }, { skip: !sportKey });

  if (!sportKey) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-lg">
        Please select a sport to view odds.
      </div>
    );
  }

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
          message={typeof error === 'string' ? error : 'Failed to load odds.'}
          onRetry={refetch}
        />
      </Suspense>
    );
  }

  if (oddsList.length === 0) {
    return <div className="flex justify-center items-center min-h-[200px] text-lg">No result</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate('/sports')} className="mb-6">
        Back
      </BackButton>
      <PageTitle>Odds</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        <AnimatePresence>
          {oddsList.map((event: EventWithOdds, i: number) => (
            <motion.div
              key={event.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 flex flex-col h-full transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
              onClick={() => navigate(`/odds/${sportKey}/${event.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex-grow text-center flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {event.home_team} vs {event.away_team}
                </h2>
                <span className="text-base text-gray-600 dark:text-gray-300">
                  {new Date(event.commence_time).toLocaleString('tr-TR')}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OddsPage;
