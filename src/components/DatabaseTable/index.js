import React, { useMemo } from "react"
import styled from "styled-components"

import data from "./data"
import DatabaseRow from "./DatabaseRow"

const Container = styled.table`
  /* border: 1px solid var(--primaryColor); */
  /* box-shadow: 5px 5px lightgray; */

  .table-header {
    background-color: #bbe1fa;
  }
`

const getTableHeaders = headers =>
  headers.map((header, i) => <th key={`header${i}`}>{header.text}</th>)

const getTableRows = rows =>
  rows.map((row, i) => <DatabaseRow key={`row${i}`} cells={row} />)

const DatabaseTable = props => {
  const rows = data.items.map(item =>
    data.headers.map(header =>
      !item[header.id] || item[header.id] === "" ? "-" : item[header.id]
    )
  )

  return (
    <Container>
      <thead className="table-header">
        <tr>{useMemo(() => getTableHeaders(data.headers), [])}</tr>
      </thead>
      <tbody>{useMemo(() => getTableRows(rows), [rows])}</tbody>
    </Container>
  )
}

export default DatabaseTable
