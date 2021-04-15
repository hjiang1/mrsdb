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
      font-size: 14px;
    }
  }

  .search-bar-container {
    display: grid;
    grid-template-columns: 1fr min-content min-content;
    grid-column-gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .database-scroll-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--primaryColor);
    font-weight: bold;

    .scroll-button {
      border: 1px solid var(--primaryColor);
      font-weight: bold;
      font-size: 14px;
      padding: 0.15rem 0.6rem;
      margin-left: 0.5rem;

      background-color: white;
      transition: background-color 0.1s ease, color 0.1s ease;

      &.clinical {
        color: #8e2a2a;

        :hover {
          color: white;
          background-color: #8e2a2a;
        }
      }

      &.metadata {
        color: #443b3b;
        :hover {
          color: white;
          background-color: #443b3b;
        }
      }

      &.mrs {
        color: var(--primaryColor);
        :hover {
          color: white;
          background-color: var(--primaryColor);
        }
      }
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

const DatabaseTable = ({
  data: { data, columns },
  defaultPageSize,
  setFilterModalOpen,
}) => {
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
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        sortBy: [{ id: "id", desc: false }],
      },
      disableSortRemove: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const jumpTo = className => {
    const jumpToElement = document.getElementsByClassName(
      `header-cell ${className}`
    )[0]
    const table = document.getElementsByClassName("database-table")[0]

    table.scrollLeft =
      jumpToElement.offsetLeft === 0
        ? jumpToElement.offsetLeft
        : jumpToElement.offsetLeft + 1
  }

  return (
    <Container>
      <div className="search-bar-container">
        <div className="database-scroll-button-container">
          Jump to:
          <button
            className="scroll-button clinical"
            onClick={() => jumpTo("clinical")}
          >
            Clinical Data
          </button>
          <button
            className="scroll-button metadata"
            onClick={() => jumpTo("metadata")}
          >
            Scan Metadata
          </button>
          <button className="scroll-button mrs" onClick={() => jumpTo("mrs")}>
            MRS Data
          </button>
        </div>
        <button
          className="button white filter-button"
          onClick={setFilterModalOpen}
        >
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
        page={page}
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
