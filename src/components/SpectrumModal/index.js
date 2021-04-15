import React, { useState } from "react"
import styled from "styled-components"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

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
    }

    .spectrum {
      position: absolute;
      top: 0;
      left: 0;
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
            <div className="metadata-type">Participant Info</div>
            <ul className="metadata-list">
              <li className="metadata-item">
                <div className="item-label">ID:</div>
                <div className="item-value">{data.pid}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Age:</div>
                <div className="item-value">{data.age}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Sex:</div>
                <div className="item-value">{data.sex}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Height:</div>
                <div className="item-value">{data.height}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Weight:</div>
                <div className="item-value">{data.weight}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Sport:</div>
                <div className="item-value">{data.sport}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Group:</div>
                <div className="item-value">{data.group}</div>
              </li>
            </ul>
            <div className="metadata-type">Scan Info</div>
            <ul className="metadata-list">
              <li className="metadata-item">
                <div className="item-label">Scan Date:</div>
                <div className="item-value">{data.date}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Scan Site:</div>
                <div className="item-value">{data.site}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Scanner Vendor:</div>
                <div className="item-value">{data.vendor}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Scanner Software:</div>
                <div className="item-value">{data.software}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Sequence Type:</div>
                <div className="item-value">{data.voxel_type}</div>
              </li>
              <li className="metadata-item">
                <div className="item-label">Brain Location:</div>
                <div className="item-value">{data.brain_location}</div>
              </li>
              <li className="metadata-item">
                {" "}
                <div className="item-label">TE:</div>
                <div className="item-value">{data.TE}</div>
              </li>
              <li className="metadata-item">
                {" "}
                <div className="item-label">TR:</div>
                <div className="item-value">{data.TR}</div>
              </li>
            </ul>
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
              <img
                className="spectrum-image"
                src={spectrumSeries[spectrumIndex]}
                alt="spectrum"
              />
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
