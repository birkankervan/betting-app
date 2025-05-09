import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC<{ onNavigate?: () => void }> = memo(({ onNavigate }) => (
  <>
    <Link
      to="/"
      className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] rounded px-3 py-1 transition-colors w-full md:w-auto"
      onClick={onNavigate}
      role="menuitem"
    >
      Home
    </Link>
    <Link
      to="/sports"
      className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] rounded px-3 py-1 transition-colors w-full md:w-auto"
      onClick={onNavigate}
      role="menuitem"
    >
      Sports
    </Link>
  </>
));

export default NavLinks;
