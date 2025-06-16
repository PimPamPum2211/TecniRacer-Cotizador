import React from 'react';
import { Button } from './Button';

interface Props {
  visible: boolean;
  price: number | null;
  onClose: () => void;
}

export const QuoteModal: React.FC<Props> = ({ visible, price, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Cotización</h2>
        <ol className="flex justify-between mb-4 text-sm">
          <li className="flex-1 text-center">1. Solicitud</li>
          <li className="flex-1 text-center">2. Resultado</li>
        </ol>
        <p className="mb-4 text-center">
          {price !== null ? `El precio es $${price}` : 'Calculando...'}
        </p>
        <div className="text-center">
          <Button onClick={onClose} variant="primary">Cerrar</Button>
        </div>
      </div>
    </div>
  );
};
