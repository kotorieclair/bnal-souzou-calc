export default rare => {
  const parsed = parseInt(rare)
  if (!Number.isInteger(parsed)) {
    return ''
  }

  return '★'.repeat(rare)
}
