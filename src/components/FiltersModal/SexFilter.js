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

const SexFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  const changeSexFilter = sexId => {
    const newFilters = Object.assign({}, filters)
    newFilters.sex[sexId] = !newFilters.sex[sexId]

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Sex">
      <Container>
        {Object.keys(defaultFilters.sex).map((sexName, i) =>
          sexName !== "Uncategorized" ? (
            <Checkbox
              key={i}
              id={sexName}
              name="sex"
              checked={filters.sex[sexName]}
              onChange={changeSexFilter}
            >
              {sexName}
            </Checkbox>
          ) : null
        )}
        {showUncategorized && (
          <Checkbox
            id="Uncategorized"
            name="sex"
            checked={filters.sex["Uncategorized"]}
            onChange={changeSexFilter}
          >
            Uncategorized
          </Checkbox>
        )}
      </Container>
    </Filter>
  )
}

export default SexFilter
