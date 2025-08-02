import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { addWarehouseData, updateWarehouseData } from '../../api/apifetcher';

const AddWarehouse = () => {
  const { state } = useLocation();
  const [updateData, setUpdateData] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    wareHouseId: null,
    organizationId: '',
    locationOrArea: '',
    title: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validation 
  const validate = () => {
    const newErrors = {};
    if (!formData.organizationId.trim()) newErrors.organizationId = 'Organization ID is required';
    if (!formData.locationOrArea.trim()) newErrors.locationOrArea = 'Location is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    // if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (updateData) {
        const res = await updateWarehouseData(formData.wareHouseId, formData);
        alert('Data updated successfully');
        navigate("/warehouse/list")
        console.log('Updated:', res.data);
      } else {
        const res = await addWarehouseData(formData);
        alert('Data added successfully');
        navigate("/warehouse/list")
        console.log('Added:', res.data);
      }

      // Reset form
      setFormData({
        wareHouseId: null,
        organizationId: '',
        locationOrArea: '',
        title: '',
        type: '',
        description: '',
      });
      setErrors({});
      setUpdateData(false);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    if (state) {
      setUpdateData(true);
      setFormData({ ...state });
    }
  }, [state]);

  return (
    <div className="container-fluid pb-5" style={{ backgroundColor: '#f1f1f1' }}>
      <div className="row justify-content-center">
        <div className="col-lg-11 mt-5 p-4 bg-white rounded" id="form">
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
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control shadow-none border-2"
                  name="locationOrArea"
                  value={formData.locationOrArea}
                  onChange={handleChange}
                  placeholder="Location"
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
            </div>

            <div className="mt-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control shadow-none border-2"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              {errors.description && <small className="text-danger">{errors.description}</small>}
            </div>

            <button className="btn-form mt-4">
              {updateData ? 'Update Warehouse' : 'Add Warehouse'}
            </button>
            <NavLink to="/warehouse/list"> <button className='btn-form mx-5'>List Warehouse</button></NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWarehouse;