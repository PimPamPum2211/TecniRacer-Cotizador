import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../lib/CartContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { items } = useCart();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  const linkClass = (path: string) =>
    `px-3 py-2 font-medium hover:text-brand border-b-2 border-transparent ${router.pathname === path ? 'border-brand' : ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-neutral text-brand-neutral dark:text-gray-100 font-sans">
      <header className="sticky top-0 bg-white dark:bg-brand-neutral shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.svg" alt="TecniRacer" className="h-8" />
          </Link>
          <nav className="space-x-6 text-brand-neutral font-medium">
            <Link href="/maintenance" className={linkClass('/maintenance')}>Mantenimientos</Link>
            <Link href="/history" className={linkClass('/history')}>Historial</Link>
            <Link href="/lookup" className={linkClass('/lookup')}>Consultar</Link>
            <Link href="/cart" className={linkClass('/cart')}>
              <div className="relative inline-block">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>
          </nav>
          <button onClick={() => setDark(!dark)} className="ml-4 text-sm text-brand-neutral border border-brand-slate px-2 py-1 rounded">
            {dark ? 'Claro' : 'Oscuro'}
          </button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 text-center p-4 text-sm">TecniRacer 2024</footer>
    </div>
  );
};
