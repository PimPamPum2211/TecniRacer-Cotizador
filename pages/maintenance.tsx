import services from '../data/services.json';
import { ServiceGrid } from '../components/ServiceGrid';
import { useRouter } from 'next/router';

export default function Maintenance() {
  const router = useRouter();
  const items = services.filter((s) => s.category === 'Mantenimientos');

  const schedule = (id: string) => {
    router.push(`/vehicle?serviceId=${id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <ServiceGrid title="Mantenimientos" services={items} onSchedule={schedule} />
    </div>
  );
}
