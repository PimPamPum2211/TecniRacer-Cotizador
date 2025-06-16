import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="text-2xl font-bold text-brand">TecniRacer</a>
        </Link>

        {/* Enlaces */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/"><a className="hover:text-brand">Inicio</a></Link></li>
          <li><Link href="/cotizar"><a className="hover:text-brand">Cotizar</a></Link></li>
          <li><Link href="/mantenimiento"><a className="hover:text-brand">Mantenimiento</a></Link></li>
          <li><Link href="/contacto"><a className="hover:text-brand">Contacto</a></Link></li>
        </ul>

        {/* Botón móvil */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"/></svg>
        </button>

        <button onClick={() => setDark(!dark)} className="ml-4 text-sm border border-brand-slate px-2 py-1 rounded">
          {dark ? 'Claro' : 'Oscuro'}
        </button>
      </nav>
    </header>
  );
}
