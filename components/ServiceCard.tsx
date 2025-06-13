import React from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  icon: string;
  price: number;
  onQuote: () => void;
  onSchedule: () => void;
}

export const ServiceCard: React.FC<Props> = ({ name, icon, price, onQuote, onSchedule }) => (
  <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition flex flex-col items-center">
    <Image src={icon} alt={name} width={48} height={48} className="mb-2" />
    <h3 className="font-semibold mb-1 text-center">{name}</h3>
    <p className="text-sm mb-2">{`Desde $${price}`}</p>
    <div className="flex gap-2">
      <button onClick={onQuote} className="bg-blue-500 text-white px-3 py-1 rounded">Cotizar</button>
      <button onClick={onSchedule} className="bg-green-500 text-white px-3 py-1 rounded">Agendar</button>
    </div>
  </div>
);
