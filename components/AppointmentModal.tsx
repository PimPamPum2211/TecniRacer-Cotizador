import React from 'react';
import { AppointmentForm } from './AppointmentForm';

interface Props {
  visible: boolean;
  serviceId: string;
  onClose: () => void;
}

export const AppointmentModal: React.FC<Props> = ({ visible, serviceId, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Agendar Servicio</h2>
        <AppointmentForm serviceId={serviceId} onSuccess={onClose} />
        <button onClick={onClose} className="mt-4 bg-gray-200 px-4 py-2 rounded w-full">
          Cancelar
        </button>
      </div>
    </div>
  );
};
