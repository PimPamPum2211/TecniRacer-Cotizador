import { useState } from 'react';
import { Button } from '../components/Button';

export default function Lookup() {
  const [plate, setPlate] = useState('');
  const [document, setDocument] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/appointment?plate=${encodeURIComponent(plate)}&document=${encodeURIComponent(document)}`);
    if (res.ok) {
      const data = await res.json();
      setResult(data);
      setError(null);
    } else {
      setResult(null);
      setError('No se encontró la cita');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Consultar Cita</h1>
      <form onSubmit={search} className="space-y-4">
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
        <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">
          Buscar
        </Button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {result && (
        <div className="border p-4 rounded space-y-1">
          <p className="font-medium">Servicio: {result.service.name}</p>
          <p>Fecha: {new Date(result.scheduled).toLocaleString()}</p>
          <p>Cliente: {result.customer}</p>
        </div>
      )}
    </div>
  );
}

Lookup.title = 'Buscar cita';
