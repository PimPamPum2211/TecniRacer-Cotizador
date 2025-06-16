import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button: React.FC<Props> = ({ children, variant, className = '', ...rest }) => {
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-red text-white hover:bg-brand-red/90'
      : variant === 'secondary'
      ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
      : variant === 'outline'
      ? 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10'
      : variant === 'ghost'
      ? 'text-brand-blue hover:bg-brand-blue/10'
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
