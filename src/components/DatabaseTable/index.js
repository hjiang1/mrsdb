import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"
import { sortAB, filterComplete } from "./functions"

const Container = styled.div``

const DatabaseTable = ({ data, rowsPerPage }) => {
  const [filters, setFilters] = useState({
    complete: {
      active: false,
      filter: filterComplete
    }
  })
  const [filteredItems, setFilteredItems] = useState([])
  const [sortedItems, setSortedItems] = useState([])

  const [multiPage, setMultiPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [pages, setPages] = useState([])

  const [sortBy, setSortBy] = useState("id")
  const [sortDirection, setSortDirection] = useState("ascending")

  // Filter rows
  useEffect(() => {
    let newFilteredItems = [...data.items]

    Object.keys(filters).forEach(filterName => {
      if (filters[filterName].active) {
        newFilteredItems = filters[filterName].filter(newFilteredItems)
      }
    })

    setFilteredItems(newFilteredItems)
  }, [data.items, filters])

  // Sort rows
  useEffect(() => {
    const newItems = [...filteredItems]

    newItems.sort(sortAB(sortBy, sortDirection, data.headers))

    setSortedItems(newItems)
  }, [filteredItems, data.headers, sortBy, sortDirection])

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

  const decrementPage = () => {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  const incrementPage = () => {
    if (pageNumber !== pages.length - 1) {
      setPageNumber(pageNumber + 1)
    }
  }

  const currentPageRows = pages[pageNumber]

  return (
    <Container>
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
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          setPageNumber={setPageNumber}
        />
      )}
    </Container>
  )
}

export default DatabaseTable
