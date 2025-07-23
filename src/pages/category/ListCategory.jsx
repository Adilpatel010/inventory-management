import React, { useEffect, useState } from 'react'
import { deleteCategoryData, getCategoryData, getCategoryId, searchCategoryData, updateCategoryStatus } from '../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'

const ListCategory = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    // list Category
    const listCategory = async () => {
        try {
            const res = await getCategoryData()
            setData(res.data)
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    // change status
    const changeStatus = async (id, status) => {
        try {
            const res = await updateCategoryStatus(id, status)
            console.log(status);
            listCategory()
        }
        catch (err) {
            console.log(err)
        }
    }
    // dalete category
    const handleDelete = async (id) => {
        const confirmData = window.confirm("Are you sure to delete this category")
        if (confirmData) {
            try {
                const res = await deleteCategoryData(id)
                listCategory()
            }
            catch (err) {
                console.log(err)
            }
        } else {
            console.log("Delete err", err);
        }
    }

    // update data to navigate 
    const handleUpdate = async (id) => {
        try {
            const res = await getCategoryId(id)
            setId(res.data)
            navigate('/category/add', { state: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    // search category
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            listCategory();
            return;
        }
        try {
            const res = await searchCategoryData(value);
            setData(res.data);
        } catch (err) {
            console.log("Search Error:", err);
        }
    };

    useEffect(() => {
        listCategory()
    }, [])
    return (
        <div className="container-fluid font" style={{ backgroundColor: 'rgba(228, 239, 250, 0.916)' }}>
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: 'rgba(228, 239, 250, 0.916)', height: "80px" }}>
                        <h3 className='mt-2'>Category List</h3>
                        <form className="d-flex" role="search" id="category-search">
                            <input
                                className="form-control shadow-none border-2 me-2"
                                type="search"
                                id='category-search-in'
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
                        <table className="table table-bordered">
                            <thead className='table-secondary' style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
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
                                {
                                    data.map((category) => {
                                        return (
                                            <tr key={category.id}>
                                                <td>{category.organizationId}</td>
                                                <td>{category.parentCategoryId}</td>
                                                <td>{category.categoryName}</td>
                                                <td>{category.description}</td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input onChange={() => changeStatus(category.id, category.status)} checked={category.status == "ACTIVE"} className="form-check-input" type="checkbox" role="switch" />
                                                    </div>
                                                </td>
                                                <td className='tab'>
                                                    <i onClick={() => handleUpdate(category.id)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                    <i onClick={() => handleDelete(category.id)} className="text-danger fa-solid fa-trash updel-icons"></i>
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
    )
}

export default ListCategory
