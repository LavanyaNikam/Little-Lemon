export function validateForm(data) {
  return (
    data.name.trim().length > 0 &&
    data.date &&
    data.time &&
    parseInt(data.guests) > 0 &&
    !!data.occasion
  );
}
