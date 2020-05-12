import React from "react"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa"
import cn from "classnames"

const Container = styled.div`
  margin: 1rem 0;

  .default-checkbox {
    display: none;
  }

  .checkbox-label {
    display: flex;
    align-items: center;

    .custom-checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      height: 1.5rem;
      width: 1.5rem;
      border-radius: 5px;
      border: 2px solid darkgray;
      margin-right: 0.5rem;

      &.checked {
        background-color: var(--primaryColor);
      }
    }

    .label-content {
      cursor: pointer;
    }
  }
`

const Checkbox = ({ checked, onChange, id, children }) => {
  return (
    <Container>
      <input
        className="default-checkbox"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(id)}
      />
      <label className="checkbox-label" htmlFor={id}>
        <div className={cn("custom-checkbox", { checked })}>
          <FaCheck size="1rem" color="white" />
        </div>
        <div className="label-content">{children}</div>
      </label>
    </Container>
  )
}

export default Checkbox
