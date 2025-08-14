import React from 'react'

const AddCustomer = () => {
  return (
    <div className="container-fluid pb-5">
      <div className="row justify-content-center mt-2">
        <div className="col-lg-11 mt-4 p-4 bg-white rounded" id="form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 col-12">
                <label className="form-label">Customer Name </label>
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
                <label className="form-label">Customer Type</label>
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
                <label className="form-label">GST No.</label>
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
                <label className="form-label">Phone No.</label>
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
              {updateData ? 'Update Customer' : 'Add Customer'}
            </button>
            <NavLink to="/customer/list"> <button className='btn-form mx-5'>List Customer</button></NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer
