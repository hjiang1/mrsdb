import React from "react"

import ToggleButton from "../ToggleButton"
import Filter from "./Filter"

const PartialFilter = ({ filters, setFilterSettings }) => {
  const toggleCompleteFilter = () => {
    const newFilters = Object.assign({}, filters)
    newFilters.complete.remove = !newFilters.complete.remove

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Show Partial Data Points">
      <ToggleButton
        value={!filters.complete.remove}
        onClick={toggleCompleteFilter}
      />
    </Filter>
  )
}

export default PartialFilter
