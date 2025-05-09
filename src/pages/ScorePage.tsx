import { useGetScoresBySportQuery } from '@/api/oddsApiService';
import PageTitle from '@/components/PageTitle';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import React, { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

const ErrorMessage = lazy(() => import('@/components/ErrorMessage'));

import type { Score } from '@/providers/types';

const ScorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sportKey = searchParams.get('sport') || '';
  // Fetch scores by sport
  const {
    data: scores = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetScoresBySportQuery(sportKey, { skip: !sportKey });

  if (!sportKey) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Please select a sport to view scores.
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
      </div>
    );
  }
  if (isError) {
    return (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
          </div>
        }
      >
        <ErrorMessage
          message={typeof error === 'string' ? error : 'Failed to load scores.'}
          onRetry={refetch}
        />
      </Suspense>
    );
  }
  if (scores.length === 0) {
    return <div className="flex justify-center items-center h-64 text-lg">No result</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle>Scores for {sportKey}</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnimatePresence>
          {scores.map((score: Score, idx: number) => {
            // derive home and away scores or default to 0
            const homeScore = score.scores?.find((s) => s.name === score.home_team)?.score || '0';
            const awayScore = score.scores?.find((s) => s.name === score.away_team)?.score || '0';
            return (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: 'easeOut' }}
                className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 flex flex-col items-center text-center"
              >
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {score.home_team} vs {score.away_team}
                </span>
                <span className="text-2xl font-bold text-[color:var(--color-primary)] mb-1">
                  {homeScore} - {awayScore}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(score.commence_time).toLocaleString('tr-TR')}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScorePage;
