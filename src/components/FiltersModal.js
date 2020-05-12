import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FaTimes, FaRedo } from "react-icons/fa"

import Modal from "./Modal"
import ToggleButton from "./ToggleButton"
import Checkbox from "./Checkbox"

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

    .filter-modal-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid lightgray;
      border-bottom: 2px solid lightgray;
      padding: 2rem;
      width: 100%;

      margin-top: -1px;
      margin-bottom: -1px;

      font-weight: bold;
      color: #1b262c;
    }
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
  const [filterSettings, setFilterSettings] = useState(undefined)

  // Deep copy filters into state on open and reset on close
  useEffect(() => {
    if (isOpen) {
      setFilterSettings(JSON.parse(JSON.stringify(filters)))
    } else {
      setFilterSettings(undefined)
    }
  }, [isOpen, filters])

  const toggleCompleteFilter = () => {
    const newFilters = Object.assign({}, filterSettings)
    newFilters.complete.remove = !newFilters.complete.remove

    setFilterSettings(newFilters)
  }

  const changeSexFilter = sexId => {
    const newFilters = Object.assign({}, filterSettings)
    newFilters.sex[sexId] = !newFilters.sex[sexId]

    setFilterSettings(newFilters)
  }

  const applyFilters = () => {
    const newFilters = Object.assign({}, filters, filterSettings)

    setFilters(newFilters)
    setOpen(false)
  }

  const resetFilters = () => {
    setFilterSettings(JSON.parse(JSON.stringify(defaultFilters)))
  }

  const showUncategorized = filterSettings && !filterSettings.complete.remove
  const loadedFilters = filterSettings ? filterSettings : filters

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
          <div className="filter-modal-filter">
            <div>Remove Partial Data Points</div>
            <ToggleButton
              value={loadedFilters.complete.remove}
              onClick={toggleCompleteFilter}
            />
          </div>
          <div className="filter-modal-filter">
            <div>Subject Sex</div>
            <div className="option-container">
              <Checkbox
                id="male"
                checked={loadedFilters.sex.male}
                onChange={changeSexFilter}
              >
                Male
              </Checkbox>
              <Checkbox
                id="female"
                checked={loadedFilters.sex.female}
                onChange={changeSexFilter}
              >
                Female
              </Checkbox>
              {showUncategorized && (
                <Checkbox
                  id="uncategorized"
                  checked={loadedFilters.sex.uncategorized}
                  onChange={changeSexFilter}
                >
                  Uncategorized
                </Checkbox>
              )}
            </div>
          </div>
        </div>
        <div className="filter-modal-actions">
          <button className="button reset-button" onClick={resetFilters}>
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
