import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import cn from "classnames"

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

  opacity: 0;
  transition: opacity 150ms ease; // transition time needs to be the same as timeout time on line 58

  &.open {
    opacity: 1;
  }
`

const Modal = ({ children, isOpen }) => {
  const [isFullyOpen, setFullyOpen] = useState(false)
  const [delayClose, setDelayClose] = useState(false)

  useEffect(() => {
    if (isOpen) {
      currentScrollY = window.scrollY

      document.getElementById(
        "___gatsby"
      ).style.marginTop = `-${window.scrollY}px`
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"

      setFullyOpen(true)
      setDelayClose(true)
    } else {
      document.getElementById("___gatsby").style.removeProperty("margin-top")
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("width")

      window.scrollTo(0, currentScrollY)

      setFullyOpen(false)
      var delayCloseTimer = setTimeout(() => {
        setDelayClose(false)
      }, 150) // timeout time needs to be the same as transition time on line 22
    }

    return () => {
      document.getElementById("___gatsby").style.removeProperty("margin-top")
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("width")
      clearInterval(delayCloseTimer)
    }
  }, [isOpen])

  return isOpen || delayClose
    ? createPortal(
        <Container className={cn({ open: isFullyOpen })}>{children}</Container>,
        document.body
      )
    : null
}

export default Modal
