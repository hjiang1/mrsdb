export const sortRows = (sortBy, sortDirection, headers, sortType) => (
  a,
  b
) => {
  let sorted

  const sortAlphaNum = (a, b) => (a > b ? 1 : -1)
  const sortDate = (a, b) => new Date(a) - new Date(b)
  const sortHeightFt = (a, b) => {
    const ftInA = a
      .replace('"', "'")
      .split("'")
      .map(val => Number(val))
    const ftInB = b
      .replace('"', "'")
      .split("'")
      .map(val => Number(val))
    const inA = ftInA[0] * 12 + ftInA[1]
    const inB = ftInB[0] * 12 + ftInB[1]

    return inA > inB ? 1 : -1
  }
  const getSortFunction = (a, b, type) => {
    switch (type) {
      default:
      case "alphaNum":
        return sortAlphaNum(a, b)

      case "date":
        return sortDate(a, b)

      case "height_ft":
        return sortHeightFt(a, b)
    }
  }
  const recursiveHeaderSort = (a, b, headers, headerIndex, sortBy) => {
    const currentId = headers[headerIndex].id

    // If two entries at equal at the last header, then the two are identical
    if (headerIndex === headers.length - 1) {
      return 1
    }
    // If current header is equal or the sortBy header, check next one
    else if (a[currentId] === b[currentId] || currentId === sortBy) {
      return recursiveHeaderSort(a, b, headerIndex + 1)
    }
    // Else sort by sortBy value
    else {
      return getSortFunction(
        a[currentId],
        b[currentId],
        headers[headerIndex].sortType
      )
    }
  }

  // If sortBy value is equal, subsort based on other headers
  if (a[sortBy] === b[sortBy]) {
    sorted = recursiveHeaderSort(a, b, headers, 0)
  }
  // Else sort by sortBy value
  else {
    sorted = getSortFunction(a[sortBy], b[sortBy], sortType)
  }

  return sortDirection === "ascending" ? sorted : -sorted
}
