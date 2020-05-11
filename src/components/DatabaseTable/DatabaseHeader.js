import React from "react"
import styled from "styled-components"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"

const Container = styled.thead`
  background-color: #bbe1fa;
  color: #1b262c;

  .header-cell {
    cursor: pointer;
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: ease;

    :hover {
      background-color: #3282b8;
      color: white;
    }

    .header-cell-content {
      display: flex;
      align-items: center;

      .sort-icon {
        margin-left: 0.5rem;
      }

      .placeholder-icon {
        visibility: hidden;
        margin-left: 0.5rem;
      }
    }
  }
`

const DatabaseHeader = ({ headers, sortBy, sortDirection, setSortBy, setSortDirection }) => {
  const handleCellClick = id => {
    console.log( id, sortBy)
    if (id === sortBy) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')
    } else {
      setSortBy(id)
      setSortDirection('descending')
    }
  }

  return (
    <Container>
      <tr>
        {headers.map((header, i) => (
          <th key={`header${i}`} className="header-cell" onClick={() => handleCellClick(header.id)}>
            <div className="header-cell-content">
              {header.text}
              {sortBy !== header.id && <FaCaretDown className="placeholder-icon" />}
              {sortBy === header.id && sortDirection === "descending" && (
                <FaCaretDown className="sort-icon" />
              )}
              {sortBy === header.id && sortDirection === "ascending" && (
                <FaCaretUp className="sort-icon" />
              )}
            </div>
          </th>
        ))}
      </tr>
    </Container>
  )
}

export default DatabaseHeader
