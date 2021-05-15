import React from "react"
import styled from "styled-components"
import { Range } from "rc-slider"

import "rc-slider/assets/index.css"

const Container = styled.div`
  width: 20rem;

  .rc-slider {
    display: flex;
    align-items: center;
  }

  .rc-slider-rail {
    height: 0.5rem;
    background-color: darkgray;
  }

  .rc-slider-track {
    height: 0.5rem;
    background-color: var(--primaryColor);
  }

  .rc-slider-handle {
    height: 1.5rem;
    width: 1.5rem;
    margin: 0;
    border: 4px solid var(--primaryColor);
    transition: box-shadow 0.1s ease;

    &.rc-slider-handle-dragging {
      border: 4px solid var(--primaryColor);
      box-shadow: 0 0 0 2px var(--primaryColor);
    }
  }
`

const Slider = ({ value, bounds, onChange }) => {
  return (
    <Container>
      <Range
        min={bounds[0]}
        max={bounds[1]}
        value={[value[0], value[1]]}
        onChange={onChange}
      />
    </Container>
  )
}

export default Slider
