import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import cn from "classnames"
import { FaArrowRight } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import scanner from "../images/scanner.jpeg"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;

  background-image: url(${scanner});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .swipe-in {
    z-index: 100;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;

    transition: width 0.5s linear;

    &.loaded {
      width: 0%;
    }
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 50%;
  }

  .site-title {
    align-self: top;
    z-index: 10;
    opacity: 0;
    margin-left: 5rem;
    margin-bottom: 2rem;

    font-weight: bold;
    font-size: 10rem;
    color: var(--primaryColor);

    transition: opacity 1s ease;

    &.loaded {
      opacity: 1;
    }
  }

  .landing-card {
    display: flex;
    flex-direction: row;
    align-items: center;

    z-index: 10;
    background-color: white;
    padding: 2rem 3rem;
    opacity: 0;
    margin-left: 5rem;
    width: 74rem;

    border: 1px solid gray;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.25);

    transition: opacity 1s ease;

    &.loaded {
      opacity: 1;
    }

    .landing-text {
      /* max-width: 600px; */
      color: #1b262c;
    }

    .landing-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 3rem;
      height: 3rem;
      padding: 1rem;
      text-decoration: none;

      .button-text {
        color: white;
        font-weight: normal;
        white-space: nowrap;
        margin-right: 1rem;
        transition: color 0.1s ease;
      }

      .svg {
        color: white;
      }

      :hover .button-text,
      .svg {
        color: var(--primaryColor);
      }
    }
  }
`

const IndexPage = () => {
  const [isLoadedIn, setLoadedIn] = useState(false)

  useEffect(() => {
    if (document.readyState === "complete") {
      // If page is fully loaded, trigger animation on mount
      setLoadedIn(true)
    }
  }, [])

  window.addEventListener("load", () => {
    // If page is not fully loaded, trigger animation on load
    setLoadedIn(true)
  })

  return (
    <Layout pageTitle="Home">
      <SEO title="MRSDB" />
      <Container>
        <div className={cn("swipe-in", { loaded: isLoadedIn })} />
        {/* <div className="overlay" /> */}
        <div className={cn("site-title", { loaded: isLoadedIn })}>MRSDB</div>
        <div className={cn("landing-card", { loaded: isLoadedIn })}>
          <p className="landing-text">
            MRSDB is a concept online platform for members of the magnetic
            resonance spectroscopy community to browse, download, and share MRS
            data across a variety research and clinical domains. By
            standardizing and centralizing MRS datasets from sites across the
            world, MRSDB hopes to enhance international collaboration and curate
            a large dataset to enable robust machine learning research. This
            site is a prototype for the Internation Society for Magnetic
            Resonance in Medicine 2021 Conference and is subject to change.
          </p>
          <Link className="button landing-button" to="/database/">
            <div className="button-text">View the Database</div>
            <FaArrowRight size="1.5rem" />
          </Link>
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage
