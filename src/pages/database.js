// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FaDownload, FaFilter } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FiltersModal from "../components/FiltersModal"
import DatabaseTable from "../components/DatabaseTable"
import data from "../components/DatabaseTable/data"
import {
  filterComplete,
  filterSex,
} from "../components/DatabaseTable/functions"

const Container = styled.div`
  display: flex;
  flex: 1;

  .database-content {
    flex: 1;
    background-color: #eeeeee;

    .database-header {
      margin: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
      margin: 0 2rem;
      color: #1b262c;
    }
  }
`

const filterFunctions = {
  complete: filterComplete,
  sex: filterSex,
}

const defaultFilters = {
  complete: {
    remove: false,
  },
  sex: {
    male: true,
    female: true,
    uncategorized: true,
  },
}

const Database = () => {
  const [filters, setFilters] = useState(defaultFilters)
  const [filteredItems, setFilteredItems] = useState([])
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  // Filter rows
  useEffect(() => {
    let newFilteredItems = [...data.items]

    Object.keys(filters).forEach(filterName => {
      newFilteredItems = filterFunctions[filterName](
        newFilteredItems,
        filters[filterName]
      )
    })

    setFilteredItems(newFilteredItems)
  }, [filters])

  const filteredData = Object.assign({}, data)
  filteredData.items = filteredItems

  return (
    <Layout pageTitle="Database">
      <SEO title="Database" />
      <Container>
        <div className="database-content">
          <div className="database-header">
            <span className="dataset-title">
              Harvard Univserity Concussion Study
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
              {/* <button className="button action upload-button">
                <FaUpload size="1rem" color="#0f4c75" />
                <div className="button-text">Add Entry</div>
              </button> */}
            </div>
          </div>
          <div className="database-table">
            <DatabaseTable data={filteredData} rowsPerPage={10} />
          </div>
        </div>
        <FiltersModal
          isOpen={isFilterModalOpen}
          setOpen={setFilterModalOpen}
          filters={filters}
          setFilters={setFilters}
          defaultFilters={defaultFilters}
        />
      </Container>
    </Layout>
  )
}

export default Database
