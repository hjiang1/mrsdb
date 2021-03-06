import React from "react"
import styled from "styled-components"

import Filter from "./Filter"
import Slider from "../Slider"
import Checkbox from "../Checkbox"

import { defaultFilters } from "./filters"

const Container = styled.div`
  display: flex;
  align-items: flex-end;

  .slider-container {
    display: flex;
    align-items: center;
    height: 1.5rem;

    .range-indicator {
      display: flex;
      align-items: center;
      width: 4rem;
      margin: 1.5rem;

      &.start {
        justify-content: flex-end;
      }

      &.end {
        justify-content: flex-start;
      }
    }
  }

  .checkbox-container {
    margin-left: 2rem;
  }
`

const AgeFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  // Update age range filter
  const changeAgeRange = range => {
    const newFilters = Object.assign({}, filters)
    newFilters.age.min = range[0]
    newFilters.age.max = range[1]

    setFilterSettings(newFilters)
  }

  // Toggle uncategorized feature
  const toggleUncategorized = () => {
    const newFilters = Object.assign({}, filters)
    newFilters.age["Uncategorized"] = !filters.age["Uncategorized"]

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Age" description="Participant age">
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">{filters.age.min}</div>
          <Slider
            scaledValue={[filters.age.min, filters.age.max]}
            bounds={[defaultFilters.age.min, defaultFilters.age.max]}
            onChange={changeAgeRange}
          />
          <div className="range-indicator end">{filters.age.max}</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name="age"
              checked={filters.age["Uncategorized"]}
              onChange={toggleUncategorized}
            >
              Uncategorized
            </Checkbox>
          </div>
        )}
      </Container>
    </Filter>
  )
}

export default AgeFilter
