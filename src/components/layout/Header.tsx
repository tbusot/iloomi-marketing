'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/#features', label: 'Product' },
  { href: '/#how-it-works', label: 'How it Works' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Homepage has a dark hero, so the nav should be white when not scrolled
  const isDarkHero = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/iloomi-logo.svg"
            alt="iloomi"
            width={100}
            height={29}
            className={`transition-all duration-300 ${
              isScrolled || !isDarkHero ? 'brightness-0' : 'brightness-0 invert'
            }`}
            priority
          />
        </Link>

        {/* Desktop Navigation — centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-purple transition-colors font-medium ${
                isScrolled || !isDarkHero ? 'text-dark-green' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Download button — right aligned */}
        <Link
          href="/#download"
          className="hidden md:inline-flex bg-purple text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple/90 transition-colors"
        >
          Download
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled || !isDarkHero ? 'text-dark-green' : 'text-white'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-dark-green hover:text-purple transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#download"
                className="block bg-purple text-white px-5 py-3 rounded-full font-medium hover:bg-purple/90 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-purple"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </header>
  );
}
