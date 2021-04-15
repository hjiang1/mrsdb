import React, { Fragment } from "react"
import GlobalStyle from "./src/components/Layout/GlobalStyle"

export const wrapPageElement = ({ element }) => {
  return (
    <Fragment>
      <GlobalStyle />
      {element}
    </Fragment>
  )
}
