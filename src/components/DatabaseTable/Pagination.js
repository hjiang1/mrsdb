import React from "react"
import styled from "styled-components"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import cn from "classnames"
import ReactPaginate from "react-paginate"
import Select from "react-select"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(3, auto) 1fr;
  align-items: center;

  margin: 1rem 0;
  padding: 0.5rem 0;

  background-color: white;
  border: 1px solid var(--primaryColor);

  .hide-button {
    display: none;
  }

  .paginate-button {
    transition: transform 0.1s ease;

    &.back {
      grid-column-start: 2;
    }

    &.disabled {
      cursor: default;
    }

    &:not(.disabled) {
      :hover {
        transform: scale(1.1);
      }
    }
  }

  .page-container {
    display: flex;
    list-style-type: none;
    margin: 0;
    justify-content: center;

    li {
      margin: 0;
      width: 3rem;
    }
  }

  .page-button-container {
    width: 3rem;
  }

  .ellipsis,
  .page-button {
    color: var(--primaryColor);
    height: 2rem;
    width: 3rem;
    font-size: 1rem;
    cursor: pointer;

    /* margin: 0.5rem; */
    padding: 0.5rem 0.75rem;

    border: 1px solid rgba(0, 0, 0, 0);

    transition: border-color 0.2s ease, border-width 0.2s ease;

    &.selected {
      font-weight: bold;
      border: 1px solid var(--primaryColor);
    }

    :hover {
      font-weight: bold;
      border-color: var(--primaryColor);
    }
  }

  .rows-per-page-container {
    display: flex;
    align-items: center;
    justify-self: end;
    margin-right: 1rem;

    .rows-per-page-label {
      font-weight: bold;
      color: var(--primaryColor);
      margin-right: 0.5rem;
    }

    .react-select__control {
      border: 1px solid var(--primaryColor);
      border-radius: 0;
      cursor: pointer;
    }

    .react-select__value-container {
      width: 3rem;
    }

    .react-select__placeholder {
      color: var(--primaryColor);
    }

    .react-select__indicator-separator {
      background-color: var(--primaryColor);
    }

    .react-select__indicator {
      svg {
        color: var(--primaryColor);
      }
    }

    .react-select__menu {
      border-radius: 0;
    }

    .react-select__option {
      color: var(--primaryColor);
      cursor: pointer;
    }
  }
`

const Pagination = ({
  pageIndex,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  totalRows,
  defaultPageSize,
  pageSize,
  setPageSize,
}) => {
  const rowSelectOptions = [
    { value: defaultPageSize, label: defaultPageSize },
    { value: 2 * defaultPageSize, label: 2 * defaultPageSize },
    { value: 3 * defaultPageSize, label: 3 * defaultPageSize },
    { value: totalRows, label: "All" },
  ]

  return (
    <Container>
      <button
        className={cn("paginate-button back", { disabled: !canPreviousPage })}
        disabled={!canPreviousPage}
        onClick={previousPage}
      >
        <FaAngleLeft
          color={canPreviousPage ? "var(--primaryColor" : "darkgray"}
          size="2.5rem"
        />
      </button>
      <ReactPaginate
        forcePage={pageIndex}
        pageCount={pageCount}
        pageRangeDisplayed={
          pageIndex < 4 ? 6 : pageIndex > pageCount - 5 ? 7 : 5
        }
        marginPagesDisplayed={1}
        onPageChange={data => gotoPage(data.selected)}
        containerClassName="page-container"
        pageClassName="page-button-container"
        pageLinkClassName="page-button noselect"
        activeLinkClassName="selected"
        previousClassName="hide-button"
        nextClassName="hide-button"
        breakLinkClassName="ellipsis noselect"
      />
      <button
        className={cn("paginate-button forward", {
          disabled: !canNextPage,
        })}
        disabled={!canNextPage}
        onClick={nextPage}
      >
        <FaAngleRight
          color={canNextPage ? "var(--primaryColor)" : "darkgray"}
          size="2.5rem"
        />
      </button>

      <div className="rows-per-page-container">
        <span className="rows-per-page-label">Rows Per Page:</span>
        <Select
          classNamePrefix="react-select"
          isSearchable={false}
          placeholder={pageSize}
          value={pageSize}
          onChange={e => setPageSize(e.value)}
          options={rowSelectOptions}
        />
      </div>
    </Container>
  )
}

export default Pagination
