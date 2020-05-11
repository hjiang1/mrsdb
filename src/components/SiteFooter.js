import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Container = styled.footer`
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
  }
`

const SiteFooter = () => (
  <Container>
    <div className="footer-content">
      <span>Center for Clinical Spectroscopy</span>
      <span>Brigham and Women's Hospital</span>
      <span>2020</span>
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
