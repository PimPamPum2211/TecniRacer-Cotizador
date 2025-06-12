import React from 'react';

interface Props {
  visible: boolean;
  price: number | null;
  onClose: () => void;
}

export const QuoteModal: React.FC<Props> = ({ visible, price, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Cotización</h2>
        <p className="mb-4">
          {price !== null ? `El precio es $${price}` : 'Calculando...'}
        </p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
};
