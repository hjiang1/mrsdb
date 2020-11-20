import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import { useTable, useSortBy, usePagination } from "react-table"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"
import { sortRows } from "./functions"

const Container = styled.div`
  width: 100%;

  .display-indicator {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #1b262c;
  }

  .database-table {
    margin: 0;

    display: block;
    width: 100%;
    overflow-x: scroll;
    border: 1px solid var(--primaryColor);
  }
`

const DatabaseTable = ({ data: { data, columns }, rowsPerPage }) => {
  // const [sortedItems, setSortedItems] = useState([])

  // const [multiPage, setMultiPage] = useState(false)
  // const [pageNumber, setPageNumber] = useState(0)
  // const [pages, setPages] = useState([])

  // const [sortBy, setSortBy] = useState("id")
  // const [sortDirection, setSortDirection] = useState("ascending")

  // // Reset pagination if input data changes
  // useEffect(() => {
  //   setPageNumber(0)
  // }, [data.items])

  // // Sort rows
  // useEffect(() => {
  //   const newItems = [...data.items]
  //   const sortType = data.headers.find(header => header.id === sortBy).sortType

  //   newItems.sort(sortRows(sortBy, sortDirection, data.headers, sortType))

  //   setSortedItems(newItems)
  // }, [data.items, data.headers, sortBy, sortDirection])

  // // Determine the number of pages required
  // useEffect(() => {
  //   if (sortedItems.length > rowsPerPage) {
  //     setMultiPage(true)
  //   }
  // }, [setMultiPage, sortedItems, rowsPerPage])

  // // Determine the content of each page
  // useEffect(() => {
  //   const newPages = []
  //   let newPage = []

  //   sortedItems.forEach((item, i) => {
  //     const row = data.headers.map(header =>
  //       !item[header.id] || item[header.id] === "" ? "-" : item[header.id]
  //     )
  //     newPage.push(row)

  //     if (newPage.length === rowsPerPage || i === sortedItems.length - 1) {
  //       newPages.push(newPage)
  //       newPage = []
  //     }
  //   })

  //   setPages(newPages)
  // }, [sortedItems, data.headers, rowsPerPage])

  // const renderTableRows = (rows = []) =>
  //   rows.map((row, i) => (
  //     <DatabaseRow key={`row${i}`} cells={row} alternate={i % 2 === 1} />
  //   ))

  // const getDisplayIndicator = () => {
  //   const itemsOnPage = pages.length > 0 ? pages[pageNumber].length : 0
  //   const totalItems = pages.reduce((total, page) => total + page.length, 0)
  //   const firstOnPage = rowsPerPage * pageNumber + 1
  //   const lastOnPage = itemsOnPage + rowsPerPage * pageNumber

  //   if (firstOnPage === lastOnPage) {
  //     return `Showing ${firstOnPage} of ${totalItems}`
  //   } else {
  //     return `Showing ${firstOnPage}-${lastOnPage} of ${totalItems}`
  //   }
  // }

  // const currentPageRows = pages[pageNumber]

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  )

  return (
    <Container>
      <table className="database-table" {...getTableProps()}>
        <DatabaseHeader headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return <DatabaseRow key={i} row={row} alternate={i % 2 === 1} />
          })}
        </tbody>
      </table>
      <Pagination
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </Container>
  )
}

export default DatabaseTable
