import React from "react"
import styled from "styled-components"

import { FaSearch } from "react-icons/fa"

const Container = styled.div`
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
        height: 2rem;
        width: 2rem;
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
`

const DatasetList = ({ setView }) => {
  return (
    <Container className="dataset-container">
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
            <div className="dataset-name">CCS Normative Data</div>
            <div className="dataset-site">
              Center for Clinical Spectroscopy, Brigham and Women's Hospital
            </div>
            <div className="dataset-description">
              Combined normative data from multiple 3T studies
            </div>
            <div className="dataset-description">200 Voxels</div>
          </div>
          <button className="button" onClick={() => setView("viewer")}>
            View
          </button>
        </div>
        <div className="dataset-item">
          <div className="dataset-data">
            <div className="dataset-name">CCS Concussion Study (Mock Data)</div>
            <div className="dataset-site">
              Center for Clinical Spectroscopy, Brigham and Women's Hospital
            </div>
            <div className="dataset-description">
              Mock data generated from a sports-related TBI study
            </div>
            <div className="dataset-description">302 Voxels</div>
          </div>
          <button className="button" onClick={() => setView("viewer")}>
            View
          </button>
        </div>
      </div>
    </Container>
  )
}

export default DatasetList
