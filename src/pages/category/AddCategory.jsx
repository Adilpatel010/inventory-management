import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router';
import { addCategoryData, updateCategoryData } from '../../api/apifetcher';

const AddCategory = () => {
    const { state } = useLocation()
    const [updateData, setUpdateData] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        organizationId: '',
        parentCategoryId: null,
        categoryName: '',
        description: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // validation 
    const validate = () => {
        const newErrors = {};
        if (!formData.organizationId.trim()) newErrors.organizationId = 'Organization ID is required';
        // if (!formData.parentCategoryId.trim()) newErrors.parentCategoryId = 'Parent Category ID is required';
        if (!formData.categoryName.trim()) newErrors.categoryName = 'Category Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return;
        }

        try {
            if (updateData) {
                const res = await updateCategoryData(formData.id, formData)
                alert("Data updated successfully")
                navigate("/category/list")
                console.log("Updated:", res.data);
            } else {
                const res = await addCategoryData(formData)
                alert("Data added successfully")
                navigate("/category/list")
                console.log("Added:", res.data)
            }
            setFormData({
                organizationId: '',
                parentCategoryId: null,
                categoryName: '',
                description: '',
            })
            setErrors({})
            setUpdateData(false)
        }
        catch (err) {
            console.log(err);
        }
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
                <div className="col-lg-11 mt-4 p-4 bg-white rounded" id="form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Organization ID</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="organizationId"
                                    value={formData.organizationId}
                                    onChange={handleChange}
                                    placeholder="Organization ID"
                                />
                                {errors.organizationId && <small className="text-danger">{errors.organizationId}</small>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Parent Category ID</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="parentCategoryId"
                                    value={formData.parentCategoryId}
                                    onChange={handleChange}
                                    placeholder="Parent Category ID"
                                />
                                {errors.parentCategoryId && <small className="text-danger">{errors.parentCategoryId}</small>}
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="categoryName"
                                    value={formData.categoryName}
                                    onChange={handleChange}
                                    placeholder="Category Name"
                                />
                                {errors.categoryName && <small className="text-danger">{errors.categoryName}</small>}
                            </div>


                            <div className="col-md-6 mt-3">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none border-2"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                                {errors.description && <small className="text-danger">{errors.description}</small>}
                            </div>

                        </div>
                        <button className="btn-form mt-4">
                            {updateData ? 'Update Category' : 'Add Category'}
                        </button>
                        <NavLink to="/category/list"> <button className='btn-form mx-5'>List Category</button></NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory
