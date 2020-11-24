import React from "react"
import styled from "styled-components"
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table"
import { FaFilter } from "react-icons/fa"

import DatabaseHeader from "./DatabaseHeader"
import DatabaseRow from "./DatabaseRow"
import Pagination from "./Pagination"
import SearchBar from "./SearchBar"

const Container = styled.div`
  width: 100%;

  .display-indicator {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #1b262c;
  }

  .filter-button {
    .button-text {
      margin-left: 0.25rem;
    }
  }

  .search-bar-container {
    display: grid;
    grid-template-columns: 1fr min-content min-content;
    grid-gap: 0.5rem;
    align-items: center;
    justify-content: space-between;

    .row-counter {
      color: var(--primaryColor);
      margin-right: 1rem;
    }
  }

  .database-table {
    margin: 0;

    display: block;
    width: 100%;
    overflow-x: scroll;
    border: 1px solid var(--primaryColor);
  }
`

const DatabaseTable = ({ data: { data, columns }, defaultPageSize }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <Container>
      <div className="search-bar-container">
        <span className="row-counter">
          {`Displaying ${pageIndex * pageSize + 1}-${
            pageIndex * pageSize + page.length
          } of ${rows.length} Rows`}
        </span>
        <button className="button white filter-button">
          <FaFilter size="1rem" color="#0f4c75" />
          <div className="button-text">Filters</div>
        </button>
        <SearchBar
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

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
        totalRows={rows.length}
        defaultPageSize={defaultPageSize}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  )
}

export default DatabaseTable
