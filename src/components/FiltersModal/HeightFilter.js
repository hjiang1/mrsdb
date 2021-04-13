import React from "react"
import styled from "styled-components"

import Filter from "./Filter"
import Slider from "../Slider"
import Checkbox from "../Checkbox"

import { defaultFilters } from "./filters"
import { ftToIn, inToFt } from "../../utils/functions"

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

const HeightFilter = ({ filters, setFilterSettings, showUncategorized }) => {
  // Update height range filter
  const changeHeightRange = range => {
    const newFilters = Object.assign({}, filters)
    newFilters.height.min = inToFt(range[0])
    newFilters.height.max = inToFt(range[1])

    setFilterSettings(newFilters)
  }

  // Toggle uncategorized feature
  const toggleUncategorized = () => {
    const newFilters = Object.assign({}, filters)
    newFilters.height["Uncategorized"] = !filters.height["Uncategorized"]

    setFilterSettings(newFilters)
  }

  return (
    <Filter name="Height" description="Participant height">
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">{`${filters.height.min}`}</div>
          <Slider
            scaledValue={[
              ftToIn(filters.height.min),
              ftToIn(filters.height.max),
            ]}
            bounds={[
              ftToIn(defaultFilters.height.min),
              ftToIn(defaultFilters.height.max),
            ]}
            onChange={changeHeightRange}
          />
          <div className="range-indicator end">{`${filters.height.max}`}</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name="height"
              checked={filters.height["Uncategorized"]}
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

export default HeightFilter
