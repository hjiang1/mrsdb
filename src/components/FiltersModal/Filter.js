import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid lightgray;
  border-bottom: 2px solid lightgray;
  padding: 2rem;
  width: 100%;

  margin-top: -1px;
  margin-bottom: -1px;

  font-weight: bold;
  color: #1b262c;
`

const Filter = ({ name, children }) => {
  return (
    <Container>
      {" "}
      <div>{name}</div>
      {children}
    </Container>
  )
}

export default Filter
