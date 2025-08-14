import React, { useEffect, useState } from 'react'
import { registerUser, updateUserData } from '../../api/apifetcher';
import { NavLink, useNavigate, useLocation } from 'react-router';

const AddUser = () => {

  const { state } = useLocation();
  const [updateData, setUpdateData] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    organizationId: "",
    fullName: "",
    mobileNumber: "",
    password: "",
    email: "",
    profilePicture: "",
    department: "",
    role: "",
    gender: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validation
  const validate = () => {
    const newErrors = {}
    if (!String(userData.organizationId).trim()) newErrors.organizationId = "Organization ID is required"
    if (!String(userData.fullName).trim()) newErrors.fullName = "Full Name is required"
    if (!String(userData.mobileNumber).trim()) newErrors.mobileNumber = "Mobile Number is required"
    if (!String(userData.password).trim()) newErrors.password = "Password is required"
    if (!String(userData.email).trim()) newErrors.email = "Email is required"
    if (!String(userData.profilePicture).trim()) newErrors.profilePicture = "Profile Picture is required"
    if (!String(userData.department).trim()) newErrors.department = "Department is required"
    if (!String(userData.role).trim()) newErrors.role = "Role is required"
    if (!String(userData.gender).trim()) newErrors.gender = "Gender is required"
    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (updateData) {
        const res = await updateUserData(userData.userId, userData);
        alert('User updated successfully');
        navigate("/user/list")
        console.log('Updated:', res.data);
      } else {
        const res = await registerUser(userData);
        alert('User added successfully');
        console.log('Added:', res.data);

        const token =
          res?.data?.token ||
          res?.data?.accessToken ||
          res?.data?.user?.token;

        if (token) {
          localStorage.setItem('token', token);
          console.log("Token saved:", token);
        }
      }
      navigate("/user/list");

      // Reset form
      setUserData({
        organizationId: "",
        fullName: "",
        mobileNumber: "",
        password: "",
        email: "",
        profilePicture: "",
        department: "",
        role: "",
        gender: "",
      });
      setErrors({});
      setUpdateData(false);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    if (state) {
      setUpdateData(true)
      setUserData({ ...state })
    }
  }, [state])

  return (
    <div>
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
                    value={userData.organizationId}
                    onChange={handleChange}
                    placeholder="Organization ID"
                  />
                  {errors.organizationId && <small className="text-danger">{errors.organizationId}</small>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control shadow-none border-2"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control shadow-none border-2"
                    name="mobileNumber"
                    value={userData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                  />
                  {errors.mobileNumber && <small className="text-danger">{errors.mobileNumber}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control shadow-none border-2"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control shadow-none border-2"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="text"
                    className="form-control shadow-none border-2"
                    name="profilePicture"
                    value={userData.profilePicture}
                    onChange={handleChange}
                    placeholder="Profile Picture"
                  />
                  {errors.profilePicture && <small className="text-danger">{errors.profilePicture}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Department</label>
                  <select
                    type="text"
                    className="form-select shadow-none border-2"
                    name="department"
                    value={userData.department}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="SALES">SALES</option>
                    <option value="FINANCE">FINANCE</option>
                  </select>
                  {errors.department && <small className="text-danger">{errors.department}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select shadow-none border-2"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                  </select>
                  {errors.role && <small className="text-danger">{errors.role}</small>}
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select shadow-none border-2"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </div>

              </div>

              <button className="btn-form mt-4">
                {updateData ? 'Update User' : 'Add User'}
              </button>
              <NavLink to="/user/list"> <button className='btn-form mx-5'>List User</button></NavLink>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddUser
