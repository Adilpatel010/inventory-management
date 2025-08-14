// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { loginUser } from '../../api/apifetcher';

// const Login = () => {
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const validate = () => {
//         const newErrors = {};
//         if (!mobileNumber.trim()) {
//             newErrors.mobileNumber = 'Mobile number is required';
//         } else if (!/^\d+$/.test(mobileNumber)) {
//             newErrors.mobileNumber = 'Mobile number must contain only digits';
//         } else if (mobileNumber.length !== 10) {
//             newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
//         }

//         if (!password.trim()) {
//             newErrors.password = 'Password is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         try {
//             const res = await loginUser({ mobileNumber, password });

//             // Smart token detection
//             const token =
//                 res?.data?.token ||
//                 res?.data?.data?.token ||
//                 res?.data?.user?.token;

//             if (token) {
//                 localStorage.setItem('token', token);
//                 alert("Login Successfully")
//                 navigate('/dashboard');
//             } else {
//                 setErrors({ api: 'Login failed. Token not received.' });
//             }
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 setErrors({ api: 'Invalid mobile number or password.' });
//             } else {
//                 setErrors({ api: 'Server error. Please try again.' });
//             }
//         }
//     };

//     return (
//         <div className="container-fluid" id='loginmain'>
//             <div className="col-md-4 p-4 bg-light rounded font shadow">
//                 <h3 className="text-center">Admin Login</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3 mt-4">
//                         {/* <label>Mobile Number</label> */}
//                         <input
//                             type="text"
//                             className="form-control shadow-none border-2"
//                             placeholder='Mobile Number'
//                             pattern="[0-9]{10}"
//                             maxLength={10}
//                             value={mobileNumber}
//                             onChange={(e) => setMobileNumber(e.target.value)}
//                         />
//                         {errors.mobileNumber && (
//                             <div className="text-danger">{errors.mobileNumber}</div>
//                         )}
//                     </div>

//                     <div className="mb-3">
//                         {/* <label>Password</label> */}
//                         <input
//                             type="password"
//                             className="form-control shadow-none border-2"
//                             placeholder='Password'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {errors.password && (
//                             <div className="text-danger">{errors.password}</div>
//                         )}
//                     </div>

//                     {errors.api && (
//                         <div className="text-danger mb-2">{errors.api}</div>
//                     )}

//                     <button className="btn btn-primary w-100" type="submit">
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../../api/apifetcher';
import { LuPackage } from "react-icons/lu";
import Swal from 'sweetalert2'; // <-- Import SweetAlert2

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d+$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number must contain only digits';
        } else if (mobileNumber.length !== 10) {
            newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await loginUser({ mobileNumber, password });

            const token =
                res?.data?.token ||
                res?.data?.data?.token ||
                res?.data?.user?.token;

            if (token) {
                localStorage.setItem('token', token);
                Swal.fire({
                    title: "Login Successfully",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    width: '410px',
                    timer: 1700,
                    timerProgressBar: true
                }).then(() => {
                    navigate('/dashboard');
                });

            } else {
                setErrors({ api: 'Login failed. Token not received.' });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setErrors({ api: 'Invalid mobile number or password.' });
            } else {
                setErrors({ api: 'Server error. Please try again.' });
            }
        }
    };

    return (
        <>

            <div className="container-fluid" id='loginmain'>

                <div className="col-md-4 p-4 bg-light rounded font shadow">
                    <div className='main'>
                        <LuPackage className='header-icons' />
                        <h2 className="headingnames">Inventory</h2>
                    </div>
                    <h3 className="text-center">Admin Login</h3>
                    <p className='text-center text-secondary mb-5'>Access to our dashboard</p>
                    <form onSubmit={handleSubmit} className='mb-4'>
                        <div className="mb-3 mt-4">
                            <input
                                type="text"
                                className="form-control shadow-none border-2"
                                placeholder='Mobile Number'
                                pattern="[0-9]{10}"
                                maxLength={10}
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                            {errors.mobileNumber && (
                                <div className="text-danger">{errors.mobileNumber}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control shadow-none border-2"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <div className="text-danger">{errors.password}</div>
                            )}
                        </div>

                        {errors.api && (
                            <div className="text-danger mb-2">{errors.api}</div>
                        )}

                        <button className="btn btn-primary w-100 mt-3" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
