import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaExclamationTriangle } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;

  .error-icon {
    height: 2rem;
    width: 2rem;
    color: var(--primaryColor);
  }

  .error-text {
    color: var(--primaryColor);
    font-weight: bold;
    margin: 1rem 0;
  }

  .contact-button {
    text-decoration: none;
    margin-top: 1rem;
  }
`

const ErrorCard = ({ onReload }) => (
  <Container className="error-card">
    <FaExclamationTriangle className="error-icon" />
    <div className="error-text">Error Loading Data</div>
    <button className="button reload-button" onClick={onReload}>
      Reload
    </button>
    <Link className="button contact-button" to="/contact/">
      <div className="button-text">Contact Us</div>
    </Link>
  </Container>
)

export default ErrorCard
