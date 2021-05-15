import React from "react"
import styled from "styled-components"
import { FaRedo } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;

  .loading-icon {
    height: 2rem;
    width: 2rem;
    color: var(--primaryColor);

    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .loading-text {
    color: var(--primaryColor);
    font-weight: bold;
    margin-left: 1rem;
  }
`

const LoadingCard = () => (
  <Container className="loading-card">
    <FaRedo className="loading-icon" />
    <div className="loading-text">Loading</div>
  </Container>
)

export default LoadingCard
