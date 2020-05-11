import React from "react"
import styled from "styled-components"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"
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

const Pagination = ({
  numPages,
  pageNumber,
  incrementPage,
  decrementPage,
  setPageNumber,
}) => {
  return (
    <Container>
      <button className={cn("paginate-button", { disabled: pageNumber === 0 })}>
        <FaCaretLeft
          color={pageNumber === 0 ? "darkgray" : "var(--primaryColor"}
          size="2.5rem"
          onClick={decrementPage}
        />
      </button>
      {Array.from(Array(numPages)).map((page, i) => (
        <button
          key={i}
          className={cn("page-button", { selected: pageNumber === i })}
          onClick={() => setPageNumber(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={cn("paginate-button", {
          disabled: pageNumber === numPages - 1,
        })}
      >
        <FaCaretRight
          color={
            pageNumber === numPages - 1 ? "darkgray" : "var(--primaryColor"
          }
          size="2.5rem"
          onClick={incrementPage}
        />
      </button>
    </Container>
  )
}

export default Pagination
