import React, { useState, Fragment } from "react"
import styled from "styled-components"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import cn from "classnames"

import Modal from "../Modal"
import SpectrumModalHeader from "./SpectrumModalHeader"

import spectrumSeries from "./spectrums"

const Container = styled.div`
  width: 100%;

  .modal-content {
    display: flex;
    flex-direction: row;
    margin: 2rem 5rem;
    justify-content: space-between;

    .metadata-widget {
      .metadata-type {
        color: var(--primaryColor);
        font-weight: bold;
        font-size: 1.5rem;
      }

      .metadata-list {
        padding-left: 1.5rem;

        .metadata-item {
          list-style-type: none;
          margin: 0.5rem 0;

          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;

          .item-label {
            color: var(--primaryColor);
            font-weight: bold;
            margin-right: 0.25rem;
          }
        }
      }
    }

    .spectrum-widget {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      align-self: center;
    }

    .spectrum-container {
      position: relative;
      border: 2px solid var(--primaryColor);

      .spectrum-image {
        display: none;

        &.active {
          display: initial;
        }
      }
    }

    .counter {
      position: absolute;
      top: 0;
      right: 0;
      margin: 1.5rem 3rem;

      color: var(--primaryColor);
      font-weight: bold;
      font-size: 1.5rem;
    }

    .page-button {
      margin: 1rem;
      height: 10rem;
      background-color: var(--primaryColor);

      svg {
        color: white;
      }

      :disabled {
        background-color: darkgray;

        cursor: default;
      }
    }
  }
`

const SpectrumModal = ({ isOpen, closeModal, data }) => {
  const [spectrumIndex, setSpectrumIndex] = useState(0)

  const maxSpectrumIndex = spectrumSeries.length - 1

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <SpectrumModalHeader closeModal={closeModal} />
        <div className="modal-content">
          <div className="metadata-widget">
            {"clinical" in data && (
              <Fragment>
                <div className="metadata-type">Clinical Info</div>
                <ul className="metadata-list">
                  {Object.keys(data.clinical).map((key, i) => (
                    <li key={i} className="metadata-item">
                      <div className="item-label">{`${key}:`}</div>
                      <div className="item-value">{data.clinical[key]}</div>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
            {"metadata" in data && (
              <Fragment>
                <div className="metadata-type">Scan Metadata</div>
                <ul className="metadata-list">
                  {Object.keys(data.metadata).map((key, i) => (
                    <li key={i} className="metadata-item">
                      <div className="item-label">{`${key}:`}</div>
                      <div className="item-value">{data.metadata[key]}</div>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
          </div>
          <div className="spectrum-widget">
            <button
              className="page-button"
              disabled={spectrumIndex === 0}
              onClick={() => setSpectrumIndex(spectrumIndex - 1)}
            >
              <FaAngleLeft size="2.5rem" />
            </button>
            <div className="spectrum-container">
              {spectrumSeries.map((spectrum, i) => (
                <img
                  key={i}
                  className={cn("spectrum-image", {
                    active: i === spectrumIndex,
                  })}
                  src={spectrum}
                  alt="spectrum"
                />
              ))}
              <div className="counter">{`${spectrumIndex + 1}/${
                maxSpectrumIndex + 1
              }`}</div>
            </div>
            <button
              className="page-button"
              disabled={spectrumIndex === maxSpectrumIndex}
              onClick={() => setSpectrumIndex(spectrumIndex + 1)}
            >
              <FaAngleRight size="2.5rem" />
            </button>
          </div>
        </div>
      </Container>
    </Modal>
  )
}

export default SpectrumModal
