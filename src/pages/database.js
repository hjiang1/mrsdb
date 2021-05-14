// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import FiltersModal from "../components/FiltersModal"
import DatasetList from "../components/DatabasePage/DatasetList"
import DatabaseContent from "../components/DatabasePage/DatabaseContent"

import {
  defaultFilters,
  filterFunctions,
} from "../components/FiltersModal/filters"

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

const Database = () => {
  const [datasetList, setDatasetList] = useState(null)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [metadata, setMetadata] = useState(null)
  const [view, setView] = useState("datasets")
  const [filters, setFilters] = useState(defaultFilters)
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  useEffect(() => {
    if (view !== "datasets") {
      fetch(`https://mrsdb.bwh.harvard.edu/datasets/${view}`, {
        method: "GET",
      })
        .then(res => {
          res.json().then(data => {
            setData(data)
          })
        })
        .catch(error => {
          setData("Error")
        })
    }
  }, [view])

  // Filter rows when filters change
  useEffect(() => {
    console.log("applying filters")
    let newFilteredData = data

    // Iterate through and run each filter
    Object.keys(filters).forEach(filterName => {
      newFilteredData = filterFunctions[filterName](
        newFilteredData,
        filters[filterName]
      )
    })

    setFilteredData(newFilteredData)
  }, [filters, data])

  // Check if table filters match default filters
  const filtersMatchDefault =
    JSON.stringify(defaultFilters) === JSON.stringify(filters)

  return (
    <Layout pageTitle="Database">
      <Seo title="Database" />
      <Container>
        {view === "datasets" ? (
          <DatasetList
            datasetList={datasetList}
            setDatasetList={setDatasetList}
            setView={setView}
            setMetadata={setMetadata}
          />
        ) : (
          <DatabaseContent
            data={filteredData}
            metadata={metadata}
            filtersMatchDefault={filtersMatchDefault}
            setFilterModalOpen={setFilterModalOpen}
            setView={setView}
          />
        )}
      </Container>
      <FiltersModal
        isOpen={isFilterModalOpen}
        setOpen={setFilterModalOpen}
        filters={filters}
        setFilters={setFilters}
        defaultFilters={defaultFilters}
      />
    </Layout>
  )
}

export default Database
