import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for auth token in localStorage/sessionStorage
        const checkAuth = () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const user = localStorage.getItem('user') || sessionStorage.getItem('user');

            setIsAuthenticated(!!token && !!user);
            setLoading(false);
        };

        checkAuth();

        // Optional: Listen for storage changes if you want to react to login/logout in other tabs
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return { isAuthenticated, loading };
};
