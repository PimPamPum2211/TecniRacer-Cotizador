import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { useRouter } from 'next/router';

export default function Maintenance() {
  const router = useRouter();
  const items = services.filter((s) => s.category === 'Mantenimientos');

  const schedule = (id: string) => {
    router.push(`/vehicle?serviceId=${id}`);
  };

  return (
    <main role="main" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Mantenimientos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
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
    </main>
  );
}

Maintenance.title = 'Mantenimientos';
