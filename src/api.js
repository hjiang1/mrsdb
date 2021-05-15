export const getDataset = (dataset, onSuccess, onFailure) => {
  fetch(`https://mrsdb.bwh.harvard.edu/datasets/${dataset}`, {
    method: "GET",
  })
    .then(res => {
      res.json().then(data => {
        onSuccess(data)
      })
    })
    .catch(error => {
      onFailure(error)
    })
}

export const getDatasetFilters = (dataset, onSuccess, onFailure) => {
  fetch(`https://mrsdb.bwh.harvard.edu/table-filters/${dataset}`, {
    method: "GET",
  })
    .then(res => {
      res.json().then(data => {
        onSuccess(data)
      })
    })
    .catch(error => {
      onFailure(error)
    })
}

const api = { getDataset, getDatasetFilters }

export default api
