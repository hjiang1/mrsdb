import React from "react"
import styled from "styled-components"

import Filter from "./Filter"
import Slider from "../Slider"
import Checkbox from "../Checkbox"

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
      width: 5rem;

      &.start {
        justify-content: center;
      }

      &.end {
        justify-content: center;
      }
    }
  }

  .checkbox-container {
    margin-left: 2rem;
  }
`

const WeightFilter = ({ showUncategorized }) => {
  return (
    <Filter name="Weight">
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">120lbs</div>
          <Slider />
          <div className="range-indicator end">300lbs</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name="weight"
              checked={true}
              onChange={() => {}}
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
