import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOutUser } from '@/store/authSlice';
import { AnimatePresence, motion } from 'framer-motion';
import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartDrawer from '../CartDrawer';
import CartToggle from '../CartToggle';
import AuthControls from './AuthControls';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import NavLinks from './NavLinks';

const dropdownVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.18, ease: 'easeInOut' } },
  open: { opacity: 1, height: 'auto', transition: { duration: 0.22, ease: 'easeInOut' } },
};

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const cartCount = useAppSelector((state) => state.cart.items.length);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
      className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-50"
      aria-label="Main navigation"
    >
      <div className="flex items-center flex-shrink-0">
        <Logo onClick={handleMenuClose} />
      </div>
      <MenuToggle open={menuOpen} onClick={handleMenuToggle} />
      {/* Desktop menu */}
      <div
        className="hidden md:flex flex-row items-center gap-4"
        role="menu"
        aria-label="User controls"
      >
        <NavLinks />
        <CartToggle count={cartCount} onClick={() => setCartOpen(true)} />
        <AuthControls
          user={user}
          loading={loading}
          onLogout={handleLogout}
          onNavigate={handleMenuClose}
        />
      </div>
      {/* Mobile dropdown menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="md:hidden absolute top-full left-0 w-full z-40 bg-white dark:bg-gray-900 shadow px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-4"
            role="menu"
            aria-label="Mobile user controls"
            style={{ overflow: 'hidden' }}
          >
            <NavLinks onNavigate={handleMenuClose} />
            <CartToggle count={cartCount} onClick={() => setCartOpen(true)} />
            <AuthControls
              user={user}
              loading={loading}
              onLogout={handleLogout}
              onNavigate={handleMenuClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default memo(Navbar);
