"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../services/dataService"
import { DataContext } from "./contexts/DataContext"

export function DataProvider({ children }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5) // Changed from 10 to 5

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchData()
        setData(result)
        setError("")
      } catch (err) {
        setError("Failed to fetch data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get sorted and filtered data
  const getSortedData = () => {
    let sortableData = [...data]

    // Filter data based on search term
    if (searchTerm) {
      sortableData = sortableData.filter((item) =>
        Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort data
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return sortableData
  }

  // Get paginated data
  const getPaginatedData = () => {
    const sortedData = getSortedData()
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }

  // Get total pages
  const getTotalPages = () => {
    return Math.ceil(getSortedData().length / itemsPerPage)
  }

  const value = {
    data: getPaginatedData(),
    allData: getSortedData(),
    loading,
    error,
    sortConfig,
    requestSort,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages: getTotalPages(),
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

