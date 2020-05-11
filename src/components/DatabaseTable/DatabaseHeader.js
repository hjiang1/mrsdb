import React from "react"
import styled from "styled-components"

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
  }
`

const DatabaseHeader = ({ headers }) => {
  return (
    <Container>
      <tr>
        {headers.map((header, i) => (
          <th key={`header${i}`} className="header-cell">
            {header.text}
          </th>
        ))}
      </tr>
    </Container>
  )
}

export default DatabaseHeader
