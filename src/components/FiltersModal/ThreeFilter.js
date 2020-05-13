import React from "react"

import ToggleButton from "../ToggleButton"
import Filter from "./Filter"

const ThreeFilter = ({ filters, setFilterSettings }) => {
  const toggleFilter = () => {
    const newFilters = Object.assign({}, filters)
    newFilters.threeScans.filter = !newFilters.threeScans.filter

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Only Show Subjects With All Scans Completed">
      <ToggleButton value={filters.threeScans.filter} onClick={toggleFilter} />
    </Filter>
  )
}

export default ThreeFilter
