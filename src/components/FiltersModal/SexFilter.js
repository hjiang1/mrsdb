import React from "react"
import styled from "styled-components"

import Checkbox from "../Checkbox"
import Filter from "./Filter"
import { defaultFilters } from "./filters"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
`

const SexFilter = ({ filters, onChange, showUncategorized }) => {
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
              onChange={onChange}
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
            onChange={onChange}
          >
            Uncategorized
          </Checkbox>
        )}
      </Container>
    </Filter>
  )
}

export default SexFilter
