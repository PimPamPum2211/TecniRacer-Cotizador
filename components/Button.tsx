import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, className = '', ...rest }) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
    {...rest}
  >
    {children}
  </button>
);
