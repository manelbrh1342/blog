// src/pages/AccessDenied.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHeader from '../components/landing/SimpleHeader';
import Footer from '../components/landing/Footer';
import { ShieldAlert } from 'lucide-react';

const AccessDenied: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SimpleHeader />

            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="mb-6 bg-red-100 p-6 rounded-full">
                    <ShieldAlert className="w-16 h-16 text-red-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Access Denied (403)</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    You do not have permission to view this page. Please log in with an authorized account or contact support.
                </p>
                <div className="flex space-x-4">
                    <Link to="/login" className="px-8 py-3 rounded-full border border-[#004aad] text-[#004aad] font-medium hover:bg-blue-50 transition-colors">
                        Login
                    </Link>
                    <Link to="/" className="bg-[#004aad] text-white px-8 py-3 rounded-full font-medium hover:bg-[#003884] transition-colors shadow-lg">
                        Back to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AccessDenied;
