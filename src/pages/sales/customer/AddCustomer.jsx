import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router'
import { addCustomerData, updateCustomerData } from '../../../api/apifetcher'

const AddCustomer = () => {

  const { state } = useLocation()
  const [updateData, setUpdateData] = useState(false)
  const [errors, setErrors] = useState("")
  const Navigate = useNavigate()

  const [formData, setFormData] = useState({
    customerName: "",
    customerType: "",
    gst: "",
    phoneNo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // validation 
  const validate = () => {
    const newErrors = {};
    if (!String(formData.customerName).trim()) {
      newErrors.customerName = "Customer Name is required";
    }
    if (!String(formData.customerType).trim()) {
      newErrors.customerType = "Customer Type is required";
    }
    if (!String(formData.gst).trim()) {
      newErrors.gst = "GST No is required";
    }
    if (!String(formData.phoneNo).trim()) {
      newErrors.phoneNo = "Phone No is required";
    }
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
        const res = updateCustomerData(formData.customerId, formData)
        alert("Data updated successfully")
        console.log(res.data)
        Navigate('/customer/list')
      }
      else {
        const res = addCustomerData(formData)
        alert("Data added successfully")
        Navigate('/customer/list')
      }
      setFormData({
        customerName: "",
        customerType: "",
        gst: "",
        phoneNo: "",
      })
      setErrors([])
      setUpdateData(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  // data navigate
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
                <label className="form-label">Customer Name </label>
                <input
                  type="text"
                  className="form-control shadow-none border-2"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Customer Name"
                />
                {errors.customerName && <small className="text-danger">{errors.customerName}</small>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Customer Type</label>
                <select
                  className="form-select shadow-none border-2"
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="WHOLESALE">WHOLESALE</option>
                  <option value="RETAIL">RETAIL</option>
                </select>
                {errors.customerType && <small className="text-danger">{errors.customerType}</small>}
              </div>

              <div className="col-md-6 mt-3">
                <label className="form-label">GST No.</label>
                <input
                  type="text"
                  className="form-control shadow-none border-2"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  placeholder="GST No"
                />
                {errors.gst && <small className="text-danger">{errors.gst}</small>}
              </div>


              <div className="col-md-6 mt-3">
                <label className="form-label">Phone No.</label>
                <input
                  type="text"
                  className="form-control shadow-none border-2"
                  name="phoneNo"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone No"
                />
                {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
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
