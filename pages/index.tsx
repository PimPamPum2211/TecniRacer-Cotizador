import { useState } from 'react';
import services from '../data/services.json';
import ServiceCard from '../components/ServiceCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { useRouter } from 'next/router';

const categories = ['Mantenimientos', 'Diagnóstico'];

export default function Home() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const router = useRouter();

  const schedule = (id: string) => {
    router.push(`/vehicle?serviceId=${id}`);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold">Servicios</h1>
      <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((s) => s.category === activeCat)
          .map((s) => (
            <ServiceCard
              key={s.id}
              name={s.name}
              price={s.basePrice}
              image={s.image}
              onBook={() => schedule(s.id)}
            />
          ))}
      </div>
    </main>
  );
}
