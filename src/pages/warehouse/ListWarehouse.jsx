import React, { useEffect, useState } from 'react'
import { deleteWarehouseData, getWarehouseData, updateWarehouseStatus, searchWarehouseData, getWarehouseId } from '../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'
import Swal from 'sweetalert2';

const ListWarehouse = () => {

    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [noData, setNoData] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)


    // list warehouse
    const listWarehouse = async (page = 1, size = pageSize) => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getWarehouseData(page, size)
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

    // change status warehouse
    const changeStatus = async (id, status) => {
        console.log(id, status)
        try {
            const res = await updateWarehouseStatus(id, status)
            listWarehouse(pageNumber)
        } catch (err) {
            console.error(err)
            setError("Unable to update status.")
        }
    }

    // Delete warehouse
    // const handleDelete = async (id) => {
    //     const confirmDelete = window.confirm("Are you sure to delete this warehouse")

    //     if (confirmDelete) {
    //         try {
    //             const res = await deleteWarehouseData(id)
    //             listWarehouse()
    //         } catch (err) {
    //             console.log("Delete err", err);
    //             setError("Unable to delete category.")
    //         }
    //     } else {
    //         console.log("Delete Canceled");
    //     }
    // }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to delete this warehouse!",
            icon: "warning",
            width: '350px',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteWarehouseData(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "The warehouse has been deleted.",
                        icon: "success",
                        width: "350px"
                    });
                    listWarehouse(pageNumber);
                } catch (err) {
                    console.error("Delete error:", err);
                    setError("Unable to delete warehouse.");
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the warehouse.",
                        icon: "error"
                    });
                }
            } else {
                console.log("Delete canceled by user");
            }
        });
    };

    // search warehouse
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            setPageNumber(1);
            listWarehouse(1, pageSize)
            return;
        }
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await searchWarehouseData(value)
            if (!res.data || res.data.length === 0) {
                setNoData(true)
                setData([])
                setTotalPages(1)
            } else {
                setData(res.data)
                setPageNumber(1)
            }
        } catch (err) {
            console.error("Search Error:", err)
            setError("Search failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // update warehouse navigate to add
    const handleUpdate = async (id) => {
        try {
            const res = await getWarehouseId(id)
            console.log(res.data);
            setId(res.data)
            navigate("/warehouse/add", { state: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    // Handle page click
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPageNumber(newPage)
        listWarehouse(newPage)
    }

    // Change page size
    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value)
        setPageSize(newSize)
        setPageNumber(1)
        listWarehouse(1, newSize)
    }

    useEffect(() => {
        listWarehouse();
    }, [])

    return (
        <>
            <div className="container-fluid font" style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>

                            <h3 className='mt-2'>Warehouse List</h3>
                            <form className="d-flex" role="search" id="warehouse-search">
                                <input
                                    className="form-control shadow-none border-2 me-2"
                                    type="search"
                                    id='warehouse-search-in'
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <i className="fa-solid fa-magnifying-glass" id='warehouse-search-icon'></i>
                            </form>
                            <NavLink to="/warehouse/add"><button className='btn-warehouse'>+ Add Warehouse</button></NavLink>
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
                                            <th>Organization Name </th>
                                            <th>Owner Name </th>
                                            <th>Location </th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Type </th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((elm) => {
                                                return (
                                                    <tr key={elm.wareHouseId}>
                                                        <td>{elm.organizationId}</td>
                                                        <td>{elm.organizationName}</td>
                                                        <td>{elm.ownerName}</td>
                                                        <td>{elm.locationOrArea}</td>
                                                        <td>{elm.title}</td>
                                                        <td>{elm.description}</td>
                                                        <td>{elm.type}</td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input onChange={() => changeStatus(elm.wareHouseId, elm.status)} className="form-check-input" checked={elm.status == "ACTIVE"} type="checkbox" role="switch" />
                                                            </div>
                                                        </td>
                                                        <td className='tab'>
                                                            <i onClick={() => (handleUpdate(elm.wareHouseId))} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                            <i onClick={() => handleDelete(elm.wareHouseId)} className="text-danger fa-solid fa-trash updel-icons"></i>
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
        </>
    )
}

export default ListWarehouse