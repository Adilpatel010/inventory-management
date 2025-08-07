import React, { useEffect, useState } from 'react'
import { deleteProductData, getProductData, getProductId, searchProductData, updateProductStatus } from '../../api/apifetcher'
import { NavLink, useNavigate } from 'react-router'

const ListProduct = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [noData, setNoData] = useState(false)
    const Navigate = useNavigate()

    // list product 
    const ListProduct = async () => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getProductData()
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

    // delete product 
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this product")

        if (confirmDelete) {
            try {
                const res = await deleteProductData(id)
                ListProduct()
            } catch (err) {
                console.log(err)
                setError("Unable to delete category.")
            }
        } else {
            console.log("delete cancelled:")
        }
    }

    // change status
    const changeStatus = async (id, status) => {
        try {
            const res = await updateProductStatus(id, status)
            ListProduct()
        } catch (err) {
            console.log(err);
            setError("Unable to update status.")
        }
    }

    // search product
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value)

        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await searchProductData(value)
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

    const handleUpdate = async (id) => {
        try {
            const res = await getProductId(id)
            console.log(res.data);
            setId(res.data)
            Navigate("/product/add", { state: res.data[0] })
        } catch (err) {
            console.log(err);
            setError("Unable to fetch category details.")
        }
    }

    useEffect(() => {
        ListProduct()
    }, [])

    return (
        <div>
            <div className="container-fluid font">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
                            <h3 className='mt-2'>Product List</h3>
                            <form className="d-flex" role="search" id="product-search">
                                <input
                                    className="form-control me-2 shadow-none border-2"
                                    type="search"
                                    id='product-search-in'
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <i className="fa-solid fa-magnifying-glass" id='product-search-icon'></i>
                            </form>
                            <NavLink to="/product/add"><button className='btn-product'>+ Add Product</button></NavLink>
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
                                <table className="table table-bordered" style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    <thead className='table-secondary'>
                                        <tr>
                                            <th>Reference Product ID</th>
                                            <th>Organization ID</th>
                                            <th>Category ID</th>
                                            <th>Warehouse ID</th>
                                            <th>Supplier ID</th>
                                            <th>Product Name</th>
                                            <th>Product Code</th>
                                            <th>Product Image</th>
                                            <th>Stock </th>
                                            <th>Description </th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.map((product) => {
                                                return (
                                                    <tr key={product.productId}>
                                                        <td>{product.referenceProductId}</td>
                                                        <td>{product.organizationId}</td>
                                                        <td>{product.categoryId}</td>
                                                        <td>{product.wareHouseId}</td>
                                                        <td>{product.supplierId}</td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.productCode}</td>
                                                        <td>{product.productImage}</td>
                                                        <td>{product.stock}</td>
                                                        <td>{product.description}</td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input onChange={() => changeStatus(product.productId, product.status)} checked={product.status == "ACTIVE"} className="form-check-input" type="checkbox" role="switch" />
                                                            </div>
                                                        </td>
                                                        <td className='tab'>
                                                            <i onClick={() => handleUpdate(product.productId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                            <i onClick={() => handleDelete(product.productId)} className="text-danger fa-solid fa-trash updel-icons"></i>
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
        </div>
    )
}

export default ListProduct
