import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import { FaUserCircle } from "react-icons/fa"
import cn from "classnames"

const Container = styled.header`
  display: grid;
  grid-template-columns: min-content 1fr repeat(7, min-content);
  padding-right: 2rem;

  background-color: white;
  height: var(--headerHeight);
  align-items: center;
  /* justify-content: space-between; */

  border-bottom: 1px solid lightgray;

  .header-name {
    margin: 0;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #0f4c75;

    .title-link {
      display: flex;
      align-items: center;
      text-decoration: none;

      height: 100%;
      padding: 0 2rem;

      .title-text {
        color: white;
        font-weight: bold;
      }
    }
  }

  .page-title {
    margin: 0;
    color: var(--primaryColor);
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .nav-button {
    display: flex;
    align-items: center;
    color: var(--primaryColor);
    white-space: nowrap;
    height: 100%;
    padding: 0 1rem;

    font-size: 16px;
    text-decoration: none;

    &.current {
      border-bottom: 2px solid var(--primaryColor);
      background-color: #d9f0ff;
    }

    :hover {
      background-color: #d9f0ff;
    }
  }

  .user-account {
    .profile-button {
      cursor: pointer;
      border: none;
      background: none;
      display: flex;
      align-items: center;
    }
  }
`

const Header = ({ siteTitle, pageTitle }) => {
  const [signedIn, setSignedIn] = useState(true)

  return (
    <Container>
      <h1 className="header-name">
        <Link to="/" className="title-link">
          <span className="title-text">{siteTitle}</span>
        </Link>
      </h1>
      <h1 className="page-title">{pageTitle}</h1>
      <Link
        className={cn("nav-button", {
          current: pageTitle === "Home",
        })}
        to="/"
      >
        Home
      </Link>
      <Link
        className={cn("nav-button", {
          current: pageTitle === "Database",
        })}
        to="/database/"
      >
        Database
      </Link>
      <Link
        className={cn("nav-button", {
          current: pageTitle === "Upload",
        })}
        to="/upload/"
      >
        Upload
      </Link>
      <Link
        className={cn("nav-button", {
          current: pageTitle === "About",
        })}
        to="/about/"
      >
        About
      </Link>
      <Link
        className={cn("nav-button", {
          current: pageTitle === "Contact",
        })}
        to="/contact/"
      >
        Contact
      </Link>
      <div className="user-account">
        {signedIn ? (
          <button
            className="profile-button"
            onClick={() => setSignedIn(!signedIn)}
          >
            <FaUserCircle
              className="profile-icon"
              size="2.5rem"
              color="#0f4c75"
            />
          </button>
        ) : (
          <button
            style={{
              whiteSpace: "nowrap",
            }}
            className="button sign-in-button disabled"
            onClick={() => setSignedIn(!signedIn)}
          >
            Sign In
          </button>
        )}
      </div>
    </Container>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
