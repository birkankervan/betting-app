import { useGetOddsQuery } from '@/api/oddsApiService';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import EventDetailCard from '@/components/EventDetailCard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBet, removeBet } from '@/store/cartSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import React, { lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ErrorMessage = lazy(() => import('@/components/ErrorMessage'));

const detailVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const sectionVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

const OddDetailPage: React.FC = () => {
  const { sportKey, eventId } = useParams<{ sportKey?: string; eventId?: string }>();
  const navigate = useNavigate();
  const regions = 'us';
  const markets = 'h2h';
  const oddsFormat = 'decimal';

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const {
    data: oddsList = [],
    isLoading,
    isError,
    refetch,
  } = useGetOddsQuery(
    { sportKey: sportKey || '', regions, markets, oddsFormat },
    { skip: !sportKey },
  );

  const selected = oddsList.find((e) => e.id === eventId);

  const isOutcomeInCart = (outcomeId: string) => cartItems.some((item) => item.id === outcomeId);

  if (!sportKey) {
    return <div className="text-center py-16">No sport selected.</div>;
  }
  if (isLoading) {
    return (
      <div className="text-center py-16 flex justify-center items-center">
        <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
      </div>
    );
  }
  if (isError || !selected) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-16 flex justify-center items-center">
            <LoaderCircle className="animate-spin text-white" size={36} aria-label="Loading" />
          </div>
        }
      >
        <ErrorMessage
          message={selected ? 'Failed to load detail.' : 'Event not found.'}
          onRetry={refetch}
        />
      </Suspense>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate(`/odds?sport=${sportKey}`)} className="mb-6">
        Back to odds list
      </BackButton>
      <AnimatePresence>
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={detailVariants}>
          <EventDetailCard>
            <h1 className="text-2xl font-bold mb-4 text-[color:var(--color-primary)]">
              {selected.home_team} vs {selected.away_team}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {new Date(selected.commence_time).toLocaleString('tr-TR')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {selected.bookmakers.map((book, idx) => (
                <motion.div
                  key={book.key}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow transition-transform duration-200 hover:scale-105"
                >
                  <h2 className="text-lg font-semibold mb-3 text-[color:var(--color-primary)]">
                    {book.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {book.markets[0]?.outcomes.map((out, oidx) => {
                      const outcomeId = `${selected.id}-${book.key}-${out.name}`;
                      const inCart = isOutcomeInCart(outcomeId);
                      return (
                        <Button
                          key={oidx}
                          variant={inCart ? 'secondary' : 'primary'}
                          className={`flex justify-between items-center w-full bg-white dark:bg-gray-800 p-3 rounded-lg transition border-2 ${inCart ? 'border-blue-600 ring-2 ring-blue-400' : 'border-transparent hover:border-blue-300'}`}
                          aria-pressed={inCart}
                          aria-label={
                            inCart
                              ? `${out.name} bahsini sepetten çıkar`
                              : `${out.name} bahsini sepete ekle`
                          }
                          onClick={() => {
                            if (inCart) {
                              dispatch(removeBet(outcomeId));
                            } else {
                              dispatch(
                                addBet({
                                  id: outcomeId,
                                  home_team: selected.home_team,
                                  away_team: selected.away_team,
                                  odds: out.price,
                                }),
                              );
                            }
                          }}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {out.name}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {out.price}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </EventDetailCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OddDetailPage;
