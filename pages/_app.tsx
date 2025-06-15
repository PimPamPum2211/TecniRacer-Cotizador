import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QuotesProvider } from '../lib/QuotesContext';
import { CartProvider } from '../lib/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <QuotesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QuotesProvider>
    </CartProvider>
  );
}

export default MyApp;
