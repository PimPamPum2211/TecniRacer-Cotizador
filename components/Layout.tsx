import Link from 'next/link';
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link href="/" className="font-semibold">Inicio</Link>
      <Link href="/maintenance">Mantenimientos</Link>
      <Link href="/history">Historial</Link>
      <Link href="/cart">Carrito</Link>
    </nav>
    <main className="flex-1 p-4">{children}</main>
    <footer className="bg-gray-100 text-center p-4 text-sm">TecniRacer 2024</footer>
  </div>
);
