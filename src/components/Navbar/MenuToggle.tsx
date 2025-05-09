import { Menu, X } from 'lucide-react';
import React, { memo } from 'react';

const MenuToggle: React.FC<{ open: boolean; onClick: () => void }> = memo(({ open, onClick }) => (
  <button
    className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls="navbar-menu"
    onClick={onClick}
    type="button"
  >
    <span className="sr-only">Toggle menu</span>
    {open ? (
      <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
    ) : (
      <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
    )}
  </button>
));

export default MenuToggle;
