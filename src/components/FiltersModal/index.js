import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Modal from "../Modal"
import FiltersModalHeader from "./FiltersModalHeader"
import FiltersModalActions from "./FiltersModalActions"
import PartialFilter from "./PartialFilter"
import SexFilter from "./SexFilter"
import SportFilter from "./SportFilter"
import AgeFilter from "./AgeFilter"
import HeightFilter from "./HeightFilter"
import WeightFilter from "./WeightFilter"

const Container = styled.div`
  width: 100%;

  .filter-modal-content {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const FiltersModal = ({ isOpen, setOpen, filters, setFilters }) => {
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

  // Show table filters on first render before they are copied to state
  const loadedFilters = filterSettings ? filterSettings : filters
  const showUncategorized = !loadedFilters.complete.remove

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <FiltersModalHeader setOpen={setOpen} />
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
          <AgeFilter showUncategorized={showUncategorized} />
          <HeightFilter showUncategorized={showUncategorized} />
          <WeightFilter showUncategorized={showUncategorized} />
        </div>
        <FiltersModalActions
          filters={filters}
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
