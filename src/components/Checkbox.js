import React from "react"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa"
import cn from "classnames"

const Container = styled.div`
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
      border-radius: 0;
      border: 1px solid darkgray;
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

const Checkbox = ({ checked, onChange, id, name, children }) => {
  return (
    <Container>
      <input
        className="default-checkbox"
        type="checkbox"
        id={`${name}-${id}`}
        name={name}
        checked={checked}
        onChange={() => onChange(id)}
      />
      <label className="checkbox-label" htmlFor={`${name}-${id}`}>
        <div className={cn("custom-checkbox", { checked })}>
          <FaCheck size="1rem" color="white" />
        </div>
        <div className="label-content">{children}</div>
      </label>
    </Container>
  )
}

export default Checkbox
