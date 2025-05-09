import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface AuthControlsProps {
  user: any;
  loading: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
}

const AuthControls: React.FC<AuthControlsProps> = memo(
  ({ user, loading, onLogout, onNavigate }) => {
    if (!user && !loading) {
      return (
        <Link
          to="/login"
          className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] rounded px-3 py-1 transition-colors w-full md:w-auto"
          onClick={onNavigate}
          role="menuitem"
        >
          Login
        </Link>
      );
    }
    if (user) {
      return (
        <>
          <span className="text-base font-medium text-gray-700 dark:text-gray-200 mr-2 block md:inline-block px-3 py-1">
            Hello, {user.displayName || user.email || 'User'}
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-1 rounded bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-colors w-full md:w-auto mt-2 md:mt-0"
            aria-label="Logout"
            disabled={loading}
            type="button"
            role="menuitem"
          >
            Logout
          </button>
        </>
      );
    }
    return null;
  },
);

export default AuthControls;
