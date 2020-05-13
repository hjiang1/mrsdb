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

const WeightFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  // Update age range filter
  const changeWeightRange = range => {
    const newFilters = Object.assign({}, filters)
    newFilters.weight.min = range[0]
    newFilters.weight.max = range[1]

    setFilterSettings(newFilters)
  }

  // Toggle uncategorized feature
  const toggleUncategorized = () => {
    const newFilters = Object.assign({}, filters)
    newFilters.weight["Uncategorized"] = !filters.weight["Uncategorized"]

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Weight">
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">{`${filters.weight.min} lbs`}</div>
          <Slider
            scaledValue={[filters.weight.min, filters.weight.max]}
            bounds={[defaultFilters.weight.min, defaultFilters.weight.max]}
            onChange={changeWeightRange}
          />
          <div className="range-indicator end">{`${filters.weight.max} lbs`}</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name="weight"
              checked={filters.weight["Uncategorized"]}
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

export default WeightFilter
