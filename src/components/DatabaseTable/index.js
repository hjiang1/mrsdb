import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"
import { sortRows } from "./functions"

const Container = styled.div`
  .row {
    display: grid;
    grid-template-columns: 0.4fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .display-indicator {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #1b262c;
  }
`

const DatabaseTable = ({ data, rowsPerPage }) => {
  const [sortedItems, setSortedItems] = useState([])

  const [multiPage, setMultiPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [pages, setPages] = useState([])

  const [sortBy, setSortBy] = useState("id")
  const [sortDirection, setSortDirection] = useState("ascending")

  // Reset pagination if input data changes
  useEffect(() => {
    setPageNumber(0)
  }, [data.items])

  // Sort rows
  useEffect(() => {
    const newItems = [...data.items]
    const sortType = data.headers.find(header => header.id === sortBy).sortType

    newItems.sort(sortRows(sortBy, sortDirection, data.headers, sortType))

    setSortedItems(newItems)
  }, [data.items, data.headers, sortBy, sortDirection])

  // Determine the number of pages required
  useEffect(() => {
    if (sortedItems.length > rowsPerPage) {
      setMultiPage(true)
    }
  }, [setMultiPage, sortedItems, rowsPerPage])

  // Determine the content of each page
  useEffect(() => {
    const newPages = []
    let newPage = []

    sortedItems.forEach((item, i) => {
      const row = data.headers.map(header =>
        !item[header.id] || item[header.id] === "" ? "-" : item[header.id]
      )
      newPage.push(row)

      if (newPage.length === rowsPerPage || i === sortedItems.length - 1) {
        newPages.push(newPage)
        newPage = []
      }
    })

    setPages(newPages)
  }, [sortedItems, data.headers, rowsPerPage])

  const renderTableRows = (rows = []) =>
    rows.map((row, i) => (
      <DatabaseRow key={`row${i}`} cells={row} alternate={i % 2 === 1} />
    ))

  const getDisplayIndicator = () => {
    const itemsOnPage = pages[pageNumber].length
    const totalItems = pages.reduce((total, page) => total + page.length, 0)
    const firstOnPage = rowsPerPage * pageNumber + 1
    const lastOnPage = itemsOnPage + rowsPerPage * pageNumber

    if (firstOnPage === lastOnPage) {
      return `Showing ${firstOnPage} of ${totalItems}`
    } else {
      return `Showing ${firstOnPage}-${lastOnPage} of ${totalItems}`
    }
  }

  const currentPageRows = pages[pageNumber]

  return (
    <Container>
      <div className="display-indicator">{getDisplayIndicator()}</div>
      <table>
        {useMemo(
          () => (
            <DatabaseHeader
              headers={data.headers}
              sortBy={sortBy}
              sortDirection={sortDirection}
              setSortBy={setSortBy}
              setSortDirection={setSortDirection}
            />
          ),
          [data.headers, sortBy, sortDirection]
        )}
        <tbody>
          {useMemo(() => renderTableRows(currentPageRows), [currentPageRows])}
        </tbody>
      </table>
      {multiPage && (
        <Pagination
          numPages={pages.length}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </Container>
  )
}

export default DatabaseTable
