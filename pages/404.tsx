import { Layout } from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">Página no encontrada</h1>
        <Link href="/" className="text-blue-600 underline">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
}

Custom404.title = 'Página no encontrada';
