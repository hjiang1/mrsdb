import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import { FaUserCircle } from "react-icons/fa"

const Container = styled.header`
  background-color: white;
  height: var(--headerHeight);
  display: flex;
  align-items: center;
  justify-content: space-between;

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

  .header-content {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    padding: 0 2rem;
    height: 100%;
    border-bottom: 1px solid lightgray;
  }

  .page-title {
    margin: 0;
    color: var(--primaryColor);
    font-size: 1.75rem;
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
  const [signedIn, setSignedIn] = useState(false)

  return (
    <Container>
      <h1 className="header-name">
        <Link to="/" className="title-link">
          <span className="title-text">{siteTitle}</span>
        </Link>
      </h1>
      <div className="header-content">
        <h1 className="page-title">{pageTitle}</h1>
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
              className="button sign-in-button disabled"
              onClick={() => setSignedIn(!signedIn)}
              disabled
            >
              Sign In
            </button>
          )}
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
