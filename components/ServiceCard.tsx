import React from 'react';

import { Button } from './Button';
import { useCart } from '../lib/CartContext';

interface Props {
  id: string;
  name: string;
  icon: string;
  image: string;
  price: number;
  onQuote?: () => void;
  onSchedule?: () => void;
  onAdd?: () => void;
}

export const ServiceCard: React.FC<Props> = ({
  id,
  name,
  icon,
  image,
  price,
  onQuote,
  onSchedule,
  onAdd
}) => {
  const { items, addItem } = useCart();
  const hasCart = items.length > 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md transition transform hover:scale-[1.02] hover:shadow-xl duration-200 ease-in-out">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow">
          <img src={icon} alt={name} className="w-8 h-8" />
        </div>
      </div>
      <div className="pt-10 pb-6 px-6 text-center">
        <h3 className="text-2xl font-semibold text-brand-neutral mb-2">{name}</h3>
        <p className="text-base text-brand-slate">Desde ${price}</p>
        <div className="mt-4 flex justify-center space-x-2">
          {onQuote && (
            <Button onClick={onQuote} className="">
              Cotizar
            </Button>
          )}
          {onSchedule && !hasCart && (
            <Button onClick={onSchedule} className="bg-brand text-white hover:bg-brand-dark">
              Agendar
            </Button>
          )}
          <Button
            onClick={() => (onAdd ? onAdd() : addItem({ id, name, price }))}
            className="bg-secondary text-white hover:bg-green-700"
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};
