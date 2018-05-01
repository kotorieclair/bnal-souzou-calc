export default (number) => {
  const parsed = parseInt(number);
  if (!Number.isInteger(parsed)) {
    // throw new Error('filter: addSign - the given number is not an integer!');
    return '';
  }

  return parsed < 0 ? parsed : `+${parsed}`;
}
