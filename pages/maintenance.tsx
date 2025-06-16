import services from '../data/services.json';
import ServiceCard from '../components/ServiceCard';
import { useRouter } from 'next/router';

export default function Maintenance() {
  const router = useRouter();
  const items = services.filter((s) => s.category === 'Mantenimientos');

  const schedule = (id: string) => {
    router.push(`/vehicle?serviceId=${id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Mantenimientos</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <ServiceCard
            key={s.id}
            name={s.name}
            image={s.image}
            price={s.basePrice}
            onBook={() => schedule(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
