const calculateAvd = (weapon, { tech = 0, beauty = 0, truth = 0 }) => {
  const calcType = this.weaponsData[weapon].as || weapon

  const base = calcType === 'bow' ? tech + truth : tech + beauty

  return Math.round(base / this.weaponsData[calcType].adjustment.avd)
}

export default calculateAvd
