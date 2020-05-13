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
  loadedFilters,
  setFilters,
  setOpen,
  setFilterSettings,
  showUncategorized,
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

  // Check if modal filters match default filters; disregard Uncategorized if they are hidden
  const doFiltersMatchDefault = () => {
    let modalFilters = JSON.parse(JSON.stringify(loadedFilters))

    if (!showUncategorized && modalFilters.sport["Uncategorized"] === false) {
      modalFilters.sport["Uncategorized"] = true
    }

    return JSON.stringify(defaultFilters) === JSON.stringify(modalFilters)
  }

  return (
    <Container>
      <button
        className={cn("button", "reset-button", {
          disabled: doFiltersMatchDefault(),
        })}
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
