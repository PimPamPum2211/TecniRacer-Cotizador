import React from 'react';

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No hay resultados' }) => (
  <div className="py-8 text-center text-gray-500">{message}</div>
);
