export const sortRows = (sortBy, sortDirection, headers, sortType) => (
  a,
  b
) => {
  let sorted

  const sortAlphaNum = (a, b) => (a > b ? 1 : -1)
  const sortDate = (a, b) => new Date(a) - new Date(b)
  const getSortFunction = (a, b) => {
    switch (sortType) {
      default:
      case "alphaNum":
        return sortAlphaNum(a, b)

      case "date":
        return sortDate(a, b)
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
      return getSortFunction(a[currentId], b[currentId])
    }
  }

  // If sortBy value is equal, subsort based on other headers
  if (a[sortBy] === b[sortBy]) {
    sorted = recursiveHeaderSort(a, b, headers, 0)
  }
  // Else sort by sortBy value
  else {
    sorted = getSortFunction(a[sortBy], b[sortBy])
  }

  return sortDirection === "ascending" ? sorted : -sorted
}

// Filter out incompleted data points
export const filterComplete = data => {
  const newFilteredData = []

  data.forEach(dataPoint => {
    if (!Object.values(dataPoint).includes("")) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}
