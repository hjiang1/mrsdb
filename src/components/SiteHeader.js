import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import { FaUserCircle, FaBars } from "react-icons/fa"
import cn from "classnames"

import logo from "../images/mrsdb-logo.png"

const Container = styled.header`
  .header-bar {
    display: flex;
    flex-direction: row;

    background-color: white;
    height: var(--headerHeight);
    align-items: center;
    /* justify-content: space-between; */

    border-bottom: 1px solid lightgray;

    @media screen and (max-width: 768px) {
      /* grid-template-columns: auto repeat(7, min-content); */
    }

    .header-name {
      margin: 0;
      height: 100%;

      justify-content: center;
      background-color: #0f4c75;

      .title-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;

        padding: 0 1rem;

        height: 100%;

        .mrsdb-logo {
          height: 2.5rem;
          width: 2.5rem;
          margin: 0;
        }

        .title-text {
          margin-left: 1rem;
          color: white;
          font-weight: bold;

          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }

    .page-title {
      margin: 0;
      color: var(--primaryColor);
      font-size: 1.5rem;
      margin-left: 1rem;

      display: none;

      @media screen and (max-width: 768px) {
        display: initial;
      }

      @media screen and (max-width: 480px) {
        font-size: 1.25rem;
      }
    }

    .header-content {
      height: 100%;
      flex-grow: 1;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .nav-button {
        display: flex;
        align-items: center;
        color: var(--primaryColor);
        white-space: nowrap;
        height: 100%;
        padding: 0 1rem;

        font-size: 16px;
        text-decoration: none;

        @media screen and (max-width: 768px) {
          display: none;
        }

        &.current {
          border-bottom: 2px solid var(--primaryColor);
          background-color: #d9f0ff;
        }

        :hover {
          background-color: #d9f0ff;
        }
      }

      .user-account {
        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 1rem;

        .profile-icon {
          height: 2.5rem;
          width: 2.5rem;
        }

        .profile-button {
          cursor: pointer;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          padding: 0;
        }
      }

      .dropdown-menu {
        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 1rem;

        display: none;

        @media screen and (max-width: 768px) {
          display: initial;
        }

        .dropdown-menu-icon {
          height: 2.5rem;
          width: 2.5rem;
        }

        .dropdown-menu-button {
          cursor: pointer;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          padding: 0;
        }
      }
    }
  }

  .dropdown-menu-container {
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 100;

    .dropdown-menu-content {
      display: flex;
      flex-direction: column;

      transform-origin: top;
      transform: scaleY(0);
      transition: transform 0.1s ease;

      &.open {
        transform: scaleY(1);
      }

      .nav-button {
        width: 100%;
        height: 5rem;

        background-color: white;
        border-bottom: 1px solid var(--primaryColor);

        display: flex;
        align-items: center;
        color: var(--primaryColor);
        white-space: nowrap;
        padding: 0 1rem;

        font-size: 16px;
        text-decoration: none;

        &.current {
          font-weight: bold;
          text-decoration: underline;
          background-color: #d9f0ff;
        }

        :hover {
          background-color: #d9f0ff;
        }
      }
    }
  }
`

const Header = ({ siteTitle, pageTitle }) => {
  const [signedIn, setSignedIn] = useState(true)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <Container>
      <div className="header-bar">
        <h1 className="header-name">
          <Link to="/" className="title-link">
            <img className="mrsdb-logo" src={logo} alt="MRSDB Logo" />
            <span className="title-text">{siteTitle}</span>
          </Link>
        </h1>
        <h1 className="page-title">{pageTitle}</h1>
        <div className="header-content">
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
          <div className="dropdown-menu">
            <button
              className="dropdown-menu-button"
              onClick={() => {
                setDropdownOpen(!isDropdownOpen)
              }}
            >
              <FaBars
                className="dropdown-menu-icon"
                size="2.5rem"
                color="#0f4c75"
              />
            </button>
          </div>
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
        </div>
      </div>
      <div className="dropdown-menu-container">
        <div className={cn("dropdown-menu-content", { open: isDropdownOpen })}>
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
        </div>
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
