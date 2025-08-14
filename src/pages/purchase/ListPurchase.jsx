// import React, { useEffect, useState } from 'react'
// import { deletePurchaseData, getPurchaseData, getPurchaseId, updatePurchaseStatus } from '../../api/apifetcher'
// import { useNavigate, NavLink } from 'react-router'

// const ListPurchase = () => {
//   const [data, setData] = useState([])
//   const [id, setId] = useState("")
//   const Navigate = useNavigate()

//   // listpurchase
//   const listpurchase = async () => {
//     try {
//       const res = await getPurchaseData()
//       setData(res.data)
//       console.log(res.data)
//     }
//     catch (err) {
//       console.log(err)
//     }
//   }

//   // delete purchase
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this purchase")
//     if (confirmDelete) {
//       try {
//         const res = await deletePurchaseData(id)
//         listpurchase()
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }

//   // change status
//   const changeStatus = async (id, status) => {
//     try {
//       const res = await updatePurchaseStatus(id, status)
//       console.log(status)
//       listpurchase()
//     }
//     catch (err) {
//       console.log(err);
//     }
//   }
//   useEffect(() => {
//     listpurchase()
//   }, [])

//   // update purchase navigate function
//   const handleUpdate = async (id) => {
//     try {
//       const res = await getPurchaseId(id)
//       console.log(res.data);
//       setId(res.data)
//       Navigate("/purchase/add", { state: res.data })
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//       <div className="container-fluid font">
//         <div className="row justify-content-center">
//           <div className="col-lg-11">
//             <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
//               <h3 className='mt-2'>Purchase List</h3>
//               <form className="d-flex" role="search" id="purchase-search">
//                 <input
//                   className="form-control shadow-none border-2 me-2"
//                   type="search"
//                   id='purchase-search-in'
//                   placeholder="Search"
//                   aria-label="Search"
//                 // value={search}
//                 // onChange={handleSearch}
//                 />
//                 <i className="fa-solid fa-magnifying-glass" id='purchase-search-icon'></i>
//               </form>
//               <NavLink to="/purchase/add"><button className='btn-purchase'>+ Add Purchase</button></NavLink>
//             </nav>
//             <div className='col-lg-12' id='list-scroll'>
//               <table className="table table-bordered" style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
//                 <thead className='table-secondary'>
//                   <tr>
//                     <th>Product ID</th>
//                     <th>Supplier ID</th>
//                     <th>Bill Image</th>
//                     <th>Payment Image</th>
//                     <th>Total Amount</th>
//                     <th>Paid Amount</th>
//                     <th>Payment Type</th>
//                     <th>Description</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     data.map((purchase) => {
//                       return (
//                         <tr key={purchase.purchaseId} >
//                           <td>{purchase.productId}</td>
//                           <td>{purchase.supplierId}</td>
//                           <td>{purchase.billImage}</td>
//                           <td>{purchase.paymentImage}</td>
//                           <td>{purchase.totalAmount}</td>
//                           <td>{purchase.paidAmount}</td>
//                           <td>{purchase.paymentType}</td>
//                           <td>{purchase.description}</td>
//                           <td>
//                             <div className="form-check form-switch">
//                               <input onChange={() => changeStatus(purchase.purchaseId, purchase.status)} className="form-check-input" checked={purchase.status == "ACTIVE"} type="checkbox" role="switch" />
//                             </div></td>
//                           <td className='tab'>
//                             <i onClick={() => handleUpdate(purchase.purchaseId)} className="fa-solid fa-pen-to-square updel-icon"></i>
//                             <i onClick={() => handleDelete(purchase.purchaseId)} className="text-danger fa-solid fa-trash updel-icons"></i>
//                           </td>
//                         </tr>
//                       )
//                     })
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div >
//     </>
//   )
// }

// export default ListPurchase



import React, { useEffect, useState } from 'react'
import { deletePurchaseData, getPurchaseData, getPurchaseId, updatePurchaseStatus } from '../../api/apifetcher'
import { useNavigate, NavLink } from 'react-router'

const ListPurchase = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [noData, setNoData] = useState(false)
  const Navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // listpurchase
  const listpurchase = async (page = 1, size = pageSize) => {
    setLoading(true)
    setError("")
    setNoData(false)

    try {
      const res = await getPurchaseData(page, size)
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

  // delete purchase
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this purchase")
    if (confirmDelete) {
      try {
        const res = await deletePurchaseData(id)
        listpurchase(pageNumber)
      } catch (err) {
        console.log(err)
        setError("Unable to delete product")
      }
    }
  }

  // change status
  const changeStatus = async (id, status) => {
    try {
      const res = await updatePurchaseStatus(id, status)
      console.log(status)
      listpurchase(pageNumber)
    }
    catch (err) {
      console.log(err);
      setError("Unable to update status.")
    }
  }
  useEffect(() => {
    listpurchase()
  }, [])

  // update purchase navigate function
  const handleUpdate = async (id) => {
    try {
      const res = await getPurchaseId(id)
      console.log(res.data);
      setId(res.data)
      Navigate("/purchase/add", { state: res.data })
    } catch (err) {
      console.log(err);
      setError("Unable to fetch category details.")
    }
  }

  // Handle page click
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPageNumber(newPage)
    listpurchase(newPage)
  }

  // Change page size
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value)
    setPageSize(newSize)
    setPageNumber(1)
    listpurchase(1, newSize)
  }

  useEffect(() => {
    listpurchase(pageNumber)
  }, [])

  return (
    <>
      <div className="container-fluid font">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>
              <h3 className='mt-2'>Purchase List</h3>
              <form className="d-flex" role="search" id="purchase-search">
                <input
                  className="form-control shadow-none border-2 me-2"
                  type="search"
                  id='purchase-search-in'
                  placeholder="Search"
                  aria-label="Search"
                // value={search}
                // onChange={handleSearch}
                />
                <i className="fa-solid fa-magnifying-glass" id='purchase-search-icon'></i>
              </form>
              <NavLink to="/purchase/add"><button className='btn-purchase'>+ Add Purchase</button></NavLink>
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
                      <th>Product ID</th>
                      <th>Supplier ID</th>
                      <th>Bill Image</th>
                      <th>Payment Image</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>Payment Type</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((purchase) => {
                        return (
                          <tr key={purchase.purchaseId} >
                            <td>{purchase.productId}</td>
                            <td>{purchase.supplierId}</td>
                            <td>
                              <img
                                src={`http://192.168.0.167:8080/api/v1/uploads/${purchase.billImage}`}
                                alt="Bill"
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                              />
                            </td>
                            <td>{purchase.paymentImage}</td>
                            <td>{purchase.totalAmount}</td>
                            <td>{purchase.paidAmount}</td>
                            <td>{purchase.paymentType}</td>
                            <td>{purchase.description}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input onChange={() => changeStatus(purchase.purchaseId, purchase.status)} className="form-check-input" checked={purchase.status == "ACTIVE"} type="checkbox" role="switch" />
                              </div></td>
                            <td className='tab'>
                              <i onClick={() => handleUpdate(purchase.purchaseId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                              <i onClick={() => handleDelete(purchase.purchaseId)} className="text-danger fa-solid fa-trash updel-icons"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
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
      </div >
    </>
  )
}

export default ListPurchase
