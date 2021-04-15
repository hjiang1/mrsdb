import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import bwhLogo from "../images/bwh_logo.png"
import hmsLogo from "../images/hms_logo.png"

const Container = styled.footer`
  border-top: 1px solid var(--primaryColor);
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  padding: 5rem 10%;

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

    color: var(--primaryColor);

    .ccs {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .affiliations {
      margin-bottom: 0.5rem;
    }
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .logo {
      flex-grow: 0;

      &.bwh {
        height: 3rem;
        margin-bottom: 0.5rem;
      }

      &.hms {
        height: 2rem;
      }
    }
  }
`

const SiteFooter = () => (
  <Container>
    <div className="footer-content">
      <div className="ccs">Center for Clinical Spectroscopy</div>
      <div className="affiliations">
        Brigham and Women's Hospital and Harvard Medical School
      </div>
      <div>221 Longwood Ave, BLI-236B</div>
      <div>Boston, MA 02115, USA</div>
    </div>
    <div className="logo-container">
      <img
        className="logo bwh"
        src={bwhLogo}
        alt="Brigham and Women's Hospital Logo"
      />
      <img
        className="logo hms"
        src={hmsLogo}
        alt="Harvard Medical School Logo"
      />
    </div>
  </Container>
)

SiteFooter.propTypes = {
  siteTitle: PropTypes.string,
}

SiteFooter.defaultProps = {
  siteTitle: ``,
}

export default SiteFooter
