const estimateCardStatus = (status, lv) => {
  const adj = lv === 3 ? 2 : lv === 2 ? 1.4 : 1
  const estimated = {}
  Object.keys(status[1]).forEach(key => {
    estimated[key] = Math.ceil(status[1][key] * adj)
  })
  return estimated
}

export default estimateCardStatus
