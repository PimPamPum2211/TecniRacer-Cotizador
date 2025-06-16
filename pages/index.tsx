import { useState } from 'react';
import services from '../data/services.json';
import { ServiceGrid } from '../components/ServiceGrid';
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
    <div className="p-4 space-y-4">
      <CategoryTabs
        categories={categories}
        active={activeCat}
        onChange={setActiveCat}
      />
      <ServiceGrid
        services={services.filter((s) => s.category === activeCat)}
        onSchedule={schedule}
      />
    </div>
  );
}
