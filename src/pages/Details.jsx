import { Navbar, Sidebar, Table, Pagination, Search } from "../components"
import "../styles/Details.css"

const Details = () => {
  return (
    <div className="page-layout">
      <Navbar />
      <Sidebar activePage="details" />

      <div className="main-content">
        <div className="details-header">
          <div className="header-left">
            <h1>Details</h1>
          </div>
          <div className="search-wrapper">
            <Search />
          </div>
        </div>

        <div className="details-content">
          <Table />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Details

