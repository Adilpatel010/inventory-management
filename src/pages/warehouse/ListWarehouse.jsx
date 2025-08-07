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

    // list warehouse
    const listWarehouse = async () => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getWarehouseData()
            if (res.data.length === 0) {
                setNoData(true)
            } else {
                setData(res.data)
                console.log(res.data)
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
            listWarehouse()
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
                    listWarehouse();
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
            listWarehouse();
            return;
        }
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await searchWarehouseData(value);
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
    };
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
                                            <th>Organization ID</th>
                                            <th>Organization Name </th>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListWarehouse

