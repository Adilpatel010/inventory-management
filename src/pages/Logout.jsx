import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');

        navigate('/');
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
