import { ShoppingCart } from 'lucide-react';
import type { FC } from 'react';

interface CartToggleProps {
  count: number;
  onClick: () => void;
}

const CartToggle: FC<CartToggleProps> = ({ count, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Open cart drawer (${count} item${count === 1 ? '' : 's'})`}
    className="relative p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  >
    <ShoppingCart className="w-6 h-6 text-blue-700" />
    {count > 0 && (
      <span
        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[1.25rem] flex items-center justify-center shadow"
        aria-label={`${count} item${count === 1 ? '' : 's'} in cart`}
      >
        {count}
      </span>
    )}
  </button>
);

export default CartToggle;
