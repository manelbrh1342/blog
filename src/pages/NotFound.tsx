// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHeader from '../components/landing/SimpleHeader';
import Footer from '../components/landing/Footer';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SimpleHeader />

            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-9xl font-extrabold text-[#004aad]">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link to="/" className="bg-[#004aad] text-white px-8 py-3 rounded-full font-medium hover:bg-[#003884] transition-colors shadow-lg">
                    Back to Home
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;
