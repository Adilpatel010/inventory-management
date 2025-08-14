// import React, { useEffect, useState } from 'react'
// import { deleteProductData, getProductData, getProductId, searchProductData, updateProductStatus } from '../../api/apifetcher'
// import { NavLink, useNavigate } from 'react-router'

// const ListProduct = () => {
//     const [data, setData] = useState([])
//     const [id, setId] = useState("")
//     const [search, setSearch] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState("")
//     const [noData, setNoData] = useState(false)
//     const Navigate = useNavigate()

//     // list product 
//     const ListProduct = async () => {
//         setLoading(true)
//         setError("")
//         setNoData(false)

//         try {
//             const res = await getProductData(pageNumber, pageSize)
//             if (res.data.length === 0) {
//                 setNoData(true)
//             } else {
//                 setData(res.data.data)
//                 console.log(res.data.data)
//             }
//         } catch (err) {
//             console.error(err)
//             setError("Server error occurred. Please try again later.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     // delete product 
//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure to delete this product")

//         if (confirmDelete) {
//             try {
//                 const res = await deleteProductData(id)
//                 ListProduct()
//             } catch (err) {
//                 console.log(err)
//                 setError("Unable to delete category.")
//             }
//         } else {
//             console.log("delete cancelled:")
//         }
//     }

//     // change status
//     const changeStatus = async (id, status) => {
//         try {
//             const res = await updateProductStatus(id, status)
//             ListProduct()
//         } catch (err) {
//             console.log(err);
//             setError("Unable to update status.")
//         }
//     }

//     // search product
//     const handleSearch = async (e) => {
//         const value = e.target.value;
//         setSearch(value)

//         setLoading(true)
//         setError("")
//         setNoData(false)

//         try {
//             const res = await searchProductData(value)
//             if (res.data.length === 0) {
//                 setNoData(true)
//                 setData([])
//             } else {
//                 setData(res.data)
//             }
//         } catch (err) {
//             console.error("Search Error:", err)
//             setError("Search failed. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleUpdate = async (id) => {
//         try {
//             const res = await getProductId(id)
//             console.log(res.data);
//             setId(res.data)
//             Navigate("/product/add", { state: res.data[0] })
//         } catch (err) {
//             console.log(err);
//             setError("Unable to fetch category details.")
//         }
//     }

//     useEffect(() => {
//         ListProduct()
//     }, [])

//     return (
//         <div>
//             <div className="container-fluid font">
//                 <div className="row justify-content-center">
//                     <div className="col-lg-11">
//                         <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
//                             <h3 className='mt-2'>Product List</h3>
//                             <form className="d-flex" role="search" id="product-search">
//                                 <input
//                                     className="form-control me-2 shadow-none border-2"
//                                     type="search"
//                                     id='product-search-in'
//                                     placeholder="Search"
//                                     aria-label="Search"
//                                     value={search}
//                                     onChange={handleSearch}
//                                 />
//                                 <i className="fa-solid fa-magnifying-glass" id='product-search-icon'></i>
//                             </form>
//                             <NavLink to="/product/add"><button className='btn-product'>+ Add Product</button></NavLink>
//                         </nav>
//                         <div className='col-lg-12' id='list-scroll'>
//                             {loading && (
//                                 <div className="text-center p-3">
//                                     <div className="spinner-border text-secondary" role="status">
//                                         <span className="visually-hidden">Loading...</span>
//                                     </div>
//                                 </div>
//                             )}
//                             {error && <p className="text-danger text-center p-3">{error}</p>}
//                             {noData && !loading && !error && <p className="text-center p-3">No Data Found</p>}

//                             {!loading && !error && !noData && (
//                                 <table className="table table-bordered" style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
//                                     <thead className='table-secondary'>
//                                         <tr>
//                                             <th>Reference Product ID</th>
//                                             <th>Organization ID</th>
//                                             <th>Category ID</th>
//                                             <th>Warehouse ID</th>
//                                             <th>Supplier ID</th>
//                                             <th>Product Name</th>
//                                             <th>Product Code</th>
//                                             <th>Product Image</th>
//                                             <th>Stock </th>
//                                             <th>Description </th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {
//                                             data.map((product) => {
//                                                 return (
//                                                     <tr key={product.productId}>
//                                                         <td>{product.referenceProductId}</td>
//                                                         <td>{product.organizationId}</td>
//                                                         <td>{product.categoryId}</td>
//                                                         <td>{product.wareHouseId}</td>
//                                                         <td>{product.supplierId}</td>
//                                                         <td>{product.productName}</td>
//                                                         <td>{product.productCode}</td>
//                                                         <td>{product.productImage}</td>
//                                                         <td>{product.stock}</td>
//                                                         <td>{product.description}</td>
//                                                         <td>
//                                                             <div className="form-check form-switch">
//                                                                 <input onChange={() => changeStatus(product.productId, product.status)} checked={product.status == "ACTIVE"} className="form-check-input" type="checkbox" role="switch" />
//                                                             </div>
//                                                         </td>
//                                                         <td className='tab'>
//                                                             <i onClick={() => handleUpdate(product.productId)} className="fa-solid fa-pen-to-square updel-icon"></i>
//                                                             <i onClick={() => handleDelete(product.productId)} className="text-danger fa-solid fa-trash updel-icons"></i>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })
//                                         }
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListProduct





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
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
   

    // list product 
    const ListProduct = async (page = 1, size = pageSize) => {
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await getProductData(page, size)
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

    // delete product 
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this product")
        if (confirmDelete) {
            try {
                await deleteProductData(id)
                ListProduct(pageNumber)
            } catch (err) {
                console.log(err)
                setError("Unable to delete product.")
            }
        }
    }

    // change status
    const changeStatus = async (id, status) => {
        try {
            await updateProductStatus(id, status)
            ListProduct(pageNumber)
        } catch (err) {
            console.log(err);
            setError("Unable to update status.")
        }
    }

    // search product
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value)
        if (value.trim() === "") {
            ListProduct(pageNumber)
            return
        }
        setLoading(true)
        setError("")
        setNoData(false)

        try {
            const res = await searchProductData(value)
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

    // update product
    const handleUpdate = async (id) => {
        try {
            const res = await getProductId(id)
            setId(res.data)
            Navigate("/product/add", { state: res.data[0] })
        } catch (err) {
            console.log(err);
            setError("Unable to fetch product details.")
        }
    }

    // Handle page click
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPageNumber(newPage)
        ListProduct(newPage)
    }

    // Change page size
    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value)
        setPageSize(newSize)
        setPageNumber(1)
        ListProduct(1, newSize)
    }

    useEffect(() => {
        ListProduct(pageNumber)
    }, [])

    return (
         <div className="container-fluid font">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
                            <h3 className='mt-2'>Product List</h3>
                            <form className="d-flex" role="search" id="product-search" onSubmit={e => e.preventDefault()}>
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
                                <>
                                    <table className="table table-bordered" style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                        <thead className='table-secondary'>
                                            <tr>

                                                <th>Organization ID</th>
                                                <th>Category ID</th>
                                                <th>Category Name</th>
                                                <th>Supplier ID</th>
                                                <th>Supplier Name</th>
                                                <th>Warehouse ID</th>
                                                <th>Location or Area</th>
                                                <th>Title</th>
                                                 <th>Type</th>
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
                                            {data.map((product) => (
                                                <tr key={product.productId}>
                                                    <td>{product.organizationId}</td>
                                                    <td>{product.categoryId}</td>
                                                    <td>{product.categoryName}</td>
                                                    <td>{product.supplierId}</td>
                                                    <td>{product.supplierName}</td>
                                                    <td>{product.wareHouseId}</td>
                                                    <td>{product.locationOrArea}</td>
                                                    <td>{product.title}</td>
                                                    <td>{product.type}</td>
                                                    <td>{product.productName}</td>
                                                    <td>{product.productCode}</td>
                                                    <td>{product.productImage}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.description}</td>
                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                onChange={() => changeStatus(product.productId, product.status)}
                                                                checked={product.status === "ACTIVE"}
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className='tab'>
                                                        <i onClick={() => handleUpdate(product.productId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                                                        <i onClick={() => handleDelete(product.productId)} className="text-danger fa-solid fa-trash updel-icons"></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>

                    {/* Pagination */}
                    {(
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

export default ListProduct
