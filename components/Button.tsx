import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'secondary',
  className = '',
  ...rest
}) => {
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-red text-white hover:bg-brand-red/90'
      : 'bg-brand-blue text-white hover:bg-brand-blue/90';
  const disabledClass = rest.disabled ? 'cursor-not-allowed opacity-50' : '';
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors ${variantClass} ${disabledClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
