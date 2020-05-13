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

// Filter by control
export const filterControl = (data, options) => {
  const newFilteredData = []

  data.forEach(dataPoint => {
    if (
      options[dataPoint.control_concussed] ||
      (dataPoint.control_concussed === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

// Filter by age
export const filterAge = (data, options) => {
  const newFilteredData = []
  data.forEach(dataPoint => {
    if (
      (dataPoint.age !== "" &&
        dataPoint.age >= options.min &&
        dataPoint.age <= options.max) ||
      (dataPoint.age === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

// Filter by weight
export const filterWeight = (data, options) => {
  const newFilteredData = []
  data.forEach(dataPoint => {
    console.log(dataPoint)
    if (
      (dataPoint.weight_lbs !== "" &&
        dataPoint.weight_lbs >= options.min &&
        dataPoint.weight_lbs <= options.max) ||
      (dataPoint.weight_lbs === "" && options["Uncategorized"])
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
  control_concussed: {
    Control: true,
    Concussed: true,
    Uncategorized: true,
  },
  age: {
    min: 17,
    max: 24,
    Uncategorized: true,
  },
  weight: {
    min: 120,
    max: 293,
    Uncategorized: true,
  },
}

// Map filter id to filtering function
export const filterFunctions = {
  complete: filterComplete,
  sex: filterSex,
  sport: filterSport,
  control_concussed: filterControl,
  age: filterAge,
  weight: filterWeight,
}
