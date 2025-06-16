import React from 'react';
import Navbar from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white dark:bg-brand-neutral text-brand-neutral dark:text-gray-100 font-sans">
    <Navbar />
    <main className="flex-1 pt-16 container mx-auto px-4 py-8">{children}</main>
    <footer className="bg-gray-100 text-center p-4 text-sm">TecniRacer 2024</footer>
  </div>
);

