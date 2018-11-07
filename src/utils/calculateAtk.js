const calculateAtk = (
  weapon,
  { tech = 0, genius = 0, beauty = 0, theme = 0, truth = 0 }
) => {
  const calcType = this.weaponsData[weapon].as || weapon

  const base =
    calcType === 'bow'
      ? tech + genius / 2 + beauty / 2 + theme / 2 + truth / 2
      : tech + genius / 2 + beauty + theme / 2

  return Math.round(base / this.weaponsData[calcType].adjustment.atk)
}

export default calculateAtk
