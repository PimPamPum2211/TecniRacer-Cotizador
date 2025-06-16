import Image from 'next/image';
import { Fuel } from 'lucide-react';

type Props = {
  name: string;
  price: number;
  image: string;
  onQuote?: () => void;
  onBook?: () => void;
  onAdd?: () => void;
};

export default function ServiceCard({
  name,
  price,
  image,
  onQuote,
  onBook,
  onAdd,
}: Props) {
  return (
    <div className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative h-44 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-4 shadow">
        <Fuel className="h-8 w-8 text-primary" />
      </div>

      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-lg text-slate-500">Desde ${price}</p>

        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          <button onClick={onQuote} className="btn-outline">
            Cotizar
          </button>
          <button onClick={onBook} className="btn-outline">
            Agendar
          </button>
          <button onClick={onAdd} className="btn-outline">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
