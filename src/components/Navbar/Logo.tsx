import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC<{ onClick?: () => void }> = memo(({ onClick }) => (
  <Link
    to="/"
    className="text-2xl font-bold tracking-tight text-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] rounded"
    tabIndex={0}
    aria-label="Home"
    onClick={onClick}
  >
    Betting App
  </Link>
));

export default Logo;
