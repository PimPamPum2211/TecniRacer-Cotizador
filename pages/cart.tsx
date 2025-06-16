import { useCart } from '../lib/CartContext';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';

export default function Cart() {
  const { items, removeItem, clear } = useCart();
  const router = useRouter();
  const total = items.reduce((sum, i) => sum + i.price, 0);

  if (items.length === 0) {
    return <h1 className="text-xl font-semibold">Carrito vacío</h1>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Carrito de Servicios</h1>
      <details className="bg-white border rounded-lg p-4 shadow sm:hidden">
        <summary className="flex justify-between cursor-pointer">
          <span>Carrito ({items.length})</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <ul className="space-y-2 mt-2">
          {items.map((it) => (
            <li key={it.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-gray-600">${it.price}</p>
              </div>
              <Button onClick={() => removeItem(it.id)} className="bg-red-600 hover:bg-red-700">
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </details>

      <aside className="hidden sm:block">
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-gray-600">${it.price}</p>
              </div>
              <Button onClick={() => removeItem(it.id)} className="bg-red-600 hover:bg-red-700">
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </aside>

      <p className="mt-4 font-semibold">Total: ${total}</p>
      <div className="mt-4 flex gap-2">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => router.push('/vehicle?cart=1')}
        >
          Pagar
        </Button>
        <Button className="bg-gray-200 text-brand-neutral hover:bg-gray-300" onClick={clear}>
          Vaciar
        </Button>
      </div>
    </div>
  );
}
