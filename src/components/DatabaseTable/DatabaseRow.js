import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import cn from "classnames"

const Container = styled.tr`
  background-color: white;
  border-top: 1px solid #3282b8;
  color: #1b262c;

  .table-cell {
    border: none;

    &.alternate {
      background-color: #f5fbff;
    }

    &.first-cell {
      text-align: center;
    }
  }
`

const DatabaseRow = ({ cells, alternate }) => {
  return (
    <Container className="row">
      {cells.map((cell, i) => (
        <td
          key={i}
          className={cn("table-cell", { alternate, "first-cell": i === 0 })}
        >
          {cell}
        </td>
      ))}
    </Container>
  )
}

DatabaseRow.propTypes = {
  cells: PropTypes.array.isRequired,
}

export default DatabaseRow
