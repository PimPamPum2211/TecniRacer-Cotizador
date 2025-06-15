import useSWR from 'swr';
import { useEffect } from 'react';
import { useQuotes, Quote } from '../lib/QuotesContext';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function History() {
  const { quotes, addQuote, setQuotes } = useQuotes();
  const { data } = useSWR<Quote[]>('/api/quotes', fetcher);

  useEffect(() => {
    if (data) {
      setQuotes(data);
    }
  }, [data, setQuotes]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Historial de Cotizaciones</h1>
      <ul className="space-y-2">
        {quotes.map((q) => (
          <li key={q.id} className="border p-2 rounded">
            <p className="font-medium">{q.serviceName}</p>
            <p className="text-sm text-gray-600">${q.price} - {new Date(q.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
