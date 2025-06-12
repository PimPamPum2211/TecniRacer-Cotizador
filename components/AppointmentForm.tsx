import React, { useState } from 'react';

interface Props {
  serviceId: string;
  onSuccess: () => void;
}

export const AppointmentForm: React.FC<Props> = ({ serviceId, onSuccess }) => {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [scheduled, setScheduled] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Agendar
      </button>
    </form>
  );
};
