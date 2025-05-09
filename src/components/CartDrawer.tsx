import { Button } from '@/components/Button';
import { analytics, db } from '@/firebase';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { CartItem } from '@/store/cartSlice';
import { clearCart, removeBet } from '@/store/cartSlice';
import { logEvent } from 'firebase/analytics';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
};

const CartDrawer: FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const combinedOdds = items.reduce((acc, item) => acc * item.odds, 1).toFixed(2);

  const handlePlaceBet = async () => {
    if (!user) {
      alert('You must be logged in to place a bet.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'bets'), {
        userId: user.uid,
        bets: items,
        totalOdds: Number(combinedOdds),
        timestamp: serverTimestamp(),
      });

      if (analytics) {
        logEvent(analytics, 'place_bet', {
          userId: user.uid,
          totalOdds: Number(combinedOdds),
          betCount: items.length,
        });
      }

      dispatch(clearCart());
      alert('Bet placed successfully!');
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md shadow-2xl border-l border-gray-700 flex flex-col transition-all sm:w-96 rounded-l-2xl"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={drawerVariants}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gradient-to-r from-gray-900/90 to-gray-800/80 rounded-tl-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight">Bet Basket</h2>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 rounded-full hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-colors"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 text-base py-16">
                Your bet basket is empty.
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((item: CartItem) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 shadow border border-gray-700 hover:shadow-lg transition-shadow group"
                  >
                    <div>
                      <div className="font-semibold text-[color:var(--color-primary)] text-base">
                        {item.home_team} <span className="text-gray-400 font-normal">vs</span>{' '}
                        {item.away_team}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Odds:{' '}
                        <span className="font-mono text-[color:var(--color-primary)] text-sm">
                          {item.odds}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeBet(item.id))}
                      aria-label={`Remove bet for ${item.home_team} vs ${item.away_team}`}
                      className="p-2 rounded-full hover:bg-red-900/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-700 bg-gradient-to-br from-gray-900/90 to-gray-800/80 rounded-bl-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[color:var(--color-primary)] text-base">
                Combined Odds:
              </span>
              <span className="font-mono text-lg text-[color:var(--color-primary)]">
                {combinedOdds}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white font-semibold shadow-md shadow-[color:var(--color-primary)/20]"
                disabled={items.length === 0 || loading}
                onClick={handlePlaceBet}
              >
                {loading ? 'Placing...' : 'Place Bet'}
              </Button>
              <Button
                variant="gray"
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 shadow"
                disabled={items.length === 0}
                onClick={() => dispatch(clearCart())}
                aria-label="Clear all bets"
                icon={Trash2}
              >
                Clear All
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
