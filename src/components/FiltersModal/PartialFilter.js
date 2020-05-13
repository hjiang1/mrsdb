import React from "react"

import ToggleButton from "../ToggleButton"
import Filter from "./Filter"

const PartialFilter = ({ filters, onChange }) => {
  return (
    <Filter name="Show Partial Data Points">
      <ToggleButton value={!filters.complete.remove} onClick={onChange} />
    </Filter>
  )
}

export default PartialFilter
