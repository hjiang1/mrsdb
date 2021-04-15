import React, { Fragment, useState, createRef } from "react"
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

const DatabaseRow = ({ row, alternate }) => {
  const [isSpectrumOpen, setSpectrumOpen] = useState(false)

  const modalData = {
    pid: row.cells[1].value,
    sex: row.cells[2].value,
    age: row.cells[3].value,
    height: row.cells[4].value,
    weight: row.cells[5].value,
    sport: row.cells[6].value,
    group: row.cells[7].value,
    date: row.cells[8].value,
    site: row.cells[9].value,
    vendor: row.cells[10].value,
    software: row.cells[11].value,
    voxel_type: row.cells[12].value,
    brain_location: row.cells[13].value,
    TE: row.cells[14].value,
    TR: row.cells[15].value,
  }

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
