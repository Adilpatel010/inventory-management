import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
