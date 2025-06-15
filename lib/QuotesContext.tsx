import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Quote {
  id: string;
  serviceId: string;
  price: number;
  createdAt: string;
  serviceName: string;
  customer?: string;
}

interface QuoteState {
  quotes: Quote[];
  addQuote: (q: Quote) => void;
  setQuotes: (list: Quote[]) => void;
}

const QuoteContext = createContext<QuoteState | undefined>(undefined);

export const useQuotes = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('QuoteContext missing');
  return ctx;
};

export const QuotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quotes');
    if (stored) {
      try {
        setQuotes(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = (q: Quote) => setQuotes((prev) => [q, ...prev]);
  const replace = (list: Quote[]) => setQuotes(list);

  return (
    <QuoteContext.Provider value={{ quotes, addQuote, setQuotes: replace }}>
      {children}
    </QuoteContext.Provider>
  );
};
