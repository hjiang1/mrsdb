import React from "react"
import styled from "styled-components"
import cn from "classnames"

const Container = styled.div`
  --toggleButtonHeight: 1.5rem;
  --toggleButtonWidth: 3rem;

  width: var(--toggleButtonWidth);
  height: var(--toggleButtonHeight);
  border-radius: calc(var(--toggleButtonHeight) / 2);

  box-shadow: 0 0 0 2px darkgray inset;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .indicator {
    height: var(--toggleButtonHeight);
    width: var(--toggleButtonWidth);
    border-radius: calc(var(--toggleButtonHeight) / 2);

    background-color: var(--primaryColor);
    display: flex;
    justify-content: flex-end;

    margin-left: calc(
      -1 * var(--toggleButtonWidth) + var(--toggleButtonHeight)
    );
    transition: margin 0.2s ease;
  }

  .indicator-circle {
    height: var(--toggleButtonHeight);
    width: var(--toggleButtonHeight);
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 0 2px darkgray inset;
    transition: margin 0.2s ease;
  }

  &.on .indicator {
    margin: 0;
  }
`

const ToggleButton = ({ value, onClick }) => {
  return (
    <Container className={cn({ on: value })} onClick={onClick}>
      <div className="indicator">
        <div className="indicator-circle" />
      </div>
    </Container>
  )
}

export default ToggleButton
