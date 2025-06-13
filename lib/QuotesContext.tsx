import React, { createContext, useContext, useState } from 'react';

export interface Quote {
  id: string;
  serviceId: string;
  price: number;
  createdAt: string;
  serviceName: string;
}

interface QuoteState {
  quotes: Quote[];
  addQuote: (q: Quote) => void;
}

const QuoteContext = createContext<QuoteState | undefined>(undefined);

export const useQuotes = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('QuoteContext missing');
  return ctx;
};

export const QuotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const addQuote = (q: Quote) => setQuotes((prev) => [q, ...prev]);

  return (
    <QuoteContext.Provider value={{ quotes, addQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};
