import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaExclamationTriangle } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
    margin: 0 2rem;
  }

  .contact-button {
    text-decoration: none;
  }
`

const LoadingCard = () => (
  <Container className="error-card">
    <FaExclamationTriangle className="error-icon" />
    <div className="error-text">Error Loading Data</div>
    <Link className="button contact-button" to="/contact/">
      <div className="button-text">Contact Us</div>
    </Link>
  </Container>
)

export default LoadingCard
