import React, { useEffect, useState } from 'react'
import {
    deleteCategoryData,
    getCategoryData,
    getCategoryId,
    searchCategoryData,
    updateCategoryStatus
} from '../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'

const ListCategory = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [noData, setNoData] = useState(false)
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)

    // List Category
    const listCategory = async (page = 1, size = pageSize) => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getCategoryData(page, size)
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

    // Change Status
    const changeStatus = async (id, status) => {
        try {
            await updateCategoryStatus(id, status)
            listCategory(pageNumber)
        } catch (err) {
            console.error(err)
            setError("Unable to update status.")
        }
    }

    // Delete Category
    const handleDelete = async (id) => {
        const confirmData = window.confirm("Are you sure to delete this category?")
        if (confirmData) {
            try {
                await deleteCategoryData(id)
                listCategory(pageNumber)
            } catch (err) {
                console.error(err)
                setError("Unable to delete category.")
            }
        }
    }

    // Search Category
    const handleSearch = async (e) => {
        const value = e.target.value
        setSearch(value)

        if (value.trim() === "") {
            listCategory(pageNumber)
            return
        }
        setLoading(true)
        setError("")
        setNoData(false)
        try {
            const res = await searchCategoryData(value)
            if (!res.data || res.data.length === 0) {
                setNoData(true)
                setData([])
                setTotalPages(1)
            } else {
                setData(res.data)
                setTotalPages(1)
            }
        } catch (err) {
            console.error("Search Error:", err)
            setError("Search failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Update Category to navigate
    const handleUpdate = async (id) => {
        try {
            const res = await getCategoryId(id)
            setId(res.data)
            navigate('/category/add', { state: res.data })
        } catch (err) {
            console.error(err)
            setError("Unable to fetch category details.")
        }
    }

    // Handle page click
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPageNumber(newPage)
        listCategory(newPage)
    }

    // Change page size
    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value)
        setPageSize(newSize)
        setPageNumber(1)
        listCategory(1, newSize)
    }
    useEffect(() => {
        listCategory(pageNumber)
    }, [])

    return (
        <div className="container-fluid font">
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
                        <h3 className='mt-2'>Category List</h3>
                        <form className="d-flex" role="search" id="category-search">
                            <input
                                className="form-control shadow-none border-2 me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={handleSearch}
                            />
                            <i className="fa-solid fa-magnifying-glass" id='category-search-icon'></i>
                        </form>
                        <NavLink to="/category/add"><button className='btn-category'>+ Add Category</button></NavLink>
                    </nav>

                    <div className='col-lg-12' style={{ overflowX: "auto" }}>
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
                                <thead className='table-secondary'>
                                    <tr>
                                        <th>Organization ID</th>
                                        <th>Parent Category ID</th>
                                        <th>Category Name</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.organizationId}</td>
                                            <td>{category.parentCategoryId}</td>
                                            <td>{category.categoryName}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <div className="form-check form-switch">
                                                    <input
                                                        onChange={() => changeStatus(category.id, category.status)}
                                                        checked={category.status === "ACTIVE"}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                    />
                                                </div>
                                            </td>
                                            <td className='tab'>
                                                <i onClick={() => handleUpdate(category.id)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                <i onClick={() => handleDelete(category.id)} className="text-danger fa-solid fa-trash updel-icons"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Pagination */}
                    {!search && totalPages >= 1 && (
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
    )
}

export default ListCategory
