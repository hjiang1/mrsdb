// Gatsby supports TypeScript natively!
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import FiltersModal from "../components/FiltersModal"
import data from "../components/DatabaseTable/mockData"
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
  const [view, setView] = useState("datasets")
  const [filters, setFilters] = useState(defaultFilters)
  const [filteredItems, setFilteredItems] = useState([])
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  // Filter rows when filters change
  useEffect(() => {
    let newFilteredItems = [...data.data]

    // Iterate through and run each filter
    Object.keys(filters).forEach(filterName => {
      newFilteredItems = filterFunctions[filterName](
        newFilteredItems,
        filters[filterName]
      )
    })

    setFilteredItems(newFilteredItems)
  }, [filters])

  // Shallow copy to trigger re-render
  const filteredData = Object.assign({}, data)
  filteredData.items = filteredItems

  // Check if table filters match default filters
  const filtersMatchDefault =
    JSON.stringify(defaultFilters) === JSON.stringify(filters)

  return (
    <Layout pageTitle="Database">
      <Seo title="Database" />
      <Container>
        {view === "datasets" ? (
          <DatasetList setView={setView} />
        ) : (
          <DatabaseContent
            data={data}
            filteredItems={filteredItems}
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
