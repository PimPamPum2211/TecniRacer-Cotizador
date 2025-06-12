import React, { useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Carousel: React.FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const node = containerRef.current;
    if (!node) return;
    const width = node.clientWidth;
    node.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
      >
        ❮
      </button>
      <div
        ref={containerRef}
        className="overflow-x-auto whitespace-nowrap scroll-smooth"
      >
        <div className="inline-flex gap-4 px-8">{children}</div>
      </div>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};
