import React from "react"
import styled from "styled-components"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import cn from "classnames"

const Container = styled.thead`
  background-color: var(--primaryColor);
  color: white;

  .header-cell {
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
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            <th
              className="header-cell"
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
    // <Container className="noselect">
    //   <tr className="row">
    //     {headers.map((header, i) => (
    //       <th
    //         key={`header${i}`}
    //         className={cn("header-cell", { sortBy: sortBy === header.id })}
    //         onClick={() => handleCellClick(header.id)}
    //       >
    //         <div className="header-cell-content">
    //           {header.text}
    //           {sortBy !== header.id && (
    //             <FaCaretDown className="placeholder-icon" />
    //           )}
    //           {sortBy === header.id && sortDirection === "descending" && (
    //             <FaCaretDown className="sort-icon" />
    //           )}
    //           {sortBy === header.id && sortDirection === "ascending" && (
    //             <FaCaretUp className="sort-icon" />
    //           )}
    //         </div>
    //       </th>
    //     ))}
    //   </tr>
    // </Container>
  )
}

export default DatabaseHeader
