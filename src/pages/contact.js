import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import cn from "classnames"
import { FaArrowRight } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import scanner from "../images/scanner.jpeg"

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
    margin-top: 0.5rem;
  }
`

const ContactPage = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <Container>
        <div className="page-title">Contact Us</div>
        <div className="page-description">
          For questions, comments, or feedback about the development of MRSDB,
          contact the Center for Clinical Spectroscopy using any of the methods
          below.
        </div>
        <div className="item-title">Email</div>
        <div className="item-value">hjiang@bwh.harvard.edu</div>
        <div className="item-title">Phone</div>
        <div className="item-value">+1 (123) 456-7890</div>
        <div className="item-title">Address</div>
        <div className="item-value">221 Longwood Ave, BLI-236B</div>
        <div className="item-value">Boston, MA 02115, USA</div>
      </Container>
    </Layout>
  )
}

export default ContactPage
