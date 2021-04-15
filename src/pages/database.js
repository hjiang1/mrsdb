// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaDownload,
  FaFilter,
  FaExclamation,
  FaRedo,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa"

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
  width: 100%;

  .dataset-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .dataset-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 0 2rem;

      .dataset-title {
        font-weight: bold;
        color: var(--primaryColor);
        font-size: 2rem;
      }

      .dataset-search {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 1rem 0;
        align-self: flex-end;

        border: 1px solid var(--primaryColor);

        .search-icon {
          padding: 0 0.5rem;
        }

        .search-input {
          border: none;
          padding: 0.5rem 0;

          :focus {
            outline: none;
          }
        }

        .search-button {
          color: var(--primaryColor);
          font-weight: bold;
          padding: 0.5rem;

          transition: background-color 0.1s ease;

          :hover {
            background-color: #d9f0ff;
          }
        }
      }
    }

    .dataset-list {
      border: 2px solid var(--primaryColor);
      margin: 0 2rem;

      .dataset-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--primaryColor);

        :last-child {
          border: none;
        }

        .dataset-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--primaryColor);
        }

        .dataset-site {
          color: var(--primaryColor);
          margin-bottom: 0.25rem;
        }
      }
    }
  }

  .database-content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    background-color: #eeeeee;
    padding: 1rem 2rem;

    .database-header {
      display: grid;
      grid-template-columns: 1fr min-content min-content;
      grid-column-gap: 0.5rem;
      grid-template-areas:
        "title change-button download-button"
        "metadata . .";

      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 1rem;

      .dataset-title {
        grid-area: title;
        white-space: nowrap;

        font-weight: bold;
        color: var(--primaryColor);
        font-size: 1.25rem;
        display: flex;
        align-items: center;
      }

      .info-button {
        height: 2rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-left: 0.25rem;

        svg {
          margin: 0;
        }

        :focus {
          /* outline: none; */
        }
      }

      .dataset-metadata {
        grid-area: metadata;
        white-space: nowrap;
        color: var(--primaryColor);
      }

      .change-button {
        grid-area: change-button;
        white-space: nowrap;
      }

      .download-button {
        grid-area: download-button;
        white-space: nowrap;
      }

      .button-icon {
        margin-right: 0.5rem;
      }
    }

    .database-table-container {
      width: 100%;
      margin: 0 2rem;
      color: #1b262c;
    }

    .no-data-warning {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid var(--primaryColor);
      border-radius: 0;
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
  const [view, setView] = useState("datasets")
  const [filters, setFilters] = useState(defaultFilters)
  const [filteredItems, setFilteredItems] = useState([])
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  // Filter rows when filters change
  useEffect(() => {
    let newFilteredItems = [...data.data]

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
        {view === "datasets" ? (
          <div className="dataset-container">
            <div className="dataset-header">
              <div className="dataset-title">Datasets</div>

              <div className="dataset-search">
                <FaSearch
                  className="search-icon"
                  size="1.25rem"
                  color="var(--primaryColor)"
                />
                <input className="search-input" placeholder={`Search`} />
                <button className="search-button">Go</button>
              </div>
            </div>
            <div className="dataset-list">
              <div className="dataset-item">
                <div className="dataset-data">
                  <div className="dataset-name">DOD Study</div>
                  <div className="dataset-site">
                    Center for Clinical Spectroscopy, Brigham and Women's
                    Hospital
                  </div>
                  <div className="dataset-description">
                    US DOD battlefield mTBI study
                  </div>
                  <div className="dataset-description">200 Sequences</div>
                </div>
                <button className="button" onClick={() => setView("viewer")}>
                  View
                </button>
              </div>
              <div className="dataset-item">
                <div className="dataset-data">
                  <div className="dataset-name">
                    CCS Concussion Study (Mock Data)
                  </div>
                  <div className="dataset-site">
                    Center for Clinical Spectroscopy, Brigham and Women's
                    Hospital
                  </div>
                  <div className="dataset-description">
                    Sports-related TBI study
                  </div>
                  <div className="dataset-description">302 Sequences</div>
                </div>
                <button className="button" onClick={() => setView("viewer")}>
                  View
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="database-content">
            <div className="database-header">
              <span className="dataset-title">
                {data.title}
                <button className="info-button">
                  <FaInfoCircle
                    className="button-icon"
                    size="2rem"
                    color="#0f4c75"
                  />
                </button>
              </span>
              <span className="dataset-metadata">
                Center for Clinical Spectroscopy, Brigham and Women's Hospital
              </span>
              <button
                className="button white change-button"
                onClick={() => setView("datasets")}
              >
                <FaRedo className="button-icon" size="1rem" color="#0f4c75" />
                <div className="button-text">Change Dataset</div>
              </button>
              <button className="button white download-button">
                <FaDownload
                  className="button-icon"
                  size="1rem"
                  color="#0f4c75"
                />
                <div className="button-text">Download Dataset</div>
              </button>
            </div>
            <div className="database-table-container">
              <DatabaseTable
                data={Object.assign({}, data, { data: filteredItems })}
                defaultPageSize={18}
                setFilterModalOpen={setFilterModalOpen}
              />
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
        )}
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
