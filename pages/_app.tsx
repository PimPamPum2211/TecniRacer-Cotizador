import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QuotesProvider } from '../lib/QuotesContext';
import { CartProvider } from '../lib/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <QuotesProvider>
        <div className="min-h-screen bg-gradient-radial from-white to-gray-100">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </QuotesProvider>
    </CartProvider>
  );
}

export default MyApp;
