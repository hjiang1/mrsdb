import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

let currentScrollY

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;

  display: flex;
  justify-content: center;
  overflow: scroll;
`

const Modal = ({ children, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      currentScrollY = window.scrollY

      document.getElementById(
        "___gatsby"
      ).style.marginTop = `-${window.scrollY}px`
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.getElementById("___gatsby").style.removeProperty("margin-top")
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("width")

      window.scrollTo(0, currentScrollY)
    }

    return () => {
      document.getElementById("___gatsby").style.removeProperty("margin-top")
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("width")
    }
  }, [isOpen])

  return isOpen
    ? createPortal(<Container>{children}</Container>, document.body)
    : null
}

export default Modal
