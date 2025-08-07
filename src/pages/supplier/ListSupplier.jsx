import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { deleteSupplierData, getSupplierData, getSupplierId, searchSupplierData, updateSupplierStatus } from '../../api/apifetcher';

const ListSupplier = () => {

    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [noData, setNoData] = useState(false)
    const Navigate = useNavigate()

    // list supplier
    const listSupplier = async () => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getSupplierData()
            if (res.data.length === 0) {
                setNoData(true)
            } else {
                setData(res.data)
            }
        } catch (err) {
            console.error(err)
            setError("Server error occurred. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    // delete supplier
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this supplier")

        if (confirmDelete) {
            try {
                const res = await deleteSupplierData(id)
                listSupplier()
            } catch (err) {
                console.log("Delete error", err);
                setError("Unable to delete category.")
            }
        } else {
            console.log("Delete Canceled");

        }
    }
    // change status
    const changeStatus = async (id, status) => {
        try {
            const res = await updateSupplierStatus(id, status)
            console.log(status);
            listSupplier()
        }
        catch (err) {
            console.log(err);
            setError("Unable to update status.")
        }
    }

    // search supplier
    const handleSearch = async (e) => {
        const value = e.target.value
        setSearch(value)

        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await searchSupplierData(value)
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

    // update supplier to navigate
    const handleUpdate = async (id) => {
        try {
            const res = await getSupplierId(id)
            console.log(res.data)
            setId(res.data)
            Navigate("/supplier/add", { state: res.data })
        }
        catch (err) {
            console.log(err)
            setError("Unable to fetch category details.")
        }
    }

    useEffect(() => {
        listSupplier()
    }, [])

    return (
        <>
            <div className="container-fluid font">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
                            <h3 className='mt-2'>Supplier List</h3>
                            <form className="d-flex" role="search" id="warehouse-search">
                                <input
                                    className="form-control shadow-none border-2 me-2"
                                    type="search"
                                    id='supplier-search-in'
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <i className="fa-solid fa-magnifying-glass" id='supplier-search-icon'></i>
                            </form>
                            <NavLink to="/supplier/add"><button className='btn-supplier'>+ Add Supplier</button></NavLink>
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
                                    <thead className='table-secondary' style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                        <tr>
                                            <th>Shop Name </th>
                                            <th>GST No</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((sup) => {
                                                return (
                                                    <tr key={sup.supplierId}>
                                                        <td>{sup.supplierShopName}</td>
                                                        <td>{sup.supplierGstNo}</td>
                                                        <td>{sup.phoneNumber}</td>
                                                        <td>{sup.locationOrArea}</td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input onChange={() => changeStatus(sup.supplierId, sup.status)} className="form-check-input" checked={sup.status == "ACTIVE"} type="checkbox" role="switch" />
                                                            </div>
                                                        </td>
                                                        <td className='tab'>
                                                            <i onClick={() => handleUpdate(sup.supplierId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                            <i onClick={() => handleDelete(sup.supplierId)} className="text-danger fa-solid fa-trash updel-icons"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListSupplier
