import { useState } from 'react';
import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { useRouter } from 'next/router';

const categories = ['Mantenimientos', 'Diagnóstico'];

export default function Home() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const router = useRouter();

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
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setQuery('')}>
          Limpiar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
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
