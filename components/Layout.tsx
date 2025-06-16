import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<Props> = ({ children, title, description }) => {
  const pageTitle = title ? `${title} | TecniRacer` : 'TecniRacer';
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-neutral text-brand-neutral dark:text-gray-100 font-sans">
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 dark:bg-slate-800 text-center p-4 text-sm mt-auto">TecniRacer 2024</footer>
    </div>
  );
};


