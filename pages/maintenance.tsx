import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { QuoteModal } from '../components/QuoteModal';
import { AppointmentModal } from '../components/AppointmentModal';
import { useState } from 'react';
import { useQuotes } from '../lib/QuotesContext';

export default function Maintenance() {
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [scheduleServiceId, setScheduleServiceId] = useState<string | null>(null);
  const { addQuote } = useQuotes();

  const items = services.filter((s) => s.category === 'Mantenimientos');

  const quote = async (id: string) => {
    setQuoteVisible(true);
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: id }),
    });
    const data = await res.json();
    setQuotePrice(data.price);
    addQuote({
      id: data.quoteId,
      price: data.price,
      serviceId: id,
      createdAt: new Date().toISOString(),
      serviceName: items.find((s) => s.id === id)?.name || id,
    });
  };

  const schedule = (id: string) => {
    setScheduleServiceId(id);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Mantenimientos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s) => (
          <ServiceCard
            key={s.id}
            id={s.id}
            name={s.name}
            icon={s.icon}
            image={s.image}
            price={s.basePrice}
            onQuote={() => quote(s.id)}
            onSchedule={() => schedule(s.id)}
          />
        ))}
      </div>
      <QuoteModal visible={quoteVisible} price={quotePrice} onClose={() => setQuoteVisible(false)} />
      {scheduleServiceId && (
        <AppointmentModal
          visible={true}
          serviceId={scheduleServiceId}
          onClose={() => setScheduleServiceId(null)}
        />
      )}
    </div>
  );
}
