import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiry } from '../../features/Auth/AuthSlice';
import type { RootState } from '../../store';

const AuthListener = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check token expiry on mount
    useEffect(() => {
        dispatch(checkTokenExpiry());
    }, [dispatch]);

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        // If storage has token but redux says not authenticated, it means it expired/invalid.
        // Redirect to login.
        if (storedToken && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return null;
};

export default AuthListener;
