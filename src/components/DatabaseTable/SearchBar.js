import React from "react"
import styled from "styled-components"
import { useAsyncDebounce } from "react-table"
import { FaSearch } from "react-icons/fa"

import cn from "classnames"

const Container = styled.span`
  display: flex;
  /* margin: 0.5rem 0; */
  overflow: hidden;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--primaryColor);
  /* border-radius: 25px; */
  background-color: white;

  .searchbar-icon {
    margin: 0.25rem 0.5rem;
  }

  .searchbar-input {
    border: none;
    flex: 1;

    :focus {
      outline: none;
    }
  }

  .searchbar-reset-button {
    background-color: white;

    .disabled {
      opacity: 1;
    }
  }
`

// Define a default UI for filtering
const SearchBar = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Container className="searchbar-container">
      <FaSearch
        className="searchbar-icon"
        size="1.25rem"
        color="var(--primaryColor)"
      />
      <input
        className="searchbar-input"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`Search`}
      />
      <button
        className={cn("button", "cancel", "searchbar-reset-button", {
          disabled: value === "" || value === undefined,
        })}
        disabled={value === "" || value === undefined}
        onClick={() => {
          setValue("")
          onChange("")
        }}
      >
        Reset
      </button>
    </Container>
  )
}

export default SearchBar
