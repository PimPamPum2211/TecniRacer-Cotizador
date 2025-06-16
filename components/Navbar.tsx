import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });
  const [open, setOpen] = useState(false);

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

  const linkClass = (href: string) =>
    `block px-4 py-2 border-b-2 ${
      router.pathname === href
        ? 'text-brand border-brand'
        : 'border-transparent hover:text-brand'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow z-50">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between p-4"
        role="navigation"
        aria-label="Main"
      >
        <Link href="/" className="text-xl font-bold text-brand">
          TecniRacer
        </Link>

        <div className="hidden md:flex space-x-6" role="menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded p-2 border border-brand-slate focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Abrir menú">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700" role="menu">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={linkClass(l.href)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
