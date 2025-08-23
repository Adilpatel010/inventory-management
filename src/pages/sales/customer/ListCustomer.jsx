import React, { useEffect, useState } from 'react'
import { deleteCustomerData, getCustomerData, getCustomerId, searchCustomerData, updateCustomerStatus } from '../../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'

const ListCustomer = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [noData, setNoData] = useState(false)
    const Navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)

    // get customer data
    const listCustomer = async (page = 1, size = pageSize) => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getCustomerData(page, size)
            // console.log(res)
            if (!res.data.data.data || res.data.data.data.length === 0) {
                setNoData(true)
                setData([])
                setTotalPages(1)
            } else {
                setTotalPages(res.data.data.totalPages || 1)
                setData(res.data.data.data)
                // console.log(res.data.data.data)
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
            const res = await updateCustomerStatus(id, status)
            listCustomer(pageNumber)
        } catch (err) {
            console.error(err)
            setError("Unable to update status.")
        }
    }

    // delete customer
    const handleDelete = async (id) => {
        const confirmData = window.confirm("Are you sure to delete this customer?")
        if (confirmData) {
            try {
                const res = await deleteCustomerData(id)
                listCustomer(pageNumber)
            } catch (err) {
                console.error(err)
                setError("Unable to delete customer.")
            }
        }
    }

    // update data to navigate 
    const handleUpdate = async (id) => {
        try {
            const res = await getCustomerId(id)
            console.log(res.data.data);
            setId(res.data.data)
            Navigate("/customer/add", { state: res.data.data })
        }
        catch (err) {
            console.log(err)
        }
    }
    
    // search customer
    const handleSearch = async (e) => {
        const value = e.target.value
        setSearch(value)

        if (value.trim() === "") {
            setPageNumber(1);
            listCustomer(1, pageSize)
            return
        }
        setLoading(true)
        setError("")
        setNoData(false)
        try {
            const res = await searchCustomerData(value)
            if (!res.data.data || res.data.data.length === 0) {
                setNoData(true)
                setData([])
                setTotalPages(1)
            } else {
                setData(res.data.data)
                setTotalPages(1)
            }
        } catch (err) {
            console.error("Search Error:", err)
            setError("Search failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Handle page click
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPageNumber(newPage)
        listCustomer(newPage)
    }

    // Change page size
    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value)
        setPageSize(newSize)
        setPageNumber(1)
        listCustomer(1, newSize)
    }

    useEffect(() => {
        listCustomer(pageNumber)
    }, [])

    return (
        <>
            <div className="container-fluid font">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
                            <h3 className='mt-2'>Customer List</h3>
                            <form className="d-flex" role="search" id="customer-search">
                                <input
                                    className="form-control shadow-none border-2 me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <i className="fa-solid fa-magnifying-glass" id='customer-search-icon'></i>
                            </form>
                            <NavLink to="/customer/add"><button className='btn-customer'>+ Add Customer</button></NavLink>
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
                                            <th>Customer Name</th>
                                            <th>Customer Type</th>
                                            <th>GST No</th>
                                            <th>Phone No</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((customer) => {
                                                return (
                                                    <tr key={customer.customerId}>
                                                        <td>{customer.customerName}</td>
                                                        <td>{customer.customerType}</td>
                                                        <td>{customer.gst}</td>
                                                        <td>{customer.phoneNo}</td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input onChange={() => changeStatus(customer.customerId, customer.status)} className="form-check-input" checked={customer.status == "ACTIVE"} type="checkbox" role="switch" />
                                                            </div>
                                                        </td>
                                                        <td className='tab'>
                                                            <i onClick={() => handleUpdate(customer.customerId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                            <i onClick={() => handleDelete(customer.customerId)} className="text-danger fa-solid fa-trash updel-icons"></i>
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
        </>
    )
}

export default ListCustomer
