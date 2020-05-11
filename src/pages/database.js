// Gatsby supports TypeScript natively!
import React from "react"
import styled from "styled-components"
import { FaUpload, FaDownload, FaFilter } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import DatabaseTable from "../components/DatabaseTable"

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
      }

      .actions {
        display: flex;
        align-items: center;

        .action {
          background-color: white;
          color: #0f4c75;

          :hover {
            background-color: #bbe1fa;
          }
        }

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

const Database = () => {
  return (
    <Layout pageTitle="Database">
      <SEO title="Database" />
      <Container>
        <div className="database-content">
          <div className="database-header">
            <span className="dataset-title">
              Dataset: Harvard Univserity Concussion Study
            </span>
            <div className="actions">
              <button className="button action filter-button">
                <FaFilter size="1rem" color="#0f4c75" />
                <div className="button-text">Filters</div>
              </button>
              <button className="button action download-button">
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
            <DatabaseTable />
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Database
