export default (number) => {
  const parsed = parseInt(number);
  if (!Number.isInteger(parsed)) {
    return '';
  }

  return parsed < 0 ? parsed : `+${parsed}`;
}
