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

const HeightFilter = ({ showUncategorized }) => {
  return (
    <Filter name="Height">
      <Container>
        <div className="slider-container">
          <div className="range-indicator start">5'0"</div>
          <Slider />
          <div className="range-indicator end">6'11"</div>
        </div>
        {showUncategorized && (
          <div className="checkbox-container">
            <Checkbox
              id="Uncategorized"
              name="height"
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

export default HeightFilter
