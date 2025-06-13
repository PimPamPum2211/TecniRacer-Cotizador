import React, { useState } from 'react';
import { Button } from './Button';

interface Props {
  serviceId: string;
  onSuccess: () => void;
}

export const AppointmentForm: React.FC<Props> = ({ serviceId, onSuccess }) => {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [scheduled, setScheduled] = useState('');

  const [errors, setErrors] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9]{7,}$/.test(phone)) {
      setErrors('Teléfono inválido');
      return;
    }
    setErrors(null);
    await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, customer, phone, scheduled })
    });
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        className="border rounded w-full p-2"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono"
        className="border rounded w-full p-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        className="border rounded w-full p-2"
        value={scheduled}
        onChange={(e) => setScheduled(e.target.value)}
        required
      />
      {errors && <p className="text-red-600 text-sm">{errors}</p>}
      <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">
        Agendar
      </Button>
    </form>
  );
};
