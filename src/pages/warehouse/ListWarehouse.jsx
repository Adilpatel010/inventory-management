import React, { useEffect, useState } from 'react'
import { deleteWarehouseData, getWarehouseData, updateWarehouseStatus, searchWarehouseData, getWarehouseId } from '../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'

const ListWarehouse = () => {

    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // list data 
    const listData = async () => {
        try {
            const res = await getWarehouseData()
            setData(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    // search warehouse
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            listData();
            return;
        }
        try {
            const res = await searchWarehouseData(value);
            setData(res.data);
        } catch (err) {
            console.log("Search Error:", err);
        }
    };

    // change status
    const changeStatus = async (id, status) => {
        try {
            const res = await updateWarehouseStatus(id, status)
            console.log(status);
            listData()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        listData();
    }, [])

    // delete data 
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this warehouse")

        if (confirmDelete) {
            try {
                const res = await deleteWarehouseData(id)
                listData()
            } catch (err) {
                console.log("Delete err", err);
            }
        } else {
            console.log("Delete Canceled");
        }
    }

    // update data navigate to add
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

    return (
        <>
            <div className="container-fluid font" style={{ backgroundColor: 'rgba(228, 239, 250, 0.916)' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: 'rgba(228, 239, 250, 0.916)', height: "80px" }}>

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
                            <table className="table table-bordered">
                                <thead className='table-secondary' style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    <tr>
                                        <th>Organization ID</th>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListWarehouse

