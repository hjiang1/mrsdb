import React from "react"
import styled from "styled-components"
import { FaRedo } from "react-icons/fa"
import cn from "classnames"

import { defaultFilters } from "./filters"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;

  .reset-button .reset-icon {
    margin-right: 0.5rem;
  }

  .cancel-submit-container {
    display: flex;
    align-items: center;
  }
`

const FiltersModalActions = ({
  filters,
  filterSettings,
  setFilters,
  setOpen,
  isDefault,
  setFilterSettings,
}) => {
  // Apply filters to table
  const applyFilters = () => {
    const newFilters = Object.assign({}, filters, filterSettings)

    setFilters(newFilters)
    setOpen(false)
  }

  // Reset filters to default values
  const resetFilters = () => {
    setFilterSettings(JSON.parse(JSON.stringify(defaultFilters)))
  }

  return (
    <Container>
      <button
        className={cn("button", "reset-button", { disabled: isDefault })}
        onClick={resetFilters}
      >
        <FaRedo className="reset-icon" size="1rem" />
        Reset Filters
      </button>
      <div className="cancel-submit-container">
        <button className="button cancel" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button className="button" onClick={applyFilters}>
          Apply
        </button>
      </div>
    </Container>
  )
}

export default FiltersModalActions
