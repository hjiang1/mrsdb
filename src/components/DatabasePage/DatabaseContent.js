import React, { useState, useEffect, Fragment } from "react"
import styled from "styled-components"
import {
  FaDownload,
  FaFilter,
  FaExclamation,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa"
import { Parser } from "json2csv"

import DatabaseTable from "../DatabaseTable"

import LoadingCard from "../LoadingCard"

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  background-color: #eeeeee;
  padding: 1rem 2rem;

  .database-header {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 1rem;
    margin-bottom: 1rem;

    border-bottom: 1px solid var(--primaryColor);

    .dataset-info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

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
`

const DatasetContent = ({
  data,
  metadata,
  defaultFilters,
  filtersMatchDefault,
  setFilterModalOpen,
  setView,
}) => {
  const [defaultPageSize, setDefaultPageSize] = useState(null)

  useEffect(() => {
    const windowHeight = window.innerHeight
    const numRows = parseInt(windowHeight / 60)

    setDefaultPageSize(numRows)
  }, [])

  const downloadCSV = () => {
    const parser = new Parser({ fields: metadata.accessors })
    const csv = parser.parse(data)

    const link = document.createElement("a")
    link.href = "data:text/csv," + encodeURIComponent(csv)
    link.download = `${metadata.table_name}.csv`
    link.click()
  }

  return (
    <Container className="database-content">
      <div className="database-header">
        <button
          className="button white change-button"
          onClick={() => setView("datasets")}
        >
          <FaArrowLeft className="button-icon" size="1rem" color="#0f4c75" />
          <div className="button-text">Back to Dataset List</div>
        </button>
        <div className="dataset-info">
          {metadata && (
            <Fragment>
              <span className="dataset-title">
                {metadata.name}
                <button className="info-button">
                  <FaInfoCircle
                    className="button-icon"
                    size="2rem"
                    color="#0f4c75"
                  />
                </button>
              </span>
              <span className="dataset-metadata">
                {metadata ? metadata.site : ""}
              </span>
            </Fragment>
          )}
        </div>
        <button className="button white download-button" onClick={downloadCSV}>
          <FaDownload className="button-icon" size="1rem" color="#0f4c75" />
          <div className="button-text">Download Dataset</div>
        </button>
      </div>
      <div className="database-table-container">
        {data && defaultPageSize && defaultFilters ? (
          <DatabaseTable
            data={data}
            metadata={metadata}
            defaultPageSize={defaultPageSize}
            setFilterModalOpen={setFilterModalOpen}
          />
        ) : (
          <LoadingCard />
        )}
      </div>
      {!filtersMatchDefault && data.length === 0 && (
        <div className="no-data-warning">
          <FaExclamation size="2rem" color="var(--primaryColor)" />
          <div className="warning-text">
            No data matches your filter criteria. Update your filters to view
            this dataset.
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
    </Container>
  )
}

export default DatasetContent
