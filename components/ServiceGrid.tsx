import React from 'react';
import { ServiceCard } from './ServiceCard';

export interface Service {
  id: string;
  name: string;
  icon: string;
  image: string;
  basePrice: number;
}

interface Props {
  title?: string;
  services: Service[];
  onSchedule: (id: string) => void;
}

export const ServiceGrid: React.FC<Props> = ({ title, services, onSchedule }) => (
  <section className="space-y-8">
    {title && (
      <h2 className="text-2xl font-semibold text-brand-blue">{title}</h2>
    )}
    <div className="grid w-full grid-cols-mosaic gap-6">
      {services.map((s) => (
        <ServiceCard
          key={s.id}
          id={s.id}
          name={s.name}
          icon={s.icon}
          image={s.image}
          price={s.basePrice}
          onSchedule={() => onSchedule(s.id)}
        />
      ))}
    </div>
  </section>
);

