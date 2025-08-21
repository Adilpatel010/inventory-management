// import React, { useEffect, useState } from 'react'
// import { useLocation, NavLink, useNavigate } from 'react-router'
// import { addPurchaseData, updatePurchaseData } from '../../api/apifetcher'

// const AddPurchase = () => {

//     const { state } = useLocation()
//     const [updateData, setUpdateData] = useState(false)
//     const navigate = useNavigate()

//     const [formData, setFormData] = useState({
//         productId: '',
//         supplierId: '',
//         billImage: '',
//         totalAmount: '',
//         paidAmount: '',
//         paymentType: '',
//         description: '',
//     })

//     const [errors, setErrors] = useState({})

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }))
//     }

//     // validation
//     const validate = () => {
//         const newErrors = {};
//         if (!String(formData.productId).trim()) {
//             newErrors.productId = "Product ID is required";
//         }
//         if (!String(formData.supplierId).trim()) {
//             newErrors.supplierId = "Supplier ID is required";
//         }
//         if (!String(formData.billImage).trim()) {
//             newErrors.billImage = "Bill Image is required";
//         }
//         if (!String(formData.totalAmount).trim()) {
//             newErrors.totalAmount = "Total amount is required";
//         }
//         if (!String(formData.paidAmount).trim()) {
//             newErrors.paidAmount = "Paid amount is required";
//         }
//         if (!String(formData.paymentType).trim()) {
//             newErrors.paymentType = "Payment type is required";
//         }
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         try {
//             if (updateData) {
//                 const res = await updatePurchaseData(formData.purchaseId, formData);
//                 alert('Data updated successfully');
//                 navigate("/purchase/list")
//                 console.log('Updated:', res.data);
//             } else {
//                 const res = await addPurchaseData(formData);
//                 alert('Data added successfully');
//                 navigate("/purchase/list")
//                 console.log('Added:', res.data);
//             }

//             // Reset form
//             setFormData({
//                 productId: '',
//                 supplierId: '',
//                 billImage: '',
//                 totalAmount: '',
//                 paidAmount: '',
//                 paymentType: '',
//                 description: '',
//             });
//             setErrors({});
//             setUpdateData(false);
//         } catch (err) {
//             console.error('Error:', err);
//         }
//     };

//     // data navigate
//     useEffect(() => {
//         if (state) {
//             setUpdateData(true)
//             setFormData({ ...state })
//         }
//     }, [state])

//     return (
//         <div className="container-fluid pb-5">
//             <div className="row justify-content-center mt-2">
//                 <div className="col-lg-11 mt-4 p-4 bg-white rounded" id="form">
//                     <form onSubmit={handleSubmit}>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <label className="form-label">Product ID</label>
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="productId"
//                                     value={formData.productId}
//                                     onChange={handleChange}
//                                     placeholder="Product ID"
//                                 />
//                                 {errors.productId && <small className="text-danger">{errors.productId}</small>}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label">Supplier ID</label>
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="supplierId"
//                                     value={formData.supplierId}
//                                     onChange={handleChange}
//                                     placeholder="Supplier ID"
//                                 />
//                                 {errors.supplierId && <small className="text-danger">{errors.supplierId}</small>}
//                             </div>

//                             <div className="col-md-6 mt-3">
//                                 {/* <label className="form-label">Bill Image</label>
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="billImage"
//                                     value={formData.billImage}
//                                     onChange={handleChange}
//                                     placeholder="Bill Image"
//                                 /> */}

//                                 <label for="formFile" class="form-label">Bill Image</label>
//                                 <input
//                                     className="form-control shadow-none border-2"
//                                     type="file"
//                                     id="formFile"
//                                     name="billImage"
//                                     value={formData.billImage}
//                                     onChange={handleChange}
//                                     placeholder="Bill Image"
//                                 />

//                                 {errors.billImage && <small className="text-danger">{errors.billImage}</small>}
//                             </div>

//                             <div className="col-md-6 mt-3">
//                                 <label className="form-label">Total Amount</label>
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="totalAmount"
//                                     value={formData.totalAmount}
//                                     onChange={handleChange}
//                                     placeholder="Total Amount"
//                                 />
//                                 {errors.totalAmount && <small className="text-danger">{errors.totalAmount}</small>}
//                             </div>

//                             <div className="col-md-6 mt-3">
//                                 <label className="form-label">Paid Amount</label>
//                                 <input
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="paidAmount"
//                                     value={formData.paidAmount}
//                                     onChange={handleChange}
//                                     placeholder="Paid Amount"
//                                 />
//                                 {errors.paidAmount && <small className="text-danger">{errors.paidAmount}</small>}
//                             </div>

//                             <div className="col-md-6 mt-3">
//                                 <label className="form-label">Payment Type</label>
//                                 <select
//                                     className="form-select shadow-none border-2"
//                                     name="paymentType"
//                                     value={formData.paymentType}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Choose..</option>
//                                     <option value="CASH">CASH</option>
//                                     <option value="UPI">UPI</option>
//                                     <option value="CHEQUE">CHEQUE</option>
//                                     <option value="BANK">BANK</option>
//                                 </select>
//                                 {errors.paymentType && <small className="text-danger">{errors.paymentType}</small>}
//                             </div>

//                             <div className="col-md-12 mt-3">
//                                 <label className="form-label">Description</label>
//                                 <textarea
//                                     rows={3}
//                                     type="text"
//                                     className="form-control shadow-none border-2"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     placeholder="Description"
//                                 />
//                                 {errors.description && <small className="text-danger">{errors.description}</small>}
//                             </div>

//                         </div>
//                         <button className="btn-form mt-4">
//                             {updateData ? 'Update Purchase' : 'Add Purchase'}
//                         </button>
//                         <NavLink to="/purchase/list"> <button className='btn-form mx-5'>List Purchase</button></NavLink>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddPurchase


import React, { useEffect, useState } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router'
import { addPurchaseData, updatePurchaseData } from '../../api/apifetcher'

const AddPurchase = () => {
    const { state } = useLocation()
    const [updateData, setUpdateData] = useState(false)
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)

    const [formData, setFormData] = useState({
        productId: '',
        supplierId: '',
        billImage: null,
        totalAmount: '',
        paidAmount: '',
        paymentType: '',
        description: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "billImage") {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                billImage: file,
            }))
            setPreview(URL.createObjectURL(file))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.productId) newErrors.productId = "Product ID is required"
        if (!formData.supplierId) newErrors.supplierId = "Supplier ID is required"
        if (!formData.billImage) newErrors.billImage = "Bill Image is required"
        if (!formData.totalAmount) newErrors.totalAmount = "Total amount is required"
        if (!formData.paidAmount) newErrors.paidAmount = "Paid amount is required"
        if (!formData.paymentType) newErrors.paymentType = "Payment type is required"
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const fd = new FormData()
            fd.append("productId", formData.productId)
            fd.append("supplierId", formData.supplierId)
            fd.append("billImage", formData.billImage)
            fd.append("totalAmount", formData.totalAmount)
            fd.append("paidAmount", formData.paidAmount)
            fd.append("paymentType", formData.paymentType)
            fd.append("description", formData.description)

            if (updateData) {
                await updatePurchaseData(formData.purchaseId, fd)
                alert('Data updated successfully');
            } else {
                await addPurchaseData(fd)
                alert('Data added successfully');
            }

            navigate("/purchase/list")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (state) {
            setUpdateData(true)
            setFormData({ ...state, billImage: null }) // Reset file input for update
        }
    }, [state])

    return (
        <div className="container-fluid pb-5">
            <div className="row justify-content-center mt-2">
                <div className="col-lg-11 col-11 mt-4 p-4 bg-white rounded" id="form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Product ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                />
                                {errors.productId && <small className="text-danger">{errors.productId}</small>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Supplier ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplierId"
                                    value={formData.supplierId}
                                    onChange={handleChange}
                                />
                                {errors.supplierId && <small className="text-danger">{errors.supplierId}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Bill Image</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="billImage"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                {preview && <img src={preview} alt="Preview" width="100" className="mt-2" />}
                                {errors.billImage && <small className="text-danger">{errors.billImage}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Total Amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="totalAmount"
                                    value={formData.totalAmount}
                                    onChange={handleChange}
                                />
                                {errors.totalAmount && <small className="text-danger">{errors.totalAmount}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Paid Amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="paidAmount"
                                    value={formData.paidAmount}
                                    onChange={handleChange}
                                />
                                {errors.paidAmount && <small className="text-danger">{errors.paidAmount}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Payment Type</label>
                                <select
                                    className="form-select"
                                    name="paymentType"
                                    value={formData.paymentType}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose..</option>
                                    <option value="CASH">CASH</option>
                                    <option value="UPI">UPI</option>
                                    <option value="CHEQUE">CHEQUE</option>
                                    <option value="BANK">BANK</option>
                                </select>
                                {errors.paymentType && <small className="text-danger">{errors.paymentType}</small>}
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows={3}
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <small className="text-danger">{errors.description}</small>}
                            </div>
                        </div>
                            
                        <div className="d-flex gap-3 mt-5">
                            <button className="btn-form">
                                {updateData ? 'Update Purchase' : 'Add Purchase'}
                            </button>
                            <NavLink to="/purchase/list">
                                <button className='btn-form'>List Purchase</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPurchase

