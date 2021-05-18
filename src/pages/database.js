// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import FiltersModal from "../components/FiltersModal"
import DatasetList from "../components/DatabasePage/DatasetList"
import DatabaseContent from "../components/DatabasePage/DatabaseContent"

import api from "../api"
import filterFunctions, {
  parseFiltersFromApi,
} from "../components/FiltersModal/filterFunctions"

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

const Database = () => {
  // From API
  const [datasetList, setDatasetList] = useState(null)
  const [data, setData] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [datasetFilters, setDatasetFilters] = useState(null)

  const [view, setView] = useState("datasets")
  const [filteredData, setFilteredData] = useState(null)
  const [defaultFilters, setDefaultFilters] = useState(null)
  const [activeFilters, setActiveFilters] = useState(null)
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  useEffect(() => {
    if (datasetFilters) {
      const parsedFilters = parseFiltersFromApi(datasetFilters)

      setDefaultFilters(parsedFilters)
      setActiveFilters(parsedFilters)
    }
  }, [datasetFilters])

  useEffect(() => {
    if (view === "datasets") {
      setData(null)
      setDatasetFilters(null)
      setActiveFilters(null)
    } else {
      api.getDataset(view, setData, () => setData("Error"))
      api.getDatasetFilters(view, setDatasetFilters, () =>
        setDatasetFilters("Error")
      )
    }
  }, [view])

  // Filter rows when filters change
  useEffect(() => {
    if (activeFilters && data && datasetFilters) {
      let newFilteredData = data

      datasetFilters.forEach(filterMetadata => {
        newFilteredData = filterFunctions[filterMetadata.type](
          filterMetadata,
          newFilteredData,
          activeFilters[filterMetadata.accessor]
        )
      })

      setFilteredData(newFilteredData)
    }
  }, [activeFilters, data, datasetFilters])

  // Check if table filters match default filters
  const filtersMatchDefault =
    JSON.stringify(defaultFilters) === JSON.stringify(activeFilters)

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
            defaultFilters={defaultFilters}
            filtersMatchDefault={filtersMatchDefault}
            setFilterModalOpen={setFilterModalOpen}
            setView={setView}
          />
        )}
      </Container>
      <FiltersModal
        isOpen={isFilterModalOpen}
        setOpen={setFilterModalOpen}
        datasetFilters={datasetFilters}
        activeFilters={activeFilters}
        defaultFilters={defaultFilters}
        setFilters={setActiveFilters}
      />
    </Layout>
  )
}

export default Database
