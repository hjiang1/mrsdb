import React from "react"
import styled from "styled-components"

import Filter from "./Filter"
import Slider from "../Slider"
import Checkbox from "../Checkbox"

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

const RangeFilter = ({
  accessor,
  name,
  description,
  unit,
  filters,
  defaultFilters,
  setFilterSettings,
  showUncategorized,
}) => {
  // Update range filter
  const changeRange = range => {
    const newFilters = Object.assign({}, filters)

    if (unit === "in") {
      newFilters[accessor].min = inToFt(range[0])
      newFilters[accessor].max = inToFt(range[1])
    } else {
      newFilters[accessor].min = range[0]
      newFilters[accessor].max = range[1]
    }

    setFilterSettings(newFilters)
  }

  // Toggle uncategorized feature
  const toggleUncategorized = () => {
    const newFilters = Object.assign({}, filters)
    newFilters[accessor]["Uncategorized"] = !filters[accessor]["Uncategorized"]

    setFilterSettings(newFilters)
  }

  const convertUnits = val => {
    if (unit === "in") {
      return ftToIn(val)
    } else {
      return val
    }
  }

  return (
    <Filter name={name} description={description}>
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">{filters[accessor].min}</div>
          <Slider
            value={[
              convertUnits(filters[accessor].min),
              convertUnits(filters[accessor].max),
            ]}
            bounds={[
              convertUnits(defaultFilters[accessor].min),
              convertUnits(defaultFilters[accessor].max),
            ]}
            onChange={changeRange}
          />
          <div className="range-indicator end">{filters[accessor].max}</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name={accessor}
              checked={filters[accessor]["Uncategorized"]}
              onChange={toggleUncategorized}
            >
              Unspecified
            </Checkbox>
          </div>
        )}
      </Container>
    </Filter>
  )
}

export default RangeFilter
