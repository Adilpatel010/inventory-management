import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { addSupplierData, updateSupplierData } from '../../api/apifetcher';

const AddSupplier = () => {
    const { state } = useLocation();
    const [updateData, setUpdateData] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        supplierShopName: '',
        supplierGstNo: '',
        phoneNumber: '',
        locationOrArea: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.supplierShopName.trim()) newErrors.supplierShopName = 'Shop Name is required';
        if (!formData.supplierGstNo.trim()) newErrors.supplierGstNo = 'GST No. is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone No. is required';
        else {
            if (!/^\d+$/.test(formData.phoneNumber)) {
                newErrors.phoneNumber = 'Phone No. must contain only digits';
            }

            else if (formData.phoneNumber.length !== 10) {
                newErrors.phoneNumber = 'Phone No. must be exactly 10 digits';
            }
        }
        if (!formData.locationOrArea.trim()) newErrors.locationOrArea = 'Address is required';
        return newErrors;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const validationErrors = validate();
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }

    //     try {
    //         if (updateData) {
    //             const res = await updateSupplierData(formData.supplierId, formData);
    //             alert('Data updated successfully');
    //             console.log('Updated:', res.data);
    //         } else {
    //             const res = await addSupplierData(formData);
    //             alert('Data added successfully');
    //             console.log('Added:', res.data);
    //         }

    //         // Reset form
    //         setFormData({
    //             supplierShopName: '',
    //             supplierGstNo: '',
    //             phoneNumber: '',
    //             locationOrArea: '',
    //         });
    //         setErrors({});
    //         setUpdateData(false);
    //     } catch (err) {
    //         console.error('Error:', err);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (updateData) {
                await updateSupplierData(formData.supplierId, formData);
                alert('Data updated successfully');
                navigate("/supplier/list")
            } else {
                const res = await addSupplierData(formData);

                // Handle error if backend responds with code 302 (supplier already exists)
                if (res.data?.code === 302) {
                    const msg = res.data.message.toLowerCase();
                    const newErrors = {};

                    if (msg.includes('phone')) {
                        newErrors.phoneNumber = 'Phone number already exists';
                    }

                    if (msg.includes('gst')) {
                        newErrors.supplierGstNo = 'GST number already exists';
                    }

                    setErrors(newErrors);
                    return; // Stop success flow
                }

                alert('Data added successfully');
                navigate("/supplier/list")
            }

            // Reset only on success
            setFormData({
                supplierShopName: '',
                supplierGstNo: '',
                phoneNumber: '',
                locationOrArea: '',
            });
            setErrors({});
            setUpdateData(false);

        } catch (err) {
            const errorMsg = err.response?.data?.message?.toLowerCase() || '';
            const newErrors = {};

            if (errorMsg.includes('phone')) {
                newErrors.phoneNumber = 'Phone number is already exists';
            }
            if (errorMsg.includes('gst')) {
                newErrors.supplierGstNo = 'GST number is already exists';
            }
            if (!newErrors.phoneNumber && !newErrors.supplierGstNo) {
                newErrors.phoneNumber = 'Phone or GST number already exists';
                newErrors.supplierGstNo = 'Phone or GST number already exists';
            }
            setErrors(newErrors);
        }
    };

    useEffect(() => {
        if (state) {
            setUpdateData(true);
            setFormData({ ...state });
        }
    }, [state]);

    return (
        <div className="container-fluid pb-5">
            <div className="row justify-content-center mt-2">
                <div className="col-lg-11 mt-4 p-4 bg-white rounded" id="form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Shop Name</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="supplierShopName"
                                    value={formData.supplierShopName}
                                    onChange={handleChange}
                                    placeholder="Shop Name"
                                />
                                {errors.supplierShopName && <small className="text-danger">{errors.supplierShopName}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">GST No.</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="supplierGstNo"
                                    value={formData.supplierGstNo}
                                    onChange={handleChange}
                                    placeholder="GST No."
                                />
                                {errors.supplierGstNo && <small className="text-danger">{errors.supplierGstNo}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="phoneNumber"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                />
                                {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                            </div>

                        </div>

                        <div className="mt-3">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control shadow-none border-2"
                                name="locationOrArea"
                                rows="3"
                                value={formData.locationOrArea}
                                onChange={handleChange}
                                placeholder="Address"
                            />
                            {errors.locationOrArea && <small className="text-danger">{errors.locationOrArea}</small>}
                        </div>

                        <button className="btn-form mt-4">
                            {updateData ? 'Update Supplier' : 'Add Supplier'}
                        </button>
                        <NavLink to="/supplier/list"> <button className='btn-form mx-5'>List Supplier</button></NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
