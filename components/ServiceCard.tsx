import Image from 'next/image';
import { Droplet } from 'lucide-react';

type Props = {
  name: string;
  price: number;
  image: string;
  onBook?: () => void;
};

export default function ServiceCard({ name, price, image, onBook }: Props) {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[3/2] w-full bg-gray-200">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-4 shadow">
        <Droplet className="h-8 w-8 text-primary" />
      </div>

      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-base text-slate-500">Desde ${price}</p>

        <button onClick={onBook} className="btn-outline mt-4 w-full">
          Agendar
        </button>
      </div>
    </div>
  );
}
