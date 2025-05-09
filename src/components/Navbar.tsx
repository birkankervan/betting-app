import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOutUser } from '@/store/authSlice';
import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthControls from './Navbar/AuthControls';
import Logo from './Navbar/Logo';
import MenuToggle from './Navbar/MenuToggle';
import NavLinks from './Navbar/NavLinks';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    await dispatch(signOutUser());
    navigate('/login', { replace: true });
    setMenuOpen(false);
  }, [dispatch, navigate]);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav
      className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="flex items-center flex-shrink-0">
        <Logo onClick={handleMenuClose} />
      </div>
      <MenuToggle open={menuOpen} onClick={handleMenuToggle} />
      <div
        id="navbar-menu"
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent z-20 md:z-auto shadow md:shadow-none px-4 md:px-0 py-3 md:py-0 transition-all`}
        role="menu"
        aria-label="User controls"
      >
        <NavLinks />
        <AuthControls
          user={user}
          loading={loading}
          onLogout={handleLogout}
          onNavigate={handleMenuClose}
        />
      </div>
    </nav>
  );
};

export default memo(Navbar);
