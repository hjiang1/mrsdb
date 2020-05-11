/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SiteHeader from "../SiteHeader"
import SiteFooter from "../SiteFooter"
import GlobalStyle from "./GlobalStyle"
import "./layout.css"

const Container = styled.main`
  margin: 0 auto;
  min-height: calc(100vh - var(--headerHeight));
  display: flex;
`

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fragment>
      <GlobalStyle />
      <SiteHeader
        siteTitle={data.site.siteMetadata.title}
        pageTitle={pageTitle}
      />
      <Container>{children}</Container>
      <SiteFooter siteTitle={data.site.siteMetadata.title} />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
