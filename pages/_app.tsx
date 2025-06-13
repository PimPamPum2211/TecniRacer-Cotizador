import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QuotesProvider } from '../lib/QuotesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuotesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QuotesProvider>
  );
}

export default MyApp;
