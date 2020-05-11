import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"

const Container = styled.div``

const DatabaseTable = ({ data, rowsPerPage }) => {
  const [multiPage, setMultiPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [pages, setPages] = useState([])

  const [sortBy, setSortBy] = useState("id")
  const [sortDirection, setSortDirection] = useState("ascending")

  useEffect(() => {
    if (data.items.length > rowsPerPage) {
      setMultiPage(true)
    }
  }, [setMultiPage, data, rowsPerPage])

  useEffect(() => {
    const newPages = []
    let newPage = []

    data.items.forEach((item, i) => {
      const row = data.headers.map(header =>
        !item[header.id] || item[header.id] === "" ? "-" : item[header.id]
      )
      newPage.push(row)

      if (newPage.length === rowsPerPage || i === data.items.length - 1) {
        newPages.push(newPage)
        newPage = []
      }
    })

    setPages(newPages)
  }, [data.items, data.headers, rowsPerPage])

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
