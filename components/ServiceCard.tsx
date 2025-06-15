import React from 'react';

import { Button } from './Button';
import { useCart } from '../lib/CartContext';

interface Props {
  id: string;
  name: string;
  icon: string;
  image: string;
  price: number;
  onQuote: () => void;
  onSchedule: () => void;
}

export const ServiceCard: React.FC<Props> = ({ id, name, icon, image, price, onQuote, onSchedule }) => {
  const { items, addItem } = useCart();
  const hasCart = items.length > 0;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition flex flex-col items-center">
      <div className="w-full aspect-video overflow-hidden rounded-t-xl">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <img src={icon} alt="" className="w-12 h-12 -mt-6 bg-white rounded-full p-2 shadow" />
      <h3 className="font-semibold mt-2 text-center">{name}</h3>
      <p className="text-sm mb-2">{`Desde $${price}`}</p>
      <div className="flex gap-2 mt-auto pb-2 flex-wrap justify-center">
        {!hasCart && (
          <>
            <Button onClick={onQuote}>Cotizar</Button>
            <Button onClick={onSchedule} className="bg-green-600 hover:bg-green-700">
              Agendar
            </Button>
          </>
        )}
        <Button onClick={() => addItem({ id, name, price })} className="bg-orange-600 hover:bg-orange-700">
          Agregar
        </Button>
      </div>
    </div>
  );
};
