import Link from 'next/link';
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-soft font-sans">
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.svg" alt="TecniRacer" className="h-8" />
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/maintenance" className="hover:text-primary">Mantenimientos</Link>
          <Link href="/history" className="hover:text-primary">Historial</Link>
          <Link href="/lookup" className="hover:text-primary">Consultar</Link>
          <Link href="/cart" className="hover:text-primary">Carrito</Link>
        </nav>
      </div>
    </header>
    <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    <footer className="bg-gray-100 text-center p-4 text-sm">TecniRacer 2024</footer>
  </div>
);
