import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 20% auto;
  /* justify-content: space-between;
  align-items: 'center'; */
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 2rem;
  width: 100%;

  margin-top: -1px;
  margin-bottom: -1px;

  color: #1b262c;

  .filter-name {
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .filter-description {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 2rem;
  }

  .filter-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
  }
`

const Filter = ({ name, description, children }) => {
  return (
    <Container>
      <div className="filter-name">{name}</div>
      <div className="filter-description">{description}</div>
      <div className="filter-controls">{children}</div>
    </Container>
  )
}

export default Filter
