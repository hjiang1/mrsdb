import React from "react"
import styled from "styled-components"

import Checkbox from "../Checkbox"
import Filter from "./Filter"
import { defaultFilters } from "./filters"

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  grid-row-gap: 1rem;
  grid-column-gap: 2rem;
`

const ControlFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  const changeControlFilter = value => {
    const newFilters = Object.assign({}, filters)
    newFilters.control_concussed[value] = !newFilters.control_concussed[value]

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Control">
      <Container>
        {Object.keys(defaultFilters.control_concussed).map((value, i) =>
          value !== "Uncategorized" ? (
            <Checkbox
              key={i}
              id={value}
              name="control"
              checked={filters.control_concussed[value]}
              onChange={changeControlFilter}
            >
              {value}
            </Checkbox>
          ) : null
        )}
        {showUncategorized && (
          <Checkbox
            id="Uncategorized"
            name="control"
            checked={filters.control_concussed["Uncategorized"]}
            onChange={changeControlFilter}
          >
            Uncategorized
          </Checkbox>
        )}
      </Container>
    </Filter>
  )
}

export default ControlFilter
