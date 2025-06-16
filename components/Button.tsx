import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary';
}

export const Button: React.FC<Props> = ({ children, variant, className = '', ...rest }) => {
  const variantClass = variant === 'primary' ? 'bg-brand-red text-white hover:bg-brand-red/90' : '';
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
