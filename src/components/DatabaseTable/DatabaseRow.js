import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import cn from "classnames"

const Container = styled.tr`
  background-color: white;
  color: #1b262c;
  cursor: pointer;
  font-size: 14px;

  .table-cell {
    padding: 0.5rem;
    border: none;
    width: max-content;
    white-space: nowrap;
    border-right: 1px solid var(--primaryColor);

    :last-of-type {
      border-right: none;
    }

    &.alternate {
      background-color: #f5fbff;
    }

    &.first-cell {
      text-align: center;
    }
  }

  :hover {
    .table-cell {
      background-color: #d9f0ff;
    }
  }

  :focus {
    /* background-color: #d9f0ff;
    outline-color: var(--primaryColor); */
    outline: none;
  }
`

const DatabaseRow = ({ row, alternate }) => {
  return (
    <Container {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <td
            className={cn("table-cell", { alternate })}
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </td>
        )
      })}
    </Container>
  )
}

DatabaseRow.propTypes = {
  row: PropTypes.object.isRequired,
}

export default DatabaseRow
