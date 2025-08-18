import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { deleteUserData, getUserData, getUserId, searchUserData, updateUserStatus } from '../../api/apifetcher'

const ListUser = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [noData, setNoData] = useState(false)
  const Navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)


  // list user 
  const listUser = async (page = 1, size = pageSize) => {
    setLoading(true)
    setError("")
    setNoData(false)

    try {
      const res = await getUserData(page, size)
      if (!res.data.data || res.data.data.length === 0) {
        setNoData(true)
        setData([])
        setTotalPages(1)
      } else {
        setData(res.data.data)
        setTotalPages(res.data.totalPages || 1)
      }
    } catch (err) {
      console.error(err)
      setError("Server error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // change status
  const changeStatus = async (id, status) => {
    try {
      const res = updateUserStatus(id, status)
      console.log(status);
      listUser(pageNumber)
    } catch (err) {
      console.log("Error", err)
      setError("Unable to update status.")
    }
  }

  // search user
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value)

    if (value.trim() == "") {
      listUser()
      return;
    }
    setLoading(true)
    setError("")
    setNoData(false)

    try {
      const res = await searchUserData(value)
      if (res.data.length === 0) {
        setNoData(true)
        setData([])
      } else {
        setData(res.data)
      }
    } catch (err) {
      console.error("Search Error:", err)
      setError("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Delete user
  const handleDelete = async (id) => {
    const confirmData = window.confirm("Are you sure to delete this user")
    if (confirmData) {
      try {
        const res = await deleteUserData(id)
        listUser(pageNumber)
      } catch (err) {
        console.log("Error", err)
        setError("Unable to delete category.")
      }
    }
  }

  // update data to navigate
  const handleUpdate = async (id) => {
    try {
      const res = await getUserId(id)
      console.log(res.data);
      setId(res.data)
      Navigate("/user/add", { state: res.data })
    }
    catch (err) {
      console.log(err)
      setError("Unable to fetch category details.")
    }
  }

  // Handle page click
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPageNumber(newPage)
    listUser(newPage)
  }

  // Change page size
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value)
    setPageSize(newSize)
    setPageNumber(1)
    listUser(1, newSize)
  }

  useEffect(() => {
    listUser(pageNumber)
  }, [])

  return (
    <div>
      <div className="container-fluid font" style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>

              <h3 className='mt-2'>User List</h3>
              <form className="d-flex" role="search" id="user-search">
                <input
                  className="form-control shadow-none border-2 me-2"
                  type="search"
                  id='user-search-in'
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={handleSearch}
                />
                <i className="fa-solid fa-magnifying-glass" id='user-search-icon'></i>
              </form>
              <NavLink to="/user/add"><button className='btn-user'>+ Add User</button></NavLink>
            </nav>
            <div className='col-lg-12' id='list-scroll'>
              {loading && (
                <div className="text-center p-3">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {error && <p className="text-danger text-center p-3">{error}</p>}
              {noData && !loading && !error && <p className="text-center p-3">No Data Found</p>}

              {!loading && !error && !noData && (
                <table className="table table-bordered">
                  <thead className='table-secondary' style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <tr>
                      <th>Organization ID</th>
                      <th>Full Name </th>
                      <th>Mobile Number</th>
                      <th>Password</th>
                      <th>Email </th>
                      <th>Profile Picture</th>
                      <th>Dapartment</th>
                      <th>Role</th>
                      <th>Gender</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((user) => {
                        return (
                          <tr key={user.userId}>
                            <td>{user.organizationId}</td>
                            <td>{user.fullName}</td>
                            <td>{user.mobileNumber}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.profilePicture}</td>
                            <td>{user.department}</td>
                            <td>{user.role}</td>
                            <td>{user.gender}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input onChange={() => changeStatus(user.userId, user.status)} className="form-check-input" checked={user.status == "ACTIVE"} type="checkbox" role="switch" />
                              </div>
                            </td>
                            <td className='tab'>
                              <i onClick={() => handleUpdate(user.userId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                              <i onClick={() => handleDelete(user.userId)} className="text-danger fa-solid fa-trash updel-icons"></i>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              )}
            </div>
            {/* Pagination */}
            {!search && (
              <div className="d-flex justify-content-between align-items-center mt-4 mb-5">
                {/* Page size selector */}
                <div>
                  <label className="me-2">Show</label>
                  <select value={pageSize} onChange={handlePageSizeChange} className="form-select d-inline-block w-auto">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <span className="ms-2">entries</span>
                </div>

                {/* Page numbers center */}
                <nav>
                  <ul className="pagination mb-0 justify-content-center">
                    {pageNumber > 2 && (
                      <>
                        <li className={`page-item ${pageNumber === 1 ? "active" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                          >
                            1
                          </button>
                        </li>
                        {pageNumber > 3 && (
                          <li className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        )}
                      </>
                    )}

                    {/* Middle Pages */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        num =>
                          num === pageNumber || // current
                          num === pageNumber - 1 || // prev
                          num === pageNumber + 1 // next
                      )
                      .map(num => (
                        <li
                          key={num}
                          className={`page-item ${pageNumber === num ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(num)}
                          >
                            {num}
                          </button>
                        </li>
                      ))}

                    {/* Last Page */}
                    {pageNumber < totalPages - 1 && (
                      <>
                        {pageNumber < totalPages - 2 && (
                          <li className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        )}
                        <li className={`page-item ${pageNumber === totalPages ? "active" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>

                {/* Prev / Next right side */}
                <div>
                  <button
                    className="btn btn-outline-primary me-2"
                    disabled={pageNumber === 1}
                    onClick={() => handlePageChange(pageNumber - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    disabled={pageNumber === totalPages}
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListUser
