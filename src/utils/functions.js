export const ftToIn = ft => {
  const ftIn = ft
    .replace('"', "'")
    .split("'")
    .map(val => Number(val))

  return ftIn[0] * 12 + ftIn[1]
}

export const inToFt = totalInches => {
  const ft = Math.trunc(totalInches / 12)
  const inch = totalInches % 12

  return `${ft}'${inch}"`
}
