// Filter out incomplete data points
export const filterComplete = (data, options) => {
  if (options.remove) {
    const newFilteredData = []

    data.forEach(dataPoint => {
      if (!Object.values(dataPoint).includes("")) {
        newFilteredData.push(dataPoint)
      }
    })

    return newFilteredData
  } else {
    return data
  }
}

// Filter by sex
export const filterSex = (data, options) => {
  const newFilteredData = []

  data.forEach(dataPoint => {
    if (
      options[dataPoint.sex] ||
      (dataPoint.sex === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

// Filter by sport
export const filterSport = (data, options) => {
  const newFilteredData = []

  data.forEach(dataPoint => {
    if (
      options[dataPoint.sport] ||
      (dataPoint.sport === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

// Default filter values
export const defaultFilters = {
  complete: {
    remove: true,
  },
  sex: {
    Male: true,
    Female: true,
    Uncategorized: true,
  },
  sport: {
    Baseball: true,
    Basketball: true,
    Crew: true,
    "Cross Country": true,
    Diving: true,
    Fencing: true,
    "Field Hockey": true,
    Football: true,
    Golf: true,
    "Ice Hockey": true,
    Lacrosse: true,
    Rugby: true,
    Sailing: true,
    Skiing: true,
    Squash: true,
    Soccer: true,
    Softball: true,
    Swimming: true,
    Tennis: true,
    "Track and Field": true,
    Volleyball: true,
    "Water Polo": true,
    Wrestling: true,
    Uncategorized: true,
  },
}

// Map filter id to filtering function
export const filterFunctions = {
  complete: filterComplete,
  sex: filterSex,
  sport: filterSport,
}
