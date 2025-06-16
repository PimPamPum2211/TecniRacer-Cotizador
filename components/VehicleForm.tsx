'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function VehicleForm({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement & {
      customer: { value: string };
      phone: { value: string };
      plate: { value: string };
      document: { value: string };
      scheduled: { value: string };
    };
    const data = {
      serviceId,
      customer: form.customer.value,
      phone: form.phone.value,
      plate: form.plate.value,
      document: form.document.value,
      scheduled: form.scheduled.value,
    };

    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (!res.ok) {
      try {
        const { error } = await res.json();
        setError(error ?? 'Error desconocido');
      } catch {
        setError('Error desconocido');
      }
      return;
    }
    router.push('/confirmacion');
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 max-w-lg space-y-4 rounded-xl border p-6 shadow"
    >
      <h2 className="text-2xl font-semibold">Datos del Vehículo</h2>

      <input
        name="customer"
        placeholder="Nombre"
        required
        className="input"
      />
      <input
        name="phone"
        placeholder="Teléfono"
        required
        className="input"
      />
      <input
        name="plate"
        placeholder="Placa"
        required
        className="input"
      />
      <input
        name="document"
        placeholder="Documento"
        className="input"
      />
      <input
        type="datetime-local"
        name="scheduled"
        required
        className="input"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  );
}
