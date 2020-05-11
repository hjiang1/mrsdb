import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .landing-title {
    color: var(--primaryColor);
  }

  .landing-text {
    max-width: 600px;
    color: #1b262c;
  }

  .landing-button {
    margin-top: 3rem;
    height: 3rem;

    .nav-link {
      text-decoration: none;
      color: white;
      transition: color 0.1s ease;
      font-size: 2rem;
    }

    :hover .nav-link {
      color: var(--primaryColor);
    }
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <h1 className="landing-title">MRS Database</h1>
      <p className="landing-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium
        dictum tellus. Donec eu erat non arcu tempus consectetur. Sed luctus,
        lectus id convallis gravida, lectus tortor lacinia quam, nec tempor diam
        nunc sed leo. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Nunc malesuada ligula tortor, a aliquet
        augue sagittis ac. Proin viverra dolor et lobortis ornare. Curabitur non
        mattis sem. Aenean tincidunt elit semper lorem faucibus euismod.
      </p>
      <p className="landing-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium
        dictum tellus. Donec eu erat non arcu tempus consectetur. Sed luctus,
        lectus id convallis gravida, lectus tortor lacinia quam, nec tempor diam
        nunc sed leo.
      </p>
      <p className="landing-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium
        dictum tellus. Donec eu erat non arcu tempus consectetur. Sed luctus,
        lectus id convallis gravida, lectus tortor lacinia quam, nec tempor diam
        nunc sed leo.
      </p>
      <button className="button landing-button">
        <Link className="nav-link" to="/database/">
          View Database
        </Link>
      </button>
    </Container>
  </Layout>
)

export default IndexPage
