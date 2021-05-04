import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  .page-title {
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 2rem;
    margin: 2rem;
  }

  .page-description {
    margin: 1rem;
    max-width: 35rem;
    text-align: center;
  }

  .item-title {
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  .item-value {
    color: black;
    text-decoration: none;
    margin-top: 0.5rem;
  }
`

const ContactPage = () => {
  return (
    <Layout pageTitle="Contact">
      <Seo title="Contact" />
      <Container>
        <div className="page-title">Contact Us</div>
        <div className="page-description">
          For questions, comments, or feedback about the development of MRSDB,
          contact the Center for Clinical Spectroscopy using any of the methods
          below.
        </div>
        <div className="item-title">Visit</div>
        <a
          href="https://mrsdb.spectroscopy.org"
          target="_blank"
          rel="noreferrer"
          className="item-value"
        >
          https://mrsdb.spectroscopy.org
        </a>
        <div className="item-title">Email</div>
        <div className="item-value">hjiang@bwh.harvard.edu</div>
        <div className="item-title">Phone</div>
        <div className="item-value">+1 (617) 525-5801</div>
        <div className="item-title">Address</div>
        <div className="item-value">221 Longwood Ave, BLI-236B</div>
        <div className="item-value">Boston, MA 02115, USA</div>
      </Container>
    </Layout>
  )
}

export default ContactPage
