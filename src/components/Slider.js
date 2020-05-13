import React, { useState, useEffect } from "react"
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

const Slider = ({ scaledValue, bounds, onChange }) => {
  const [sliderMin, setSliderMin] = useState(0)
  const [sliderMax, setSliderMax] = useState(100)
  const step = 100 / (bounds[1] - bounds[0])

  // Convert scaled values to percentage values
  const scaledToPercent = value => [
    (value[0] - bounds[0]) * step,
    (value[1] - bounds[0]) * step,
  ]

  // Convert percentage values to scaled values
  const percentToScaled = value => [
    Math.round(value[0] / step + bounds[0]),
    Math.round(value[1] / step + bounds[0]),
  ]

  // Update state and call onChange with scaled values
  const onSliderChange = value => {
    setSliderMin(value[0])
    setSliderMax(value[1])

    const scaled = percentToScaled([value[0], value[1]])

    onChange(scaled)
  }

  // If scaledValue doesn't matched controlled state, convert scaledValue to percent and update state
  useEffect(() => {
    const scaled = percentToScaled([sliderMin, sliderMax])
    const scaledMin = scaled[0]
    const scaledMax = scaled[1]

    if (scaledMin !== scaledValue[0] || scaledMax !== scaledValue[1]) {
      const percentValue = scaledToPercent(scaledValue)

      setSliderMin(percentValue[0])
      setSliderMax(percentValue[1])
    }
  }, [scaledValue, bounds, sliderMin, sliderMax, step])

  return (
    <Container>
      <Range value={[sliderMin, sliderMax]} onChange={onSliderChange} />
    </Container>
  )
}

export default Slider
