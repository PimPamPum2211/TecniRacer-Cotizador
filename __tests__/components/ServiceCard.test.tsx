import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceCard } from '../../components/ServiceCard';
import { CartProvider } from '../../lib/CartContext';

describe('ServiceCard', () => {
  it('calls provided callbacks', () => {
    const onQuote = jest.fn();
    const onSchedule = jest.fn();
    render(
      <CartProvider>
        <ServiceCard
          id="s1"
          name="Servicio"
          icon=""
          image=""
          price={100}
          onQuote={onQuote}
          onSchedule={onSchedule}
        />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Cotizar'));
    fireEvent.click(screen.getByText('Agendar'));

    expect(onQuote).toHaveBeenCalled();
    expect(onSchedule).toHaveBeenCalled();
  });
});
