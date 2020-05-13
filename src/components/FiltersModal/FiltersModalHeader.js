import React from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 1rem 2rem;
  margin-bottom: 2rem;

  .filter-modal-title {
    margin: 0;
    color: var(--primaryColor);
  }

  .close-button {
    transition: transform 0.1s ease;

    svg {
      color: var(--primaryColor);
    }

    :hover {
      transform: scale(1.1);
    }
  }
`

const FiltersModalHeader = ({ setOpen }) => {
  return (
    <Container>
      <h1 className="filter-modal-title">Filters</h1>
      <button className="close-button" onClick={() => setOpen(false)}>
        <FaTimes size="1.5rem" />
      </button>
    </Container>
  )
}

export default FiltersModalHeader
