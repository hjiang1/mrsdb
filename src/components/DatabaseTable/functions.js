export const recursiveHeaderSort = (a, b, headers, headerIndex, sortBy) => {
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
    return a[currentId] > b[currentId] ? 1 : -1
  }
}

export const sortAB = (sortBy, sortDirection, headers) => (a, b) => {
  let sorted

  // If sortBy value is equal, subsort based on other headers
  if (a[sortBy] === b[sortBy]) {
    sorted = recursiveHeaderSort(a, b, headers, 0)
  }
  // Else sort by sortBy value
  else {
    sorted = a[sortBy] > b[sortBy] ? 1 : -1
  }

  return sortDirection === "ascending" ? sorted : -sorted
}
