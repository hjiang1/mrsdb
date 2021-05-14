import React, { useMemo, useState, useEffect } from "react"
import styled from "styled-components"
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table"
import { FaFilter } from "react-icons/fa"
import cn from "classnames"

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

        &.active-type,
        :hover {
          color: white;
          background-color: #8e2a2a;
        }
      }

      &.metadata {
        color: #443b3b;

        &.active-type,
        :hover {
          color: white;
          background-color: #443b3b;
        }
      }

      &.mrs {
        color: var(--primaryColor);

        &.active-type,
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
  data,
  metadata,
  defaultPageSize,
  setFilterModalOpen,
}) => {
  const [dataTypes, setDataTypes] = useState([])

  useEffect(() => {
    if (metadata) {
      setDataTypes([...new Set(metadata.types)])
    }
  }, [metadata])

  const columns = useMemo(
    () =>
      metadata.accessors.map((a, i) => ({
        accessor: a,
        Header: metadata.headers[i],
        type: metadata.types[i],
      })),
    [metadata]
  )

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

  const [activeType, setActiveType] = useState("clinical")

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

  const onTableScroll = e => {
    if (dataTypes.length > 1) {
      const scrollPos = e.target.scrollLeft
      const numTypes = dataTypes.length

      const elementList = dataTypes.map(
        type =>
          document.getElementsByClassName(`header-cell ${type}`)[0].offsetLeft
      )

      dataTypes.some((type, i) => {
        if (i == numTypes - 1 && activeType !== dataTypes[numTypes - 1]) {
          setActiveType(dataTypes[numTypes - 1])

          return true
        } else if (
          scrollPos >= elementList[i] &&
          scrollPos < elementList[i + 1] &&
          activeType !== elementList[i]
        ) {
          setActiveType(type)

          return true
        } else {
          return false
        }
      })
    }
  }

  return (
    <Container>
      <div className="search-bar-container">
        <div className="database-scroll-button-container">
          Jump to:
          {metadata && metadata.types.includes("clinical") && (
            <button
              className={cn("scroll-button clinical", {
                "active-type": activeType === "clinical",
              })}
              onClick={() => jumpTo("clinical")}
            >
              Clinical Data
            </button>
          )}
          {metadata && metadata.types.includes("metadata") && (
            <button
              className={cn("scroll-button metadata", {
                "active-type": activeType === "metadata",
              })}
              onClick={() => jumpTo("metadata")}
            >
              Scan Metadata
            </button>
          )}
          {metadata && metadata.types.includes("mrs") && (
            <button
              className={cn("scroll-button mrs", {
                "active-type": activeType === "mrs",
              })}
              onClick={() => jumpTo("mrs")}
            >
              MRS Data
            </button>
          )}
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
      <table
        className="database-table"
        {...getTableProps()}
        onScroll={onTableScroll}
      >
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
