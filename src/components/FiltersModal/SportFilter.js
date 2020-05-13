import React from "react"
import styled from "styled-components"
import cn from "classnames"

import Checkbox from "../Checkbox"
import Filter from "./Filter"
import { defaultFilters } from "./filters"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .option-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
  }

  .action-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;

    .select-button {
      margin-right: 1rem;
    }
  }
`

const SportFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  const changeSportFilter = sportId => {
    const newFilters = Object.assign({}, filters)
    newFilters.sport[sportId] = !newFilters.sport[sportId]

    setFilterSettings(newFilters)
  }

  const selectAll = () => {
    const newFilters = Object.assign({}, filters)
    Object.keys(newFilters.sport).forEach(
      sportName => (newFilters.sport[sportName] = true)
    )

    setFilterSettings(newFilters)
  }

  const deselectAll = () => {
    const newFilters = Object.assign({}, filters)
    Object.keys(newFilters.sport).forEach(
      sportName => (newFilters.sport[sportName] = false)
    )

    setFilterSettings(newFilters)
  }

  const allSelected = Object.keys(filters.sport).every(key =>
    key === "Uncategorized" &&
    !showUncategorized &&
    filters.sport["Uncategorized"] === false
      ? true
      : filters.sport[key]
  )
  const noneSelected = Object.keys(filters.sport).every(key =>
    key === "Uncategorized" &&
    !showUncategorized &&
    filters.sport["Uncategorized"] === true
      ? true
      : !filters.sport[key]
  )

  return (
    <Filter name="Sport">
      <Container>
        <div className="option-container">
          {Object.keys(defaultFilters.sport).map((sportName, i) =>
            sportName !== "Uncategorized" ? (
              <Checkbox
                key={i}
                id={sportName}
                name="sport"
                checked={filters.sport[sportName]}
                onChange={changeSportFilter}
              >
                {sportName}
              </Checkbox>
            ) : null
          )}
          {showUncategorized && (
            <Checkbox
              id="Uncategorized"
              name="sport"
              checked={filters.sport["Uncategorized"]}
              onChange={changeSportFilter}
            >
              Uncategorized
            </Checkbox>
          )}
        </div>
        <div className="action-container">
          <button
            className={cn("button", "select-button", { disabled: allSelected })}
            disabled={allSelected}
            onClick={selectAll}
          >
            Select All
          </button>
          <button
            className={cn("button", "deselect-button", {
              disabled: noneSelected,
            })}
            disabled={noneSelected}
            onClick={deselectAll}
          >
            Deselect All
          </button>
        </div>
      </Container>
    </Filter>
  )
}

export default SportFilter
