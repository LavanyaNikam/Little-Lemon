import { validateForm } from './Validation';

test('returns true for valid form data', () => {
  const validData = {
    name: 'Lavanya',
    date: '2025-06-01',
    time: '19:00',
    guests: '2',
    occasion: 'Birthday'
  };
  expect(validateForm(validData)).toBe(true);
});

test('returns false if name is missing', () => {
  const invalidData = {
    name: '',
    date: '2025-06-01',
    time: '19:00',
    guests: '2',
    occasion: 'Birthday'
  };
  expect(validateForm(invalidData)).toBe(false);
});
