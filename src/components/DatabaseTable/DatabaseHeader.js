import React from "react"
import styled from "styled-components"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import cn from "classnames"

const Container = styled.thead`
  color: white;

  .header-cell {
    &.clinical {
      background-color: #8e2a2a;
    }

    &.metadata {
      background-color: #443b3b;
    }

    &.mrs {
      background-color: var(--primaryColor);
    }

    padding: 0.3rem 0.6rem;
    cursor: pointer;
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: ease;

    :last-of-type {
      border-right: none;
    }

    border-right: 1px solid white;

    &.sortBy {
      background-color: #256a99;
    }

    :hover {
      background-color: #3282b8;
    }

    .header-cell-content {
      display: flex;
      width: max-content;
      align-items: center;
      justify-content: center;

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

const DatabaseHeader = ({ headerGroups }) => {
  return (
    <Container>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              tabIndex="0"
              className={cn("header-cell", column.type)}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <div className="header-cell-content">
                {column.render("Header")}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <FaCaretDown className="sort-icon" />
                  ) : (
                    <FaCaretUp className="sort-icon" />
                  )
                ) : (
                  <FaCaretDown className="placeholder-icon" />
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </Container>
  )
}

export default DatabaseHeader
