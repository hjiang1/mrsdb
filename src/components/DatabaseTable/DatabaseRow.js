import React, { Fragment, useState, useEffect, createRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import cn from "classnames"

import SpectrumModal from "../SpectrumModal"

const Container = styled.tr`
  background-color: white;
  color: #1b262c;
  cursor: pointer;
  font-size: 14px;

  .table-cell {
    padding: 0.25rem 0.5rem;
    border: none;
    width: max-content;
    white-space: nowrap;
    border-right: 1px solid var(--primaryColor);

    :last-of-type {
      border-right: none;
    }

    &.alternate {
      background-color: #f5fbff;
    }

    &.first-cell {
      text-align: center;
    }
  }

  :hover {
    .table-cell {
      background-color: #d9f0ff;
    }
  }

  :focus {
    background-color: #d9f0ff;
    outline-color: var(--primaryColor);
  }
`

const DatabaseRow = ({ row, alternate, metadata }) => {
  const [isSpectrumOpen, setSpectrumOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const newModalData = {}

    metadata.types.forEach((type, i) => {
      if (type === "clinical") {
        if (!("clinical" in newModalData)) {
          newModalData["clinical"] = {}
        }

        newModalData.clinical[metadata.headers[i]] =
          row.values[metadata.accessors[i]]
      } else if (type === "metadata") {
        if (!("metadata" in newModalData)) {
          newModalData["metadata"] = {}
        }

        newModalData.metadata[metadata.headers[i]] =
          row.values[metadata.accessors[i]]
      }

      setModalData(newModalData)
    })
  }, [metadata, row.values])

  const closeSpectrumModal = () => {
    setSpectrumOpen(false)

    containerRef.current.focus()
  }

  const containerRef = createRef()

  return (
    <Fragment>
      <Container
        tabIndex={0}
        {...row.getRowProps()}
        onClick={() => {
          setSpectrumOpen(true)
        }}
        ref={containerRef}
      >
        {row.cells.map(cell => {
          return (
            <td
              className={cn("table-cell", { alternate })}
              {...cell.getCellProps()}
            >
              {cell.render("Cell")}
            </td>
          )
        })}
      </Container>
      <SpectrumModal
        isOpen={isSpectrumOpen}
        closeModal={closeSpectrumModal}
        data={modalData}
      />
    </Fragment>
  )
}

DatabaseRow.propTypes = {
  row: PropTypes.object.isRequired,
}

export default DatabaseRow
