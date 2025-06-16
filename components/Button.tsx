import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, className = '', ...rest }) => (
  <button
    className={`px-3 py-1 rounded-lg border border-brand-slate bg-white text-brand-neutral hover:bg-brand hover:text-white transition-colors duration-150 disabled:opacity-50 ${className}`}
    {...rest}
  >
    {children}
  </button>
);
