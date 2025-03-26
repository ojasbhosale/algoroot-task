"use client"
import { useData } from "../context/hooks/useData"
import "../styles/Table.css"

const Table = () => {
  const { data, loading, error, sortConfig, requestSort } = useData()

  if (loading) {
    return <div className="table-loading">Loading data...</div>
  }

  if (error) {
    return <div className="table-error">{error}</div>
  }

  if (data.length === 0) {
    return <div className="table-empty">No data found</div>
  }

  // Get all column keys from the first data item
  const columns = Object.keys(data[0]).filter((key) => key !== "id")

  // Function to get the sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓"
    }
    return ""
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => requestSort(column)}
                className={sortConfig.key === column ? "sorted" : ""}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
                {getSortDirectionIndicator(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {columns.map((column) => (
                <td key={`${item.id}-${column}`}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table

