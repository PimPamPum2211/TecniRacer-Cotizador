import { useState } from 'react';
import services from '../data/services.json';
import { ServiceCard } from '../components/ServiceCard';
import { Carousel } from '../components/Carousel';
import { CategoryTabs } from '../components/CategoryTabs';
import { useRouter } from 'next/router';

const categories = ['Mantenimientos', 'Diagnóstico'];

export default function Home() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const router = useRouter();

  const schedule = (slug: string) => {
    router.push(`/vehicle?serviceId=${slug}`);
  };

  return (
    <div className="p-4">
      <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />
      <Carousel>
        {services
          .filter((s) => s.category === activeCat)
          .map((s) => (
          <div key={s.slug} className="w-60 sm:w-72">
            <ServiceCard
              id={s.slug}
              name={s.name}
              icon={s.icon}
              image={s.image}
              price={s.basePrice}
              onSchedule={() => schedule(s.slug)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
