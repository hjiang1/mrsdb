import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"

const Container = styled.div``

const DatabaseTable = ({ data, rowsPerPage }) => {
  const [sortedItems, setSortedItems] = useState([])

  const [multiPage, setMultiPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [pages, setPages] = useState([])

  const [sortBy, setSortBy] = useState("id")
  const [sortDirection, setSortDirection] = useState("ascending")

  const recursiveHeaderSort = (a, b, headerIndex) => {
    const currentId = data.headers[headerIndex].id

    // If two entries at equal at the last header, then the two are identical
    if (headerIndex === data.headers.length - 1) {
      return 1
    }
    // If current header is equal or the sortBy header, check next one
    else if (a[currentId] === b[currentId] || currentId === sortBy) {
      return recursiveHeaderSort(a, b, headerIndex + 1)
    }
    // Else sort by sortBy value
    else {
      return (a[currentId] > b[currentId]) ? 1 : -1
    }
  }

  const sortAB = () => (a, b) => {
    let sorted;

    // If sortBy value is equal, subsort based on other headers
    if (a[sortBy] === b[sortBy]) {
      sorted = recursiveHeaderSort(a, b, 0)
    }
    // Else sort by sortBy value
    else {
      sorted = (a[sortBy] > b[sortBy]) ? 1 : -1
    }

    return (sortDirection === 'ascending') ? sorted : -sorted
  }

  useEffect(() => {
    const newItems = [...data.items]

    newItems.sort(sortAB())

    setSortedItems(newItems)
  }, [data.items, sortBy, sortDirection])

  useEffect(() => {
    if (sortedItems.length > rowsPerPage) {
      setMultiPage(true)
    }
  }, [setMultiPage, sortedItems, rowsPerPage])

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

  const getTableRows = (rows = []) =>
    rows.map((row, i) => <DatabaseRow key={`row${i}`} cells={row} />)

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
          {useMemo(() => getTableRows(currentPageRows), [currentPageRows])}
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
