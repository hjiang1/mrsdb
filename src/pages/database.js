// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FaDownload, FaFilter, FaExclamation } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FiltersModal from "../components/FiltersModal"
import DatabaseTable from "../components/DatabaseTable"
import data from "../components/DatabaseTable/mockData"

import {
  defaultFilters,
  filterFunctions,
} from "../components/FiltersModal/filters"

const Container = styled.div`
  display: flex;
  flex: 1;

  .database-content {
    flex: 1;
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;

    .database-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 1rem;

      .dataset-title {
        font-weight: bold;
        color: var(--primaryColor);
        font-size: 1.25rem;
        display: flex;
        align-items: center;

        .change-button {
          margin-left: 1rem;
        }
      }

      .actions {
        display: flex;
        align-items: center;

        .upload-button,
        .download-button {
          margin-left: 0.5rem;
        }

        .button-text {
          margin-left: 0.5rem;
        }
      }
    }

    .database-table {
      width: 100%;
      margin: 0 2rem;
      color: #1b262c;
    }

    .no-data-warning {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 2px solid var(--primaryColor);
      border-radius: 5px;
      padding: 2rem;
      width: fit-content;
      background-color: white;

      .warning-text {
        font-size: 1rem;
        font-weight: bold;
        margin: 2rem 0;
      }

      .filter-icon {
        margin-right: 0.5rem;
      }
    }
  }
`

const Database = () => {
  const [filters, setFilters] = useState(defaultFilters)
  const [filteredItems, setFilteredItems] = useState([])
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  // Filter rows when filters change
  useEffect(() => {
    let newFilteredItems = [...data.items]

    // Iterate through and run each filter
    Object.keys(filters).forEach(filterName => {
      newFilteredItems = filterFunctions[filterName](
        newFilteredItems,
        filters[filterName]
      )
    })

    setFilteredItems(newFilteredItems)
  }, [filters])

  // Shallow copy to trigger re-render
  const filteredData = Object.assign({}, data)
  filteredData.items = filteredItems

  // Check if table filters match default filters
  const filtersMatchDefault =
    JSON.stringify(defaultFilters) === JSON.stringify(filters)

  return (
    <Layout pageTitle="Database">
      <SEO title="Database" />
      <Container>
        <div className="database-content">
          <div className="database-header">
            <span className="dataset-title">
              {data.title}
              <button className="button white change-button disabled">
                <div className="button-text">Change Dataset</div>
              </button>
            </span>
            <div className="actions">
              <button
                className="button white filter-button"
                onClick={() => setFilterModalOpen(true)}
              >
                <FaFilter size="1rem" color="#0f4c75" />
                <div className="button-text">Filters</div>
              </button>
              <button className="button white download-button disabled">
                <FaDownload size="1rem" color="#0f4c75" />
                <div className="button-text">Download</div>
              </button>
            </div>
          </div>
          <div className="database-table">
            <DatabaseTable data={data} rowsPerPage={10} />
          </div>
          {!filtersMatchDefault && filteredItems.length === 0 && (
            <div className="no-data-warning">
              <FaExclamation size="2rem" color="var(--primaryColor)" />
              <div className="warning-text">
                No data matches your filter criteria. Update your filters to
                view this dataset.
              </div>
              <button
                className="button filter-button"
                onClick={() => setFilterModalOpen(true)}
              >
                <FaFilter className="filter-icon" size="1rem" />
                <div className="button-text">Filters</div>
              </button>
            </div>
          )}
        </div>
      </Container>
      <FiltersModal
        isOpen={isFilterModalOpen}
        setOpen={setFilterModalOpen}
        filters={filters}
        setFilters={setFilters}
        defaultFilters={defaultFilters}
      />
    </Layout>
  )
}

export default Database
