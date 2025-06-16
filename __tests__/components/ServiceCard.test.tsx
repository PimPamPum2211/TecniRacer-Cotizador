import { render, screen, fireEvent } from '@testing-library/react';
import ServiceCard from '../../components/ServiceCard';

describe('ServiceCard', () => {
  it('calls book callback', () => {
    const onBook = jest.fn();
    render(
      <ServiceCard
        name="Servicio"
        image=""
        price={100}
        onBook={onBook}
      />
    );

    fireEvent.click(screen.getByText('Agendar'));
    expect(onBook).toHaveBeenCalled();
  });
});
