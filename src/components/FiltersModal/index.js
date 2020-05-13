import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FaTimes, FaRedo } from "react-icons/fa"
import cn from "classnames"

import Modal from "../Modal"
import PartialFilter from "./PartialFilter"
import SexFilter from "./SexFilter"
import SportFilter from "./SportFilter"

const Container = styled.div`
  width: 100%;

  .filter-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 1rem 2rem;
    margin-bottom: 2rem;

    .filter-modal-title {
      margin: 0;
      color: var(--primaryColor);
    }

    .close-button {
      transition: transform 0.1s ease;

      svg {
        color: var(--primaryColor);
      }

      :hover {
        transform: scale(1.1);
      }
    }
  }

  .filter-modal-content {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .filter-modal-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;

    .reset-button .reset-icon {
      margin-right: 0.5rem;
    }

    .cancel-submit-container {
      display: flex;
      align-items: center;
    }
  }
`

const FiltersModal = ({
  isOpen,
  setOpen,
  filters,
  setFilters,
  defaultFilters,
}) => {
  // Filter settings (separate from filters on table)
  const [filterSettings, setFilterSettings] = useState(undefined)

  // Deep copy filters into state on open and reset on close
  useEffect(() => {
    if (isOpen) {
      setFilterSettings(JSON.parse(JSON.stringify(filters)))
    } else {
      setFilterSettings(undefined)
    }
  }, [isOpen, filters])

  // Apply filters to table
  const applyFilters = () => {
    const newFilters = Object.assign({}, filters, filterSettings)

    setFilters(newFilters)
    setOpen(false)
  }

  // Reset filters to default values
  const resetFilters = () => {
    setFilterSettings(JSON.parse(JSON.stringify(defaultFilters)))
  }

  // Show table filters before they are copied to state
  const loadedFilters = filterSettings ? filterSettings : filters
  const showUncategorized = !loadedFilters.complete.remove
  const isDefault =
    JSON.stringify(defaultFilters) === JSON.stringify(loadedFilters)

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <div className="filter-modal-header">
          <h1 className="filter-modal-title">Filters</h1>
          <button className="close-button" onClick={() => setOpen(false)}>
            <FaTimes size="1.5rem" />
          </button>
        </div>
        <div className="filter-modal-content">
          <PartialFilter
            filters={loadedFilters}
            setFilterSettings={setFilterSettings}
          />
          <SexFilter
            filters={loadedFilters}
            setFilterSettings={setFilterSettings}
            showUncategorized={showUncategorized}
          />
          <SportFilter
            filters={loadedFilters}
            setFilterSettings={setFilterSettings}
            showUncategorized={showUncategorized}
          />
        </div>
        <div className="filter-modal-actions">
          <button
            className={cn("button", "reset-button", { disabled: isDefault })}
            onClick={resetFilters}
          >
            <FaRedo className="reset-icon" size="1rem" />
            Reset Filters
          </button>
          <div className="cancel-submit-container">
            <button className="button cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="button" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      </Container>
    </Modal>
  )
}

export default FiltersModal
