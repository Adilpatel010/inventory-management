import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, NavLink ,useParams} from 'react-router';

const UpdateStock = () => {

    const { id } = useParams()
    const { state } = useLocation()
    const [updateData, setUpdateData] = useState(false)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        productName: '',
        wareHouseId: '',
        locationOrArea: '',
        title: '',
        type: '',
        quantity: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {

    }



    useEffect(() => {
        if (state) {
            setUpdateData(true);
            setFormData({ ...state });
        }
    }, [state]);
    return (
        <div className="container-fluid pb-5">
            <div className="row justify-content-center mt-2">
                <div className="col-lg-11 col-11 mt-4 p-4 bg-white rounded" id="form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                />
                                {errors.productName && <small className="text-danger">{errors.productName}</small>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Warehouse ID</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="wareHouseId"
                                    value={formData.wareHouseId}
                                    onChange={handleChange}
                                    placeholder="Warehouse ID"
                                />
                                {errors.wareHouseId && <small className="text-danger">{errors.wareHouseId}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Location Or Area</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="locationOrArea"
                                    value={formData.locationOrArea}
                                    onChange={handleChange}
                                    placeholder="Location or Area"
                                />
                                {errors.locationOrArea && <small className="text-danger">{errors.locationOrArea}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                />
                                {errors.title && <small className="text-danger">{errors.title}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-select shadow-none border-2"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="WAREHOUSE">WAREHOUSE</option>
                                    <option value="SHOP">SHOP</option>
                                </select>
                                {errors.type && <small className="text-danger">{errors.type}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="Quantity"
                                />
                                {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
                            </div>
                        </div>

                        <div className="d-flex gap-3 mt-5">
                            <button className="btn-form">
                                {/* {updateData ? 'Update Stock' : 'Add Category'} */}
                                Update Stock
                            </button>
                            <NavLink to="/stock/:id"> <button className='btn-form w-100'>List Stock</button></NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateStock
