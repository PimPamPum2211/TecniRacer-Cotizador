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
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{it.name}</p>
              <p className="text-sm text-gray-600">${it.price}</p>
            </div>
            <Button onClick={() => removeItem(it.id)} variant="primary">
              Eliminar
            </Button>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: ${total}</p>
      <div className="mt-4 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push('/vehicle?cart=1')}
        >
          Pagar
        </Button>
        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={clear}>
          Vaciar
        </Button>
      </div>
    </div>
  );
}
