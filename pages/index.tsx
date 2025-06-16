import { useState } from 'react';
import services from '../data/services.json';
import ServiceCard from '../components/ServiceCard';
import { Carousel } from '../components/Carousel';
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
    <div className="p-4">
      <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />
      <Carousel>
        {services
          .filter((s) => s.category === activeCat)
          .map((s) => (
          <div key={s.id} className="w-60 sm:w-72">
            <ServiceCard
              name={s.name}
              image={s.image}
              price={s.basePrice}
              onBook={() => schedule(s.id)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
