import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button: React.FC<Props> = ({ children, variant, className = '', ...rest }) => {
  const variantClass =
    variant === 'primary'
      ? 'bg-secondary-500 text-white hover:bg-secondary-600'
      : variant === 'secondary'
      ? 'bg-primary-600 text-white hover:bg-primary-700'
      : variant === 'outline'
      ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
      : variant === 'ghost'
      ? 'text-primary-600 hover:bg-primary-50'
      : '';
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
