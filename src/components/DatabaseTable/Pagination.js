import React from "react"
import styled from "styled-components"
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa"
import cn from "classnames"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

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

  .page-button {
    color: var(--primaryColor);
    border-bottom: 2px solid transparent;
    height: 2rem;
    font-size: 1.25rem;

    &.selected {
      font-weight: bold;
      border-bottom: 2px solid var(--primaryColor);
    }

    :hover {
      font-weight: bold;
    }
  }
`

const Pagination = ({ numPages, pageNumber, setPageNumber }) => {
  const decrementPage = () => {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  const incrementPage = () => {
    if (pageNumber !== numPages - 1) {
      setPageNumber(pageNumber + 1)
    }
  }

  const goToFirstPage = () => {
    if (pageNumber !== 0) {
      setPageNumber(0)
    }
  }

  const goToLastPage = () => {
    if (pageNumber !== numPages - 1) {
      setPageNumber(numPages - 1)
    }
  }

  return (
    <Container>
      <button
        className={cn("paginate-button", { disabled: pageNumber === 0 })}
        disabled={pageNumber === 0}
        onClick={goToFirstPage}
      >
        <FaAngleDoubleLeft
          color={pageNumber === 0 ? "darkgray" : "var(--primaryColor"}
          size="2.5rem"
        />
      </button>
      <button
        className={cn("paginate-button", { disabled: pageNumber === 0 })}
        disabled={pageNumber === 0}
        onClick={decrementPage}
      >
        <FaAngleLeft
          color={pageNumber === 0 ? "darkgray" : "var(--primaryColor"}
          size="2.5rem"
        />
      </button>
      {Array.from(Array(numPages)).map((page, i) => (
        <button
          key={i}
          className={cn("page-button", "noselect", {
            selected: pageNumber === i,
          })}
          onClick={() => setPageNumber(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={cn("paginate-button", {
          disabled: pageNumber >= numPages - 1,
        })}
        disabled={pageNumber >= numPages - 1}
        onClick={incrementPage}
      >
        <FaAngleRight
          color={
            pageNumber >= numPages - 1 ? "darkgray" : "var(--primaryColor)"
          }
          size="2.5rem"
        />
      </button>
      <button
        className={cn("paginate-button", {
          disabled: pageNumber >= numPages - 1,
        })}
        disabled={pageNumber >= numPages - 1}
        onClick={goToLastPage}
      >
        <FaAngleDoubleRight
          color={
            pageNumber >= numPages - 1 ? "darkgray" : "var(--primaryColor)"
          }
          size="2.5rem"
        />
      </button>
    </Container>
  )
}

export default Pagination
