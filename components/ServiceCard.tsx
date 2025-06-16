import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import Image from 'next/image';

import { Button } from './Button';
import { useCart } from '../lib/CartContext';

interface Props {
  id: string;
  name: string;
  icon: string;
  image: string;
  price: number;
  onSchedule: () => void;
}

export const ServiceCard: React.FC<Props> = ({ id, name, icon, image, price, onSchedule }) => {
  const { items, addItem } = useCart();
  const hasCart = items.length > 0;

  return (
    <motion.div
      className="bg-white rounded-xl border border-brand-blue/10 flex flex-col items-center hover:shadow-card transition-shadow"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full aspect-video overflow-hidden rounded-t-xl relative">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <Image src={icon} alt={name} width={48} height={48} className="-mt-6 bg-white rounded-full p-2 shadow" />
      <h3 className="font-semibold mt-2 text-center">{name}</h3>
      <p className="text-sm mb-2">{`Desde $${price}`}</p>
      <div className="flex gap-2 mt-auto pb-2 flex-wrap justify-center">
        {!hasCart && (
          <Button onClick={onSchedule} className="bg-green-600 hover:bg-green-700">
            Agendar
          </Button>
        )}
        <Button onClick={() => addItem({ id, name, price })} className="bg-orange-600 hover:bg-orange-700">
          Agregar
        </Button>
      </div>
    </motion.div>
  );
};
