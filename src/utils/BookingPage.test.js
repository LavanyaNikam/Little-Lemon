
import { render, screen } from '@testing-library/react';
import BookingPage from '../Components/BookingPage';

test('renders Full Name input with required attribute', () => {
  render(<BookingPage />);
  const nameInput = screen.getByLabelText(/full name/i);
  expect(nameInput).toBeRequired();
});

test('renders guests input with min value', () => {
  render(<BookingPage />);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  expect(guestsInput).toHaveAttribute('min', '1');
});
