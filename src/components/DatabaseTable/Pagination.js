import React from "react"
import styled from "styled-components"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import cn from "classnames"
import ReactPaginate from "react-paginate"

const Container = styled.div`
  display: flex;
  justify-content: center;
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
    }
  }

  .ellipsis,
  .page-button {
    color: var(--primaryColor);
    border-bottom: 2px solid transparent;
    height: 2rem;
    font-size: 1rem;
    cursor: pointer;

    margin: 0.5rem;
    padding: 0.5rem 0.75rem;

    border: 1px solid rgba(0, 0, 0, 0);

    transition: border-color 0.2s ease, border-width 0.2s ease;

    &.selected {
      font-weight: bold;
      border-color: var(--primaryColor);
      border-width: 2px;
    }

    :hover {
      font-weight: bold;
      border-color: var(--primaryColor);
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
}) => {
  return (
    <Container>
      <button
        className={cn("paginate-button", { disabled: !canPreviousPage })}
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
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={data => gotoPage(data.selected)}
        containerClassName="page-container"
        pageLinkClassName="page-button noselect"
        activeLinkClassName="selected"
        previousClassName="hide-button"
        nextClassName="hide-button"
        breakLinkClassName="ellipsis noselect"
      />
      <button
        className={cn("paginate-button", {
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
    </Container>
  )
}

export default Pagination
