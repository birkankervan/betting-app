import { useGetOddsQuery } from '@/api/oddsApiService';
import { Button } from '@/components/Button';
import EventDetailCard from '@/components/EventDetailCard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { EventWithOdds, Outcome } from '@/providers/types';
import type { CartItem } from '@/store/cartSlice';
import { addBet, removeBet } from '@/store/cartSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle, XCircle } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
};

const OddsDetailPage: React.FC = () => {
  const { sportKey } = useParams<{ sportKey: string }>();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const regions = 'us';
  const markets = 'h2h';
  const oddsFormat = 'decimal';

  const {
    data: oddsList = [],
    isLoading,
    isError,
    refetch,
  } = useGetOddsQuery(
    { sportKey: sportKey || '', regions, markets, oddsFormat },
    { skip: !sportKey },
  );

  // Helper to flatten all outcomes for an event
  const flattenOutcomes = (event: EventWithOdds) => {
    const outcomes: Array<Outcome & { bookmaker: string; market: string }> = [];
    event.bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        market.outcomes.forEach((outcome) => {
          outcomes.push({ ...outcome, bookmaker: bookmaker.title, market: market.key });
        });
      });
    });
    return outcomes;
  };

  // Helper to check if an outcome is in the cart
  const isOutcomeInCart = (event: EventWithOdds, outcome: Outcome) =>
    cartItems.some(
      (item) =>
        item.id === `${event.id}-${outcome.name}` &&
        item.home_team === event.home_team &&
        item.away_team === event.away_team,
    );

  // Handler for toggling bet
  const handleToggleBet = (event: EventWithOdds, outcome: Outcome) => {
    const id = `${event.id}-${outcome.name}`;
    const inCart = isOutcomeInCart(event, outcome);
    if (inCart) {
      dispatch(removeBet(id));
    } else {
      const bet: CartItem = {
        id,
        home_team: event.home_team,
        away_team: event.away_team,
        odds: outcome.price,
      };
      dispatch(addBet(bet));
    }
  };

  if (!sportKey) {
    return <div className="text-center py-16">No sport selected.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoaderCircle className="animate-spin text-blue-600" size={36} aria-label="Loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center py-16 gap-4">
        <XCircle className="text-red-500" size={36} />
        <div className="text-red-600 font-semibold">Failed to load odds.</div>
        <Button onClick={() => refetch()} variant="secondary">
          Retry
        </Button>
      </div>
    );
  }

  if (!oddsList.length) {
    return <div className="text-center py-16 text-gray-500">No odds available for this sport.</div>;
  }

  return (
    <main className="p-2 sm:p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Odds for {sportKey}</h1>
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {oddsList.map((event, i) => (
            <motion.div
              key={event.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              className="h-full"
            >
              <EventDetailCard className="flex flex-col h-full">
                <div className="mb-2">
                  <div className="font-semibold text-lg">
                    {event.home_team} vs {event.away_team}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(event.commence_time).toLocaleString()}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {flattenOutcomes(event).map((outcome, idx) => {
                    const inCart = isOutcomeInCart(event, outcome);
                    return (
                      <div
                        key={outcome.name + outcome.bookmaker + outcome.market + idx}
                        className="flex items-center justify-between bg-gray-50 rounded p-2"
                      >
                        <div>
                          <div className="font-medium">{outcome.name}</div>
                          <div className="text-xs text-gray-500">
                            {outcome.bookmaker} / {outcome.market}
                          </div>
                        </div>
                        <Button
                          variant={inCart ? 'secondary' : 'primary'}
                          className={inCart ? 'border-2 border-blue-600' : ''}
                          aria-pressed={inCart}
                          aria-label={
                            inCart
                              ? `Remove bet for ${outcome.name}`
                              : `Add bet for ${outcome.name}`
                          }
                          onClick={() => handleToggleBet(event, outcome)}
                        >
                          {outcome.price}
                          <span className="ml-2 text-xs">{inCart ? 'Remove' : 'Add'}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </EventDetailCard>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </main>
  );
};

export default OddsDetailPage;
