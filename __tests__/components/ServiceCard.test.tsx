import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceCard } from '../../components/ServiceCard';
import { CartProvider } from '../../lib/CartContext';

describe('ServiceCard', () => {
  it('calls schedule callback', () => {
    const onSchedule = jest.fn();
    render(
      <CartProvider>
        <ServiceCard
          id="oil-change"
          name="Servicio"
          icon=""
          image=""
          price={100}
          onSchedule={onSchedule}
        />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Agendar'));
    expect(onSchedule).toHaveBeenCalled();
  });
});
