import { useState } from 'react';
import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { Carousel } from '../components/Carousel';
import { CategoryTabs } from '../components/CategoryTabs';
import { QuoteModal } from '../components/QuoteModal';
import { AppointmentForm } from '../components/AppointmentForm';

const categories = ['Mantenimientos', 'Diagnóstico'];

export default function Home() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [quoteVisible, setQuoteVisible] = useState(false);

  const quote = async (id: string) => {
    setQuoteVisible(true);
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: id })
    });
    const data = await res.json();
    setQuotePrice(data.price);
  };

  return (
    <div className="p-4">
      <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />
      <Carousel>
        {services.map((s) => (
          <div key={s.id} className="w-48">
            <ServiceCard
              name={s.name}
              icon={s.icon}
              price={s.basePrice}
              onQuote={() => quote(s.id)}
              onSchedule={() => {}}
            />
          </div>
        ))}
      </Carousel>
      <QuoteModal visible={quoteVisible} price={quotePrice} onClose={() => setQuoteVisible(false)} />
    </div>
  );
}
