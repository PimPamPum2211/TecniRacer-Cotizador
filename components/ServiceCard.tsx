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
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow">
          <img src={icon} alt={name} className="w-8 h-8" />
        </div>
      </div>
      <div className="pt-10 pb-6 px-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">Desde ${price}</p>
        <div className="mt-4 flex justify-center space-x-2">
          {onQuote && (
            <Button onClick={onQuote} className="border border-gray-300 text-gray-700 hover:bg-gray-100">
              Cotizar
            </Button>
          )}
          {onSchedule && !hasCart && (
            <Button onClick={onSchedule} className="bg-primary text-white hover:bg-blue-700">
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
