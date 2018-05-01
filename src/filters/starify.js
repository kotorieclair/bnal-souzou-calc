export default (rare) => {
  const parsed = parseInt(rare);
  if (!Number.isInteger(parsed)) {
    // throw new Error('filter: starify - the given rare is not an integer!');
    return '';
  }

  return '★'.repeat(rare);
}
