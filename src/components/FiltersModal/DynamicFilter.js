import React from "react"
import RangeFilter from "./RangeFilter"
import CheckboxFilter from "./CheckboxFilter"

const DynamicFilter = ({
  filterMetadata,
  loadedFilters,
  defaultFilters,
  setFilterSettings,
  showUncategorized,
}) => {
  switch (filterMetadata.type) {
    case "checkbox":
      return (
        <CheckboxFilter
          accessor={filterMetadata.accessor}
          name={filterMetadata.name}
          description={filterMetadata.description}
          filters={loadedFilters}
          defaultFilters={defaultFilters}
          setFilterSettings={setFilterSettings}
          showUncategorized={showUncategorized}
        />
      )
    case "range":
      return (
        <RangeFilter
          accessor={filterMetadata.accessor}
          name={filterMetadata.name}
          description={filterMetadata.description}
          filters={loadedFilters}
          unit={filterMetadata.unit}
          defaultFilters={defaultFilters}
          setFilterSettings={setFilterSettings}
          showUncategorized={showUncategorized}
        />
      )
    default:
      return null
  }
}

export default DynamicFilter
