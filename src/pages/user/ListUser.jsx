import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { deleteUserData, getUserData, getUserId, searchUserData, updateUserStatus } from '../../api/apifetcher'

const ListUser = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [search, setSearch] = useState("")
  const Navigate = useNavigate()

  // list user 
  const listUser = async () => {
    try {
      const res = await getUserData()
      setData(res.data)
    }
    catch (err) {
      console.log("Error", err)
    }
  }

  // change status
  const changeStatus = async (id, status) => {
    try {
      const res = updateUserStatus(id, status)
      console.log(status);
      listUser()
    } catch (err) {
      console.log("Error", err)
    }
  }

  // search user
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value)

    if (value.trim() == "") {
      listUser()
      return;
    }
    try {
      const res = await searchUserData(value)
      setData(res.data)

    } catch (err) {
      console.log("Err", err)
    }
  }

  // delete user
  const handleDelete = async (id) => {
    const confirmData = window.confirm("Are you sure to delete this user")
    if (confirmData) {
      try {
        const res = await deleteUserData(id)
        listUser()
      } catch (err) {
        console.log("Error", err)
      }
    }
  }

  // update data to navigate
  const handleUpdate = async (id) => {
    try {
      const res = await getUserId(id)
      console.log(res.data);
      setId(res.data)
      Navigate("/user/create", { state: res.data })
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    listUser()
  }, [])


  return (
    <div>
      <div className="container-fluid font" style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f1f1f1', height: "80px" }}>

              <h3 className='mt-2'>User List</h3>
              <form className="d-flex" role="search" id="user-search">
                <input
                  className="form-control shadow-none border-2 me-2"
                  type="search"
                  id='user-search-in'
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={handleSearch}
                />
                <i className="fa-solid fa-magnifying-glass" id='user-search-icon'></i>
              </form>
              <NavLink to="/user/create"><button className='btn-user'>+ Add User</button></NavLink>
            </nav>
            <div className='col-lg-12' id='list-scroll'>
              <table className="table table-bordered">
                <thead className='table-secondary' style={{ width: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <tr>
                    <th>Organization ID</th>
                    <th>Full Name </th>
                    <th>Mobile Number</th>
                    <th>Password</th>
                    <th>Email </th>
                    <th>Profile Picture</th>
                    <th>Dapartment</th>
                    <th>Role</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((user) => {
                      return (
                        <tr key={user.userId}>
                          <td>{user.organizationId}</td>
                          <td>{user.fullName}</td>
                          <td>{user.mobileNumber}</td>
                          <td>{user.password}</td>
                          <td>{user.email}</td>
                          <td>{user.profilePicture}</td>
                          <td>{user.department}</td>
                          <td>{user.role}</td>
                          <td>{user.gender}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input onChange={() => changeStatus(user.userId, user.status)} className="form-check-input" checked={user.status == "ACTIVE"} type="checkbox" role="switch" />
                            </div>
                          </td>
                          <td className='tab'>
                            <i onClick={() => handleUpdate(user.userId)} className="fa-solid fa-pen-to-square updel-icon"></i>
                            <i onClick={() => handleDelete(user.userId)} className="text-danger fa-solid fa-trash updel-icons"></i>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListUser
