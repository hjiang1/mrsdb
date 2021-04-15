import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { FaWrench } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .page-title {
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 2rem;
  }

  .page-banner {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem;

    .wip-icon {
      margin-right: 1rem;

      color: var(--primaryColor);
      height: 1.5rem;
      width: 1.5rem;
    }

    .wip-text {
      font-size: 2rem;
      font-weight: bold;
      color: var(--primaryColor);
    }
  }

  .page-description {
    margin: 1rem;
    max-width: 35rem;
    text-align: center;
  }

  .contact-button {
    margin: 1rem;
    text-decoration: none;
  }
`

const UploadPage = () => {
  return (
    <Layout pageTitle="Upload">
      <SEO title="Upload" />
      <Container>
        <div className="page-banner">
          <FaWrench className="wip-icon" />
          <div className="wip-text">Work in Progress.</div>
        </div>
        <div className="page-description">
          The dataset upload feature is not available for ISMRM 2021.
        </div>
        <div className="page-description">
          Check back in the future, or contact the Center for Clinical
          Spectroscopy to inquire about the status of this project.
        </div>
        <Link className="button contact-button" to="/contact/">
          Contact
        </Link>
      </Container>
    </Layout>
  )
}

export default UploadPage
