import { useEffect, useState } from 'react';
import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';

const categories = ['Mantenimientos', 'Diagnóstico'];

export default function Home() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const schedule = (id: string) => {
    router.push(`/vehicle?serviceId=${id}`);
  };

  const filtered = services.filter(
    (s) =>
      s.category === activeCat && s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <CategoryTabs
        categories={categories}
        active={activeCat}
        onChange={setActiveCat}
      />
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Buscar un servicio"
          className="flex-1 px-4 py-2 border border-brand-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => setQuery('')} className="bg-brand text-white hover:bg-brand-dark px-6 py-2 rounded-lg">
          Limpiar
        </Button>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-2xl" />
            ))
          : filtered.map((s) => (
              <ServiceCard
                key={s.id}
                id={s.id}
                name={s.name}
                icon={s.icon}
                image={s.image}
                price={s.basePrice}
                onSchedule={() => schedule(s.id)}
              />
            ))}
      </div>
    </div>
  );
}

Home.title = 'Inicio';
