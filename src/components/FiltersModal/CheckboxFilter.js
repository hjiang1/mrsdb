import React from "react"
import styled from "styled-components"
import cn from "classnames"

import Checkbox from "../Checkbox"
import Filter from "./Filter"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .option-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
    grid-auto-flow: row;
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

const CheckboxFilter = ({
  accessor,
  name,
  description,
  filters,
  defaultFilters,
  setFilterSettings,
  showUncategorized,
}) => {
  const changeFilter = checkboxId => {
    const newFilters = Object.assign({}, filters)
    newFilters[accessor][checkboxId] = !newFilters[accessor][checkboxId]

    setFilterSettings(newFilters)
  }

  const selectAll = () => {
    const newFilters = Object.assign({}, filters)
    Object.keys(newFilters[accessor]).forEach(
      checkboxId => (newFilters[accessor][checkboxId] = true)
    )

    setFilterSettings(newFilters)
  }

  const deselectAll = () => {
    const newFilters = Object.assign({}, filters)
    Object.keys(newFilters[accessor]).forEach(
      checkboxId => (newFilters[accessor][checkboxId] = false)
    )

    setFilterSettings(newFilters)
  }

  const allSelected = Object.keys(filters[accessor]).every(key =>
    key === "Uncategorized" &&
    !showUncategorized &&
    filters[accessor]["Uncategorized"] === false
      ? true
      : filters[accessor][key]
  )
  const noneSelected = Object.keys(filters[accessor]).every(key =>
    key === "Uncategorized" &&
    !showUncategorized &&
    filters[accessor]["Uncategorized"] === true
      ? true
      : !filters[accessor][key]
  )

  return (
    <Filter name={name} description={description}>
      <Container>
        <div className="option-container">
          {Object.keys(defaultFilters[accessor]).map((checkboxId, i) =>
            checkboxId !== "Uncategorized" ? (
              <Checkbox
                key={i}
                id={checkboxId}
                name={accessor}
                checked={filters[accessor][checkboxId]}
                onChange={changeFilter}
              >
                {checkboxId}
              </Checkbox>
            ) : null
          )}
          {showUncategorized && (
            <Checkbox
              id="Uncategorized"
              name={accessor}
              checked={filters[accessor]["Uncategorized"]}
              onChange={changeFilter}
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

export default CheckboxFilter
