// src/pages/ServerError.tsx

import React from 'react';
import SimpleHeader from '../components/landing/SimpleHeader';
import Footer from '../components/landing/Footer';
import { ServerCrash } from 'lucide-react';

const ServerError: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SimpleHeader />

            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="mb-6 bg-orange-100 p-6 rounded-full">
                    <ServerCrash className="w-16 h-16 text-orange-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Server Error (500)</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Something went wrong on our end. We're working on fixing it. Please try again later.
                </p>
                <button onClick={() => window.location.reload()} className="bg-[#004aad] text-white px-8 py-3 rounded-full font-medium hover:bg-[#003884] transition-colors shadow-lg">
                    Refresh Page
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default ServerError;
