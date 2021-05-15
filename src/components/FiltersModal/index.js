import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Modal from "../Modal"
import FiltersModalHeader from "./FiltersModalHeader"
import FiltersModalActions from "./FiltersModalActions"
import DynamicFilter from "./DynamicFilter"

const Container = styled.div`
  width: 100%;
  height: fit-content;

  .filter-modal-content {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const FiltersModal = ({
  isOpen,
  setOpen,
  datasetFilters,
  activeFilters,
  defaultFilters,
  setFilters,
}) => {
  // Filter settings (separate from filters on table)
  const [filterSettings, setFilterSettings] = useState(undefined)

  // Deep copy filters into state on open and reset on close
  useEffect(() => {
    if (isOpen) {
      setFilterSettings(JSON.parse(JSON.stringify(activeFilters)))
    } else {
      setFilterSettings(undefined)
    }
  }, [isOpen, activeFilters])

  // Show table filters on first render before they are copied to state
  const loadedFilters = filterSettings ? filterSettings : activeFilters
  const showUncategorized = false //!loadedFilters.complete.remove

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <FiltersModalHeader setOpen={setOpen} />
        <div className="filter-modal-content">
          {datasetFilters &&
            datasetFilters.map((datasetFilter, i) => {
              return (
                <DynamicFilter
                  key={i}
                  filterMetadata={datasetFilter}
                  loadedFilters={loadedFilters}
                  defaultFilters={defaultFilters}
                  setFilterSettings={setFilterSettings}
                  showUncategorized={showUncategorized}
                />
              )
            })}
        </div>
        <FiltersModalActions
          filters={activeFilters}
          defaultFilters={defaultFilters}
          filterSettings={filterSettings}
          loadedFilters={loadedFilters}
          setFilters={setFilters}
          setOpen={setOpen}
          setFilterSettings={setFilterSettings}
          showUncategorized={showUncategorized}
        />
      </Container>
    </Modal>
  )
}

export default FiltersModal
