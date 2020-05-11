import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.tr`
  background-color: white;
  border-top: 1px solid var(--primaryColor);

  .table-cell {
    border: none;
  }
`

const DatabaseRow = ({ cells, last }) => {
  return (
    <Container>
      {cells.map((cell, i) => (
        <td key={i} className="table-cell">{cell}</td>
      ))}
    </Container>
  )
}

DatabaseRow.propTypes = {
  cells: PropTypes.array.isRequired,
}

export default DatabaseRow
