import { useRouter } from 'next/router';
import { useCart } from '../lib/CartContext';
import { useState } from 'react';
import { Button } from '../components/Button';

export default function Vehicle() {
  const router = useRouter();
  const { serviceId } = router.query;
  const { items, clear } = useCart();

  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [document, setDocument] = useState('');
  const [scheduled, setScheduled] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targets = serviceId ? [{ id: serviceId as string }] : items;
    try {
      const responses = await Promise.all(
        targets.map((s) =>
          fetch('/api/appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              serviceId: s.id,
              customer,
              phone,
              plate,
              document,
              scheduled
            })
          })
        )
      );
      if (responses.every((r) => r.ok)) {
        clear();
        router.push('/history');
      } else {
        setError('Error al enviar los datos');
      }
    } catch (err) {
      console.error(err);
      setError('Error al enviar los datos');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Datos del Vehículo</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Nombre"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
        <input
          type="tel"
          className="border rounded w-full p-2"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Placa"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
        />
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Cédula"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          className="border rounded w-full p-2"
          value={scheduled}
          onChange={(e) => setScheduled(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" variant="secondary" className="w-full">
          Enviar
        </Button>
      </form>
    </div>
  );
}
