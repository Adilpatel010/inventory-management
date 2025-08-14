// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';

// const Logout = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const confirmLogout = window.confirm("Are you sure you want to logout?");
//         if (confirmLogout) {
//             localStorage.removeItem('token');
//             navigate('/');
//         } else {
//             navigate('/dashboard');
//         }
//     }, [navigate]);

//     return <p>Logging out...</p>;
// };

// export default Logout;


import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            width: '410px',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');

                Swal.fire({
                    title: "Logged Out",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    width: '410px',
                    timer: 1500,
                    showConfirmButton: false,
                    heightAuto: false
                }).then(() => {
                    navigate('/');
                });
            } else {
                navigate('/dashboard');
            }
        });
    }, [navigate]);

    return null; // no UI needed
};

export default Logout;
