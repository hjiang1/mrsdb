import { inToFt, ftToIn } from "../../utils/functions"

export const parseFiltersFromApi = filters => {
  const filtersObject = {}

  filters.forEach(filter => {
    let filterObject

    switch (filter.type) {
      case "checkbox":
        filterObject = {
          Uncategorized: true,
        }

        filter.options.forEach(option => {
          filterObject[option] = true
        })
        break

      case "range":
        if (filter.unit === "in") {
          filterObject = {
            min: inToFt(filter.min),
            max: inToFt(filter.max),
            Uncategorized: true,
          }
        } else {
          filterObject = {
            min: filter.min,
            max: filter.max,
            Uncategorized: true,
          }
        }
        break
      default: // do nothing
    }

    filtersObject[filter.accessor] = filterObject
  })

  return filtersObject
}

export const checkbox = (filterMetadata, data, options) => {
  const newFilteredData = []

  data.forEach(dataPoint => {
    if (
      options[dataPoint[[filterMetadata.accessor]]] ||
      (dataPoint[[filterMetadata.accessor]] === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

export const range = (filterMetadata, data, options) => {
  const newFilteredData = []
  data.forEach(dataPoint => {
    let value, min, max

    if (filterMetadata.unit === "in") {
      value = ftToIn(dataPoint[filterMetadata.accessor])
      min = ftToIn(options.min)
      max = ftToIn(options.max)
    } else {
      value = dataPoint[filterMetadata.accessor]
      min = options.min
      max = options.max
    }

    if (
      (value !== "" && value >= min && value <= max) ||
      (value === "" && options["Uncategorized"])
    ) {
      newFilteredData.push(dataPoint)
    }
  })

  return newFilteredData
}

const filterFunctions = {
  checkbox,
  range,
}

export default filterFunctions
