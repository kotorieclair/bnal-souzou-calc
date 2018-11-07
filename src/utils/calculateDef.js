const calculateDef = (
  weapon,
  { tech = 0, genius = 0, beauty = 0, truth = 0 }
) => {
  const calcType = this.weaponsData[weapon].as || weapon

  const base =
    calcType === 'bow'
      ? tech + genius + truth
      : tech + genius + beauty / 2 + truth / 2

  return Math.round(base / this.weaponsData[calcType].adjustment.def)
}

export default calculateDef
