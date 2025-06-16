import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ls = localStorage.getItem('theme');
    const preferred =
      ls === 'dark' ||
      (!ls && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(preferred);
    document.documentElement.classList.toggle('dark', preferred);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/cotizar', label: 'Cotizar' },
    { href: '/mantenimiento', label: 'Mantenimiento' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand">
          TecniRacer
        </Link>

        <nav className="hidden md:flex space-x-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2 rounded focus:ring-2"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link href="/cart" className="hidden md:block p-2" aria-label="Carrito">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menú">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Carrito
          </Link>
        </nav>
      )}
    </header>
  );
}
