import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QuotesProvider } from '../lib/QuotesContext';
import { CartProvider } from '../lib/CartContext';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps & { Component: any }) {
  const { title, description } = Component;
  return (
    <CartProvider>
      <QuotesProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen bg-gradient-radial from-white via-gray-50 to-gray-200 dark:from-slate-900 dark:to-slate-950">
            <Layout title={title} description={description}>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      </QuotesProvider>
    </CartProvider>
  );
}

export default MyApp;
