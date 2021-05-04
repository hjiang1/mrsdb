import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import cn from "classnames"
import { FaArrowRight } from "react-icons/fa"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import scanner from "../images/idris-oulmane-mri-scan-machine-4.jpg"

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
    margin: 0 5rem;
    margin-bottom: 2rem;
    text-align: left;

    font-weight: bold;
    font-size: 10rem;
    color: var(--primaryColor);

    transition: opacity 1s ease;

    text-shadow: 5px 5px rgba(0, 0, 0, 0.25);

    &.loaded {
      opacity: 1;
    }

    @media screen and (max-width: 768px) {
      font-size: 5.25rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 2.75rem;
      text-align: center;
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
    margin: 0 5rem;
    max-width: 75rem;

    border: 1px solid gray;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.25);

    transition: opacity 1s ease;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      margin: 0 4rem;
    }

    @media screen and (max-width: 480px) {
      margin: 0;
    }

    &.loaded {
      opacity: 1;
    }

    .landing-text {
      margin: 0;
      color: #1b262c;
      font-size: 1.15rem;
      text-align: justify;
      margin-bottom: 1rem;

      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 0.75rem;
      }
    }

    .image-ref {
      font-size: 0.82rem;
      margin: 0;
    }

    .landing-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 3rem;
      height: 3rem;
      padding: 1rem;
      text-decoration: none;

      @media screen and (max-width: 768px) {
        margin: 1rem 0 0;
        align-self: flex-start;
      }

      @media screen and (max-width: 480px) {
        align-self: center;
      }

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
    } else {
      var loadIn = () => {
        // If page is not fully loaded, trigger animation on load
        setLoadedIn(true)
      }

      window.addEventListener("load", loadIn)
    }

    return () => {
      window.removeEventListener("load", loadIn)
    }
  }, [])

  return (
    <Layout pageTitle="Home">
      <Seo title="MRSDB" />
      <Container>
        <div className={cn("swipe-in", { loaded: isLoadedIn })} />
        {/* <div className="overlay" /> */}
        <div className={cn("site-title", { loaded: isLoadedIn })}>MRSDB</div>
        <div className={cn("landing-card", { loaded: isLoadedIn })}>
          <div>
            <p className="landing-text">
              MRSDB is a concept online platform for members of the magnetic
              resonance spectroscopy community to browse, download, and share
              MRS data across a variety research and clinical domains. By
              standardizing and centralizing MRS datasets from sites across the
              world, MRSDB hopes to enhance international collaboration and
              curate a large dataset to enable robust machine learning research.
            </p>
            <p className="image-ref">
              This site is a prototype for the Internation Society for Magnetic
              Resonance in Medicine 2021 Annual Meeting and Exhibition and is
              subject to change.
            </p>
            <p className="image-ref">
              Background image by Idris Oulmane:
              https://www.artstation.com/artwork/AqkQDq
            </p>
          </div>
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
